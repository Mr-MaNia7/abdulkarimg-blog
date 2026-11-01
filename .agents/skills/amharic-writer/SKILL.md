---
name: amharic-writer
description: Write, translate, localize and proofread Amharic (አማርኛ) in Ethiopic (Fidel) script so it reads as natural, correctly punctuated, suitably polite Amharic rather than translated English. Use it for any task that produces or checks Amharic text, such as drafting messages, posts, notices or emails in Amharic, translating between English and Amharic, writing Amharic interface strings or app copy, correcting Amharic spelling, grammar or punctuation, or writing dates in the Ethiopian calendar. Use it even when the user only pastes Fidel text or says "in Amharic" without naming a skill.
---

# Writing Amharic

Amharic written by translating English sentence by sentence is easy to spot: English word order, the wrong level of politeness, `::` instead of `።`, Gregorian dates where a reader expects Ethiopian ones. The aim is text an Amharic reader would take as written in Amharic. Each section below covers one place where that usually goes wrong.

## Before you write: register and reader

Settle who will read the text and how formal it must be, because politeness in Amharic is grammar, not just word choice. It changes the pronoun, the verb ending and the possessive suffix.

- **Public, official, customer-facing, interface text, or an unknown reader:** use the polite form. Pronoun **እርስዎ**, imperatives like **ያንብቡ, ይግቡ, ይጫኑ, ይሞክሩ**, possessive **‑ዎ** (ስምዎ, ትዕዛዝዎ). The polite form has no gender, so it also avoids guessing whether the reader is a man (አንተ) or a woman (አንቺ).
- **Several readers addressed together:** **እናንተ** and plural verbs (ኑ, ተመዝገቡ). A notice to members can use either this or the polite singular; pick one and keep it.
- **Friends, casual chat, creative dialogue:** familiar forms and contemporary spoken Amharic are right; stiff formal Amharic sounds cold.
- **Talking about a respected person** (an elder, an official, a parent, a teacher, a religious figure, someone who has died): use the honorific plural, **እሳቸው / እርሳቸው** with plural verbs (ሄዱ, ተናገሩ, ገለጹ). Keep it for that person throughout the text; switching back to ሄደ reads as a slight.

Mixing registers is the most common error in machine-written Amharic, for example **ትዕዛዝህ** in one sentence and **እባክዎ** in the next. Once you choose a register, check every pronoun, verb and suffix against it.

## Sentences

- **Verb last.** Amharic is subject–object–verb, and modifiers come before what they modify. Relative clauses go before the noun: **ትናንት የገዛሁት መጽሐፍ** ("the book I bought yesterday").
- **Chain clauses with converbs**, not a string of **እና**: **ወደ ቤት ሄዶ ተኛ** rather than "ወደ ቤት ሄደ እና ተኛ". Use **እና** for joining nouns.
- **Agreement.** The verb carries the subject's person, number and gender, and often the object (ያግኙን = "contact us"). Don't add a separate pronoun the verb already has (not "እኛን ያግኙን").
- **Voice.** English passives often become active Amharic with "we" or "they": "your order has been received" → **ትዕዛዝዎ ደርሶናል** or **ትዕዛዝዎን ተቀብለናል**. A literal **ትዕዛዝዎ ተቀብሏል** means the order received something.
- **Calques.** Translate what the English means, not its words. "Take a decision" → **መወሰን** (not ውሳኔ መውሰድ); "make sure" → **ያረጋግጡ**; "at the end of the day" → **በመጨረሻ** or drop it. Use a proverb (ምሳሌያዊ አነጋገር) only if it truly fits the register; a forced proverb is worse than plain words.
- **Loanwords.** Keep established ones (ኮምፒውተር, ኢሜይል, ኢንተርኔት, ስልክ). Don't coin Amharic words readers won't recognize. If a technical term has no common Amharic form, use the loanword, or the Amharic gloss with the English in brackets the first time it appears.

## Relations English and Amharic mark differently

English shows how a noun relates to its verb with word order and separate prepositions. Amharic marks the same relation with a suffix on the noun, a prefix or frame around it, or a suffix on the verb. The two systems don't line up one to one. Translating preposition by preposition therefore drops markers English never wrote, and keeps markers Amharic doesn't use. These errors read as plainly foreign to an Amharic reader, even when every word is right.

**Method.** For each verb, work out the role of every noun around it: who acts, what is acted on, to or for whom, where, from where, with what, about what. Then mark each role the way *that Amharic verb* expects, ignoring the English preposition, which only tells you a relation exists. When you reread, check that every noun phrase has its role marked, or is the subject or an indefinite object.

The mismatches fall into four patterns. The examples show the patterns; they are not a complete list.

**1. No English preposition, but Amharic needs a marker.**
- A definite or specific direct object takes **‑ን**: "the Qur'an commanded *the believers* to send blessings" → **ቁርኣን አማኞችን ሶለዋት እንዲያወርዱ አዘዘ**. English marks nothing, and without **‑ን**, አማኞች reads as a second subject. Verbs of commanding, telling, asking, teaching and helping all take the person this way, followed by an **እንዲ‑** clause. (An indefinite object stays bare: **መጽሐፍ አነበብኩ**, "I read a book", but **መጽሐፉን አነበብኩ**, "I read the book".)
- "Call the office" → **ለቢሮው** or **ወደ ቢሮው ይደውሉ**.
- "Enter the room" → **ወደ ክፍሉ ገባ** or **ክፍሉ ውስጥ ገባ**.

**2. An English preposition, but Amharic uses a plain object.**
- "wait *for* the bus" → **አውቶቡሱን ጠበቀ**
- "listen *to* the teacher" → **መምህሩን አዳመጠ**
- "look *at*" or "look *for* the key" → **ቁልፉን ተመለከተ / ፈለገ**
- "afraid *of* the dog" → **ውሻውን ፈራ**

Writing **ለአውቶቡሱ ጠበቀ** or **ስለ ውሻው ፈራ** copies the English.

**3. An English preposition that maps to a different Amharic one than its literal match.** The verb decides, not the preposition.
- "thank you *for* your patience" → **ስለ ትዕግሥትዎ**
- "agree *with* you" → **ከእርስዎ ጋር** እንስማማለን
- "depends *on* the weather" → **በአየሩ ሁኔታ ላይ** ይወሰናል
- "proud *of* his son" → **በልጁ** ኮራ
- "angry *at* him" → **በእርሱ** ተቆጣ
- "*in* Amharic" → **በአማርኛ**

**4. The preposition moves onto the verb.** With a pronoun, "to, for, at, against him or them" usually becomes a suffix on the verb rather than a separate word:
- "I wrote to him" → **ጻፍኩለት**
- "she opened the door for him" → **በሩን ከፈተችለት**
- "they laughed at him" → **ሳቁበት**
- "I told them" → **ነገርኳቸው**

A verb repeating its object as a suffix (**ያስቀምጡታል**) is normal. It is not the redundant separate pronoun warned against under Sentences.

**The usual forms**, as a starting point for the role, not a mapping to apply word by word:

| Relation | Amharic | Example |
|---|---|---|
| definite object | **‑ን** | **ሐረጉን** መጻፍ |
| recipient, beneficiary ("to, for") | **ለ‑**, or **‑ለ‑** on the verb | **ለአማኞች** ሰጠ; ሰጣ**ቸው** |
| direction ("to, toward, into") | **ወደ** | **ወደ** ቤት |
| purpose ("to do", after command, want, ask) | **እንዲ‑** clause, infinitive **መ‑** | እንዲያወርዱ አዘዘ; **መሄድ** ይፈልጋል |
| place, instrument, means ("in, at, by, with") | **በ‑**; **በ… ውስጥ**, **በ… ላይ** | **በስልክ**; **በቤት ውስጥ** |
| source, comparison ("from, than") | **ከ‑** | **ከቢሮ**; **ከዚህ** ይበልጣል |
| company ("with, together") | **ከ… ጋር** | **ከጓደኛው ጋር** |
| time ("after, before") | **ከ… በኋላ / በፊት** | **ከስብሰባው በኋላ** |
| possession ("of, 's") | **የ‑** | **የነቢዩ** ስም |
| topic, cause ("about, because of") | **ስለ**; **በ… ምክንያት** | **ስለ እስልምና**; **በጥገና ምክንያት** |
| manner ("like, as") | **እንደ‑** | **እንደ ወንድም** |

When you aren't sure how a verb marks its arguments, say so in the "for review" list rather than guessing silently.

## Spelling in Fidel

- Use Unicode Ethiopic only: no legacy font encodings, no Latin lookalikes. Use **ኋ, ቋ, ጓ, ሷ** and other labialized forms where the word has them.
- Several letters sound alike: **ሀ / ሐ / ኀ**, **ሰ / ሠ**, **አ / ዐ**, **ጸ / ፀ**. Many words have an established spelling (ሥራ or ስራ, ዓመት or አመት, ኅብረተሰብ or ህብረተሰብ). Use the one your reader expects, and the same one throughout a text.
- When proofreading someone else's text, treat a recognized variant as their choice. Mention it if it matters; don't "fix" it.
- Foreign names: write them as pronounced (ጆን, ሎንዶን). Brand and product names usually stay in Latin script (Google, iPhone, Telegram). Mixing scripts that way is normal in modern Amharic.

## Punctuation and spacing

| Mark | Use |
|---|---|
| **።** | Full stop. Never type `::` or `:` for it. Two colons are a keyboard workaround that looks wrong in print and breaks line wrapping. |
| **፣** | Comma |
| **፤** | Semicolon, and between closely linked clauses |
| **፦** | Colon before a list, a quotation or speech |
| **?** | Question mark. Modern Amharic uses `?`; the Ethiopic **፧** is rare. |
| **!** | As in English |
| **« »** | The usual quotation marks; **“ ”** is also common. Use one style per text. |
| **፡** | Traditional word separator, in place of a space. Modern prose uses spaces; don't mix the two. |

**Spacing:** no space before **። ፣ ፤ ፦ ? !**, one space after. Write `ተዘግቷል። ስራ` and `ሰኞ፣ ማክሰኞ`, not `ተዘግቷል ። ስራ`. A space before a stop lets it wrap onto the next line on its own.

**Abbreviations** take periods or a slash: **ዓ.ም.** (Ethiopian era), **ዓ.ዓ.** (before the era), **ት/ቤት** (school), **መ/ቤት**, **ወ/ሮ** (Mrs), **ዶ/ር** (Dr), **ቁ.** (number).

## Numbers, dates and time

Readers in Ethiopia live with two calendars and two clocks. Treat any date or time you write as something that can be misread, and make it unambiguous.

- **Digits.** Arabic digits (2018, 15) are normal in modern text. Ge'ez numerals (፲፭, ፳፻፲፰) are for traditional or ceremonial writing, or when asked.
- **Ethiopian calendar.** Months: **መስከረም, ጥቅምት, ኅዳር, ታኅሣሥ, ጥር, የካቲት, መጋቢት, ሚያዝያ, ግንቦት, ሰኔ, ሐምሌ, ነሐሴ**, plus **ጳጉሜ** (5 days, or 6 in a leap year). The year begins on 11 September (12 September before a Gregorian leap year) and runs 7 or 8 years behind the Gregorian.
  - Formal form: **ጥቅምት 28 ቀን 2018 ዓ.ም.**; short form **ጥቅምት 28/2018**. Days of the week: ሰኞ, ማክሰኞ, ረቡዕ, ሐሙስ, ዓርብ, ቅዳሜ, እሑድ.
- **Converting dates: compute, don't estimate.** Month boundaries don't line up, so mental arithmetic is often a day or a month off. Run a conversion if you can. In JavaScript, `new Intl.DateTimeFormat('am-ET-u-ca-ethiopic', { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long', timeZone: 'UTC' }).format(new Date('2025-11-07'))` gives `ዓርብ፣ ጥቅምት 28 2018` (rearrange it to the formal form above). If you can't compute, keep the source's date, name its calendar (**እ.ኤ.አ.** for Gregorian), and say the Ethiopian date needs checking.
- **Which calendar to use.** For readers in Ethiopia, use the Ethiopian date, or give both: **ዓርብ ጥቅምት 28 ቀን 2018 ዓ.ም. (እ.ኤ.አ. ኖቬምበር 7 ቀን 2025)**. Don't silently relabel a Gregorian date with Ethiopian month names.
- **Ethiopian clock.** It counts from 6 a.m. and 6 p.m.: **ከጠዋቱ 3 ሰዓት** is 9:00 a.m.; **ከቀኑ 7 ሰዓት** is 1:00 p.m.; **ከምሽቱ 2 ሰዓት** is 8:00 p.m. A bare "9:00" in Amharic text is ambiguous. Say which clock you mean, or give both: **ከጠዋቱ 3:00 ሰዓት (9:00 a.m.)**.
- Phone numbers, codes, prices and URLs stay exactly as given.

## Translating

1. Read the whole source and work out what it means, who it is for and what it should achieve.
2. Write the Amharic from that meaning, restructuring sentences as Amharic needs: verb last, converbs, the chosen register.
3. Read it back as an Amharic reader would. Ask whether anything still sounds like English, whether every noun's relation to its verb is marked the Amharic way (see Relations), whether every sentence is in the same register, and whether every date and time is unambiguous.

**Quoted published texts:** scripture, laws, official statements, published literature and other quotations that have an authoritative Amharic version. Don't present your own rendering as that text, because readers will take it as the authoritative one.
- If the user supplies the published Amharic version, use it.
- Otherwise leave a clearly marked placeholder, e.g. **[ከታተመ ትርጉም ይጨመር: insert from a published Amharic translation]**, and say so in your reply.
- If the user explicitly wants your own working translation, label it as yours.

**Keep the machinery intact:** Markdown, HTML tags, `{placeholders}`, `%s` and `%d`, variable names, JSON keys and links pass through untranslated. Only their position in the sentence may change.

## Interface strings

- Buttons and actions: the polite imperative (**ያስቀምጡ, ይሰርዙ, ይቀጥሉ, ይሞክሩ**), or a short noun where that reads better (**ፍለጋ**, **ቅንብሮች**). Use one pattern across the set.
- "Cancel" and "Delete" need different verbs in Amharic: **ይቅር** (cancel the action) and **ይሰርዙ** (delete).
- Placeholders may move: `Delete {name}?` → `{name}ን መሰረዝ ይፈልጋሉ?`. The object marker **‑ን** attaches to a placeholder that ends up as the object.
- Counts: `{count} files` → `{count} ፋይሎች`. A noun after a number can also stay singular (5 ፋይል); pick one and keep it.
- Error messages: say what happened and what to do, politely and plainly: **መገናኘት አልተቻለም። የኢንተርኔት ግንኙነትዎን ያረጋግጡና እንደገና ይሞክሩ።**
- Fidel glyphs are wider than Latin letters. Flag strings that may overflow a narrow button.

## Proofreading

Fix what is wrong, not what is merely different from how you would write it:

- spelling mistakes (not valid variants)
- agreement and voice errors
- a relation marked the English way: a definite object missing **‑ን**, a preposition copied where Amharic uses a plain object, or the wrong prefix for the verb
- mixed registers
- `::` or `:` used as a full stop, and spaces before punctuation
- calques
- missing final **።**

Keep the author's vocabulary, dialect and style. Return the corrected text, then a short list of each change and why, so the author can accept or reject them one by one.

## Be honest about the limits

Your Amharic can be fluent and still miss what a native speaker would hear: an unusual collocation, a word with the wrong connotation, a regional usage. For anything that will be published or relied on (legal, medical, financial, religious or public text):

- Mark the word choices you are less sure of, with the alternatives you considered.
- Recommend review by a native speaker.

A short **"for review"** list after the text, in the language the user wrote to you in, is more useful than false confidence.

## Output

Give the Amharic text first, ready to copy. Then add brief notes in the user's language: register chosen, calendar and clock conventions used, placeholders left, and words for review. Leave out notes that add nothing for a short informal message.
