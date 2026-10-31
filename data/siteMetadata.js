/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'Ḥāshiya',
  author: 'Abdulkarim G. Mohammed',
  headerTitle: 'Ḥāshiya',
  // One-line mission, shown on the home cover and in search results. Edit freely.
  description:
    'Essays on God, scripture and the religions of the book, with careful answers to questions about Islam.',
  language: 'en',
  theme: 'system', // system, dark or light
  siteUrl: 'https://blog.abdulkarimg.com',
  siteRepo: 'https://github.com/Mr-MaNia7/abdulkarimg-blog',
  siteLogo: `${process.env.BASE_PATH || ''}/static/favicons/icon-512.png`,
  // Generated at build by scripts/og.mjs.
  socialBanner: `${process.env.BASE_PATH || ''}/og/default.png`,
  // Social links: leave a value empty to hide it in the footer.
  email: '',
  telegram: 'https://t.me/abdulkarimgm',
  tiktok: 'https://www.tiktok.com/@abkarimg',
  github: '',
  x: '',
  youtube: 'https://www.youtube.com/@AbdulkarimG',
  linkedin: '',
  mastodon: '',
  bluesky: '',
  threads: '',
  instagram: 'https://www.instagram.com/abdulkarimgetachew',
  facebook: 'https://www.facebook.com/share/1CLEt2LZhH/',
  medium: '',
  locale: 'en-US',
  // The masthead stays at the top and condenses on scroll.
  stickyNav: true,
  analytics: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // supports Plausible, Simple Analytics, Umami, Posthog or Google Analytics.
    umamiAnalytics: {
      // We use an env variable for this site to avoid other users cloning our analytics ID
      umamiWebsiteId: process.env.NEXT_UMAMI_ID, // e.g. 123e4567-e89b-12d3-a456-426614174000
      // You may also need to overwrite the script if you're storing data in the US - ex:
      // src: 'https://us.umami.is/script.js'
      // Remember to add 'us.umami.is' in `next.config.js` as a permitted domain for the CSP
    },
    // plausibleAnalytics: {
    //   plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
    // If you are hosting your own Plausible.
    //   src: '', // e.g. https://plausible.my-domain.com/js/script.js
    // },
    // simpleAnalytics: {},
    // posthogAnalytics: {
    //   posthogProjectApiKey: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
    // },
    // googleAnalytics: {
    //   googleAnalyticsId: '', // e.g. G-XXXXXXX
    // },
  },
  newsletter: {
    // Static site (Cloudflare Pages): paste your provider's hosted form URL into
    // formAction, e.g. Buttondown's https://buttondown.com/api/emails/embed-subscribe/<username>.
    // The footer form then posts there directly and works without JavaScript.
    formAction: '',
    fieldName: 'email',
    // Server deployments only: pliny's /api/newsletter route with one of
    // mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus, beehive (see .env.example).
    // Empty for now: no signup form is shown anywhere, only the RSS link.
    provider: '',
  },
  comments: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // Select a provider and use the environment variables associated to it
    // https://vercel.com/docs/environment-variables
    provider: 'giscus', // supported providers: giscus, utterances, disqus
    giscusConfig: {
      // Visit the link below, and follow the steps in the 'configuration' section
      // https://giscus.app/
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname', // supported options: pathname, url, title
      reactions: '1', // Emoji reactions: 1 = enable / 0 = disable
      // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
      metadata: '0',
      // theme example: light, dark, dark_dimmed, dark_high_contrast
      // transparent_dark, preferred_color_scheme, custom
      theme: 'light',
      // theme when dark mode
      darkTheme: 'transparent_dark',
      // If the theme option above is set to 'custom`
      // please provide a link below to your custom theme css file.
      // example: https://giscus.app/themes/custom_example.css
      themeURL: '',
      // This corresponds to the `data-lang="en"` in giscus's configurations
      lang: 'en',
    },
  },
  search: {
    // Pagefind: a static index built after `yarn build` (scripts/postbuild.mjs),
    // queried by the ⌘K palette. Supports Arabic.
    provider: 'pagefind',
  },
}

module.exports = siteMetadata
