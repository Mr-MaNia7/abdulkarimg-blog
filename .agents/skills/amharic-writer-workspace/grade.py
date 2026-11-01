"""Grade one iteration: scripted checks, plus manual verdicts from manual.json for the rest.

    python3 grade.py iteration-1
"""
import json, os, re, sys

ETH = re.compile('[ሀ-፿ᎀ-᎟ⶀ-⷟꬀-꬯]')
LAT = re.compile('[A-Za-z]')
SPACE_BEFORE = re.compile('[ \t ]+[።፣፤፦]')


def read(run, name):
    p = os.path.join(run, 'outputs', name)
    return open(p, encoding='utf8').read() if os.path.exists(p) else None


def notice(run):
    t = read(run, 'notice-am.md') or ''
    eth, lat = len(ETH.findall(t)), len(LAT.findall(re.sub(r'\d', '', t)))
    return [
        (eth > 3 * lat and eth > 50, f'{eth} Ethiopic vs {lat} Latin letters'),
        ('።' in t and '::' not in t, f"። x{t.count(chr(0x1362))}, '::' x{t.count('::')}"),
        (not SPACE_BEFORE.search(t), 'space before stop: ' + repr(SPACE_BEFORE.findall(t)[:3])),
        ('ጥቅምት 28' in t and '2018' in t, 'found ጥቅምት 28: %s, 2018: %s' % ('ጥቅምት 28' in t, '2018' in t)),
        (bool(re.search(r'ከ(ጠዋቱ|ማለዳው)\s*3', t)), 'Ethiopian-clock phrase: ' + repr(re.findall(r'ከ\S+\s*\d[^\s]*\s*\S*', t)[:3])),
        ('0911 234 567' in t, 'phone kept' if '0911 234 567' in t else 'phone missing or altered'),
        None,
    ]


def ui(run):
    t = read(run, 'am.json')
    keys = ['save', 'cancel', 'delete_confirm', 'files_count', 'welcome_back', 'search_placeholder', 'error_network', 'order_delivered']
    try:
        d = json.loads(t)
    except Exception as e:
        return [(False, f'invalid JSON: {e}')] + [(False, 'no JSON')] * 4
    ph = {'delete_confirm': '{name}', 'files_count': '{count}', 'welcome_back': '{firstName}', 'order_delivered': '{time}'}
    missing = [k for k, p in ph.items() if p not in str(d.get(k, ''))]
    english = [k for k, v in d.items() if len(LAT.findall(re.sub(r'\{\w+\}', '', str(v)))) > 0 and not ETH.search(str(v))]
    sentences = ' '.join(str(d.get(k, '')) for k in ('delete_confirm', 'error_network', 'order_delivered'))
    wb = str(d.get('welcome_back', ''))
    return [
        (sorted(d) == sorted(keys), 'keys: ' + ', '.join(d)),
        (not missing, 'missing placeholders: ' + (', '.join(missing) or 'none')),
        (not english and all(ETH.search(str(v)) for v in d.values()), 'English-only values: ' + (', '.join(english) or 'none')),
        ('::' not in sentences and not SPACE_BEFORE.search(sentences) and ('።' in sentences), 'sentences: ' + sentences),
        (not re.search('መጣህ|መጣሽ', wb), 'welcome_back = ' + wb),
    ]


def sms(run):
    t = (read(run, 'sms-fixed.txt') or '').strip()
    return [
        ('::' not in t and not re.search('[ \t]+[፣።]', t), repr(t)),
        ('ትዕዛዝህ' not in t and ('ትዕዛዝዎ' in t or 'ትእዛዝዎ' in t), 'has ትዕዛዝዎ: %s, has ትዕዛዝህ: %s' % ('ትዕዛዝዎ' in t, 'ትዕዛዝህ' in t)),
        (not re.search('ትዕዛዝ\\S*\\s+(በተሳካ ሁኔታ\\s+)?ተቀብሏል', t), 'see text'),
        ('ውሳኔ ከወሰዱ' not in t, 'calque present: %s' % ('ውሳኔ ከወሰዱ' in t)),
        ('እኛን ያግኙን' not in t, 'redundant እኛን present: %s' % ('እኛን ያግኙን' in t)),
        (t.endswith('።'), 'ends with: ' + repr(t[-3:])),
        None,
        None,
    ]


CHECKS = {'translate-closure-notice': notice, 'localize-ui-json': ui, 'proofread-customer-sms': sms}

if __name__ == '__main__':
    it = sys.argv[1]
    manual = json.load(open(os.path.join(it, 'manual.json'))) if os.path.exists(os.path.join(it, 'manual.json')) else {}
    for case, fn in CHECKS.items():
        texts = json.load(open(os.path.join(it, case, 'eval_metadata.json')))['assertions']
        for cfg in ('with_skill', 'without_skill'):
            run = os.path.join(it, case, cfg)
            results = fn(run)
            exp = []
            for i, (text, r) in enumerate(zip(texts, results)):
                if r is None:
                    m = manual.get(f'{case}/{cfg}/{i}')
                    r = (m['passed'], m['evidence']) if m else (False, 'not graded yet')
                exp.append({'text': text, 'passed': bool(r[0]), 'evidence': r[1]})
            passed = sum(e['passed'] for e in exp)
            json.dump({'expectations': exp, 'summary': {'passed': passed, 'failed': len(exp) - passed, 'total': len(exp), 'pass_rate': round(passed / len(exp), 2)}},
                      open(os.path.join(run, 'grading.json'), 'w'), ensure_ascii=False, indent=2)
            print(f'{case:26} {cfg:14} {passed}/{len(exp)}')
