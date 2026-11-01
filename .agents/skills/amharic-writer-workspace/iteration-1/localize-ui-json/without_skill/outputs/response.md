I've written `am.json`. It has the same 8 keys as `en.json`, and all four placeholders (`{name}`, `{count}`, `{firstName}`, `{time}`) are left exactly as they were.

```json
{
  "save": "አስቀምጥ",
  "cancel": "ይቅር",
  "delete_confirm": "{name} ይሰረዝ? ይህ ሊቀለበስ አይችልም።",
  "files_count": "{count} ፋይል",
  "welcome_back": "እንኳን በደህና ተመለሱ፣ {firstName}!",
  "search_placeholder": "ትዕዛዞችን ይፈልጉ…",
  "error_network": "መገናኘት አልተቻለም። የኢንተርኔት ግንኙነትዎን ያረጋግጡና እንደገና ይሞክሩ።",
  "order_delivered": "ትዕዛዝዎ {time} ላይ ደርሷል።"
}
```

Some choices you might want to check:

- **Cancel vs. Delete:** "ሰርዝ" can mean either one, so I used "ይቅር" for Cancel. That way a delete dialog won't show two buttons that look like the same action.
- **Polite form:** Full sentences speak to the customer politely (ተመለሱ, ይፈልጉ, ይሞክሩ, ትዕዛዝዎ). Short buttons like Save use the plain imperative, which is how most Amharic apps word them.
- **`files_count`:** Amharic usually drops the plural ending after a number, so "{count} ፋይል" is correct for 1 and for any larger number. You don't need a plural rule for this key.
- **Punctuation:** Sentences end with the Ethiopic full stop "።" and the comma is "፣". The question mark stays "?" and the ellipsis stays "…".
- **Placeholders stand alone:** I didn't attach Amharic prefixes like "በ" (at) directly to a placeholder. I wrote "{time} ላይ", so the sentence still reads correctly whatever value is filled in.
- **`{time}`:** Many Ethiopian users read clock time in local Ethiopian time, which runs 6 hours behind the international clock (7:00 AM is "1 o'clock"). Decide how your app formats `{time}` before inserting it, and consider showing AM/PM or "ጠዋት/ከሰዓት" (morning/afternoon) to avoid confusion.

A native speaker on your team should give these a quick read before release.
