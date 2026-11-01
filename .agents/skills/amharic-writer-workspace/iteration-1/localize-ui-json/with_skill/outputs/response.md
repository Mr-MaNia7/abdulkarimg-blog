I wrote `am.json`. It has the same 8 keys as `en.json`, and every placeholder is still there.

```json
{
  "save": "ያስቀምጡ",
  "cancel": "ይቅር",
  "delete_confirm": "{name}ን መሰረዝ ይፈልጋሉ? ከተሰረዘ በኋላ መመለስ አይቻልም።",
  "files_count": "{count} ፋይል",
  "welcome_back": "እንኳን በደህና ተመለሱ፣ {firstName}!",
  "search_placeholder": "ትዕዛዞችን ይፈልጉ…",
  "error_network": "መገናኘት አልተቻለም። የኢንተርኔት ግንኙነትዎን ያረጋግጡና እንደገና ይሞክሩ።",
  "order_delivered": "ትዕዛዝዎ {time} ላይ ደርሷል።"
}
```

**Choices I made:**

- **Politeness:** everything uses the polite form (እርስዎ: ያስቀምጡ, ይፈልጉ, ይሞክሩ, ትዕዛዝዎ, ተመለሱ), the usual choice for an app's customers. It also doesn't need to know whether the user is a man or a woman.
- **Cancel and Delete:** these take different verbs. "Cancel" is **ይቅር** (drop this action). The delete dialog uses **መሰረዝ** (to delete).
- **Punctuation:** sentences end with the Ethiopic full stop **።**, never `::`, and the welcome line uses the Ethiopic comma **፣**.

**Placeholders to check in code:**

- `{name}ን`: Amharic marks the object with **‑ን**, so it's attached right after `{name}`. It reads fine for Amharic names and most file names. After a Latin-script name ending in a symbol or extension (e.g. `report.pdfን`) it looks odd. If that's common in your app, a safer version is `"{name} ይሰረዝ? ከተሰረዘ በኋላ መመለስ አይቻልም።"` ("Delete {name}? …"), which doesn't need the suffix.
- `{count} ፋይል`: Amharic often keeps the noun singular after a number, so this one string works for 1, 5 or 100 and you don't need plural rules. If you'd rather use a plural ICU message, the plural is **ፋይሎች**.
- `{time}`: the string is fine, but the value you insert is risky. Ethiopia has two clocks: in local time, "3 ሰዓት" means 9 a.m. A bare "9:00" will confuse some users. Format `{time}` with the clock named, e.g. `ከጠዋቱ 3:00 ሰዓት` (Ethiopian) or `9:00 a.m.` (international), or show both. If you ever show a date, make it an Ethiopian-calendar date (`Intl.DateTimeFormat('am-ET-u-ca-ethiopic', …)`).

**Layout:** Fidel letters are wider than Latin ones. Check that **ያስቀምጡ** fits on narrow buttons. If it doesn't, the shorter **አስቀምጥ** would fit, but it is the familiar form, so you'd need to change other strings to match.

**Words a native speaker should check:**

- `delete_confirm`: I wrote **ከተሰረዘ በኋላ መመለስ አይቻልም** ("once deleted it can't be restored") rather than a literal "can't be undone". **ይህን መቀልበስ አይቻልም** is also possible.
- `welcome_back`: **እንኳን በደህና ተመለሱ** is the standard phrase. Some apps put the name first: `{firstName}፣ እንኳን በደህና ተመለሱ!`.
- `order_delivered`: **ደርሷል** ("has arrived") is active, not a literal passive. **ተረክበዋል** ("you have received it") is another option.

These are short interface strings that customers will see, so have a native Amharic speaker check them in the running app before release.
