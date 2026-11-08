import type { Dict } from './en'

/**
 * Interface strings, Amharic. Same keys as data/i18n/en.ts.
 * Draft wording for the author to review: formal address (ያንብቡ, ይፈልጉ),
 * honorific verb forms for the Prophet, modern punctuation (። ፣ ፤ ፦).
 */
const am: Dict = {
  lang: 'am',
  ogLocale: 'am_ET',
  name: 'አማርኛ',
  readIn: 'በአማርኛም ያንብቡ',
  inThisLanguage: 'በአማርኛ',
  home: '/am',
  archive: '/am/blog',
  feed: '/am/feed.xml',
  description:
    'አምላክ መኖሩንና እስልምና እውነት መሆኑን የሚያረጋግጡ ማስረጃዎች፣ በእስልምና ላይ ለሚነሱ ጥርጣሬዎችም በጥንቃቄ የተዘጋጁ ምላሾች፤ ሁሉም በቅደም ተከተል።',
  socialBanner: `${process.env.BASE_PATH || ''}/og/am/default.png`,
  skipLink: 'ወደ ዋናው ይዘት ይለፉ',

  masthead: {
    frontPageLabel: '{title}፣ የአማርኛው የፊት ገጽ',
    main: 'ዋና ማሰሻ',
    menu: 'ምናሌ',
    frontPage: 'የፊት ገጽ',
    // The glossary and About page exist in English only, hence hrefLang.
    links: [
      { href: '/am/blog', title: 'ሁሉም ጽሑፎች' },
      { href: '/glossary', title: 'መዝገበ ቃላት', hrefLang: 'en' },
      { href: '/about', title: 'ስለ ጸሐፊው', hrefLang: 'en' },
      { href: '/', title: 'English', hrefLang: 'en', lang: 'en' },
    ],
    more: [{ href: '/', title: 'English', hrefLang: 'en', lang: 'en' }],
  },

  search: {
    button: 'ፍለጋ',
    title: 'ጽሑፎቹን ይፈልጉ',
    description:
      'የአማርኛ ጽሑፎችንና የመዝገበ ቃላቱን ቃላት ይፈልጉ። በውጤቶቹ መካከል ለመንቀሳቀስ የቀስት ቁልፎችን፣ አንዱን ለመክፈት Enter ይጠቀሙ።',
    placeholder: 'ጽሑፎችንና ቃላትን ይፈልጉ…',
    results: 'ውጤቶች',
    esc: 'Esc',
    searching: 'በመፈለግ ላይ…',
    noMatch: '«{query}» ከሚለው ጋር የሚዛመድ ነገር አልተገኘም።',
    unavailable: 'የፍለጋ ማውጫው አልተገኘም። የሚዘጋጀው በ`yarn build` ነው፤ የመዝገበ ቃላቱ ቃላት ግን አሁንም ይገኛሉ።',
    groups: {
      essays: 'ድርሰቶች',
      questions: 'ጥያቄዎች',
      notes: 'ማስታወሻዎች',
      glossary: 'መዝገበ ቃላት',
      goTo: 'ገጾች',
    },
    quick: [
      { title: 'ሁሉም የአማርኛ ጽሑፎች', url: '/am/blog' },
      { title: 'መዝገበ ቃላት', url: '/glossary' },
      { title: 'ስለ ጸሐፊው', url: '/about' },
      { title: 'English', url: '/' },
    ],
  },

  prefs: {
    button: 'የንባብ ምርጫዎች',
    textSize: 'የፊደል መጠን',
    sizes: { sm: 'አነስ ያለ', md: 'መደበኛ', lg: 'ተለቅ ያለ', xl: 'በጣም ትልቅ' },
    typeface: 'የፊደል ቅርጽ',
    serif: 'ሰሪፍ',
    sans: 'ሳንስ',
    theme: 'ገጽታ',
    themes: { system: 'እንደ መሣሪያው', light: 'ብሩህ', dark: 'ጨለማ' },
    toLight: 'ወደ ብሩህ ገጽታ ይቀይሩ',
    toDark: 'ወደ ጨለማ ገጽታ ይቀይሩ',
  },

  footer: {
    colophon: 'ስለ አቀነባበሩ',
    setIn:
      'የአማርኛው ጽሑፍ በNoto Serif Ethiopic እና በNoto Sans Ethiopic፣ የላቲን ፊደላት በLiterata፣ በCommissioner እና በSource Code Pro፣ ዐረብኛው ደግሞ በAmiri Quran እና በAmiri ተቀናብሯል።',
    translations: 'የቁርኣንና የሐዲስ የአማርኛ ትርጉሞች የተወሰዱበት የታተመ ትርጉም ከእያንዳንዱ ጥቅስ ጎን ይጠቀሳል።',
    follow: 'ይከታተሉ',
    feedLink: 'የአማርኛው RSS መጋቢ',
    feedAfter: ' አዲስ ጽሑፍ በወጣ ቁጥር ያሳውቅዎታል',
    subjects: '',
    feedEnd: '።',
    email: 'ኢሜይል',
    links: [
      { href: '/am/blog', title: 'ሁሉም ጽሑፎች' },
      { href: '/', title: 'English', hrefLang: 'en', lang: 'en' },
    ],
    newsletter: {
      label: 'አዳዲስ ጽሑፎች በኢሜይል',
      subscribe: 'ይመዝገቡ',
      subscribing: 'በመመዝገብ ላይ…',
      done: 'ተመዝግበዋል። የማረጋገጫ ኢሜይል ይጠብቁ።',
      error: 'አልተሳካም። አድራሻውን አረጋግጠው እንደገና ይሞክሩ።',
    },
  },

  types: {
    essay: 'ድርሰት',
    qa: 'ጥያቄ',
    note: 'ማስታወሻ',
  },
  nouns: {
    essay: ['ድርሰት', 'ድርሰቶች'],
    qa: ['መልስ', 'መልሶች'],
    note: ['ማስታወሻ', 'ማስታወሻዎች'],
    piece: ['ጽሑፍ', 'ጽሑፎች'],
  },
  categories: {
    Foundations: 'የእውቀት መሠረቶች',
    'Existence of God': 'የአምላክ መኖር',
    'Truth of Islam': 'የእስልምና እውነትነት',
    'Answering Doubts': 'ለጥርጣሬዎች ምላሽ',
    Notes: 'ማስታወሻዎች',
  },

  post: {
    contents: 'ማውጫ',
    shortAnswer: 'አጭሩ መልስ',
    notes: 'የግርጌ ማስታወሻዎች',
    backToReference: 'ወደ ማጣቀሻ {n} ይመለሱ',
    minRead: 'የ{n} ደቂቃ ንባብ',
    revised: 'የተሻሻለው',
    filedUnder: 'ርዕሰ ጉዳዮች',
    suggestCorrection: 'እርማት ይጠቁሙ',
    related: 'ተዛማጅ ንባብ',
    pager: 'ቀዳሚውና ቀጣዩ ጽሑፍ',
    older: 'ቀዳሚ',
    newer: 'ቀጣይ',
    seriesPartOf: '{name}፦ ክፍል {part} ከ{total}',
    seriesPart: 'ክፍል {n}',
    seriesOther: '{name}፦ ሌሎች ክፍሎች',
    sideNote: 'የጎን ማስታወሻ',
    loadComments: 'አስተያየቶችን ይጫኑ',
    translations: 'በሌላ ቋንቋ',
  },

  mdx: {
    callout: { note: 'ማስታወሻ', important: 'ጠቃሚ', clarification: 'ማብራሪያ' },
    quran: 'ቁርኣን',
    quranCaps: 'ቁርኣን',
    translatedBy: 'ትርጉም፦',
    copy: 'ይቅዱ',
    copied: '{label} ተቀድቷል',
    copyFailed: 'መቅዳት አልተቻለም። ጽሑፉን መርጠው በእጅ ይቅዱ።',
    grades: { sahih: 'ትክክለኛ', hasan: 'መልካም', daif: 'ደካማ' },
    topic: 'ርዕስ',
    inGlossary: 'በመዝገበ ቃላቱ ውስጥ',
  },

  index: {
    otherLanguage: 'በእንግሊዝኛ',
    era: 'ዓ.ም.',
    feed: 'RSS',
    archive: 'ሁሉም ጽሑፎች',
    archiveLede: 'በአማርኛ የተጻፉና ወደ አማርኛ የተተረጎሙ ጽሑፎች ሁሉ፣ በዓመት ተመድበው።',
    empty: 'እስካሁን ምንም የለም።',
    latest: 'የቅርብ ጊዜ ጽሑፎች',
    fullArchive: 'ሁሉንም ጽሑፎች ይመልከቱ',
    readMore: 'ያንብቡ',
  },

  notFound: {
    title: 'ገጹ አልተገኘም',
    lede: 'በዚህ አድራሻ የሚገኝ ገጽ የለም። ገጹ ተዛውሮ ወይም አድራሻው በስህተት ተጽፎ ሊሆን ይችላል።',
    links: [
      { href: '/am', title: 'የአማርኛው የፊት ገጽ' },
      { href: '/am/blog', title: 'ሁሉም የአማርኛ ጽሑፎች' },
      { href: '/', title: 'The English front page', lang: 'en' },
    ],
  },
}

export default am
