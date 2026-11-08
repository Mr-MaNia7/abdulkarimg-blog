/**
 * The course: the order in which the site's argument is meant to be read.
 * /start renders this file; the home page shows the four parts.
 *
 * Each part is one pillar (its `category` matches a post's `category`).
 * Each module is a planned piece. Give it `slug` (a post's file name in
 * data/blog/, without .mdx) once the post exists: the module then links to it.
 * Until then it is listed as forthcoming. A slug that names no published post
 * is also shown as forthcoming, so drafts never leak.
 *
 * Draft syllabus: titles and order are the author's to change.
 */

export type Module = {
  title: string
  /** One sentence: the question the piece answers. */
  summary?: string
  /** File name of the post in data/blog/, without .mdx. */
  slug?: string
}

export type CoursePart = {
  category: 'Foundations' | 'Existence of God' | 'Truth of Islam' | 'Answering Doubts'
  /** Shorter heading used on /start; defaults to the category. */
  title: string
  /** Classical name for the part, transliterated, shown under the title. */
  classical?: string
  /** Groups of modules. A group with no heading is listed plainly. */
  groups: { heading?: string; modules: Module[] }[]
}

const course: CoursePart[] = [
  {
    category: 'Foundations',
    title: 'Foundations',
    classical: 'uṣūl al-maʿrifa',
    groups: [
      {
        modules: [
          {
            title: 'Why argue for faith at all?',
            summary:
              'Belief, doubt and the burden of proof, and what this course sets out to show.',
          },
          {
            title: 'The sources of knowledge',
            summary:
              'The senses, reason and true report: the three ways of knowing named in the classical creeds.',
          },
          {
            title: 'Fiṭra: what we know before we argue',
            summary:
              'The innate disposition, and why some truths need recognising more than proving.',
          },
          {
            title: 'Deduction, induction and the best explanation',
            summary: 'Three ways an argument can carry its conclusion, and how to tell them apart.',
            slug: 'sample-kinds-of-argument',
          },
          {
            title: 'Self-evident truths and the limits of scepticism',
            summary:
              'Why doubting everything is not an option, and what must be granted to argue at all.',
          },
        ],
      },
    ],
  },
  {
    category: 'Existence of God',
    title: 'The existence of God',
    classical: 'ithbāt al-ṣāniʿ',
    groups: [
      {
        modules: [
          {
            title: 'Ibn Sīnā: the argument from contingency',
            summary: 'From the bare fact that something exists to a Necessary Existent.',
            slug: 'the-logic-of-existence',
          },
          {
            title: 'al-Ghazālī: the argument from origination',
            summary:
              'Whatever begins to exist has a cause; the world began; so the world has a cause.',
          },
          {
            title: 'Ibn Taymiyya: fiṭra, signs and the critique of the theologians',
            summary:
              'Why Ibn Taymiyya held God’s existence to be known by nature, and what he faulted in the kalām proofs.',
          },
          {
            title: 'The argument from design',
            summary:
              'Order, providence and fine-tuning, from Ibn Rushd’s dalīl al-ʿināya to modern physics.',
          },
          {
            title: 'From a first cause to the God of Islam',
            summary:
              'Why the cause the arguments reach must be one, living, knowing, willing and powerful.',
          },
        ],
      },
    ],
  },
  {
    category: 'Truth of Islam',
    title: 'The truth of Islam',
    classical: 'ithbāt al-nubuwwa',
    groups: [
      {
        heading: 'Prophethood and the Qur’an',
        modules: [
          {
            title: 'How a true prophet is known',
            summary: 'Miracles, character and message: the classical proofs of prophethood.',
          },
          {
            title: 'The life and character of the Prophet ﷺ as evidence',
            summary: 'What a liar or a deluded man could not have been, and what he was.',
          },
          {
            title: 'The challenge of the Qur’an',
            summary: 'The taḥaddī, the inimitability of the Qur’an, and what would answer it.',
          },
          {
            title: 'The preservation of the Qur’an',
            summary: 'Memorisation, the written codex and the manuscript evidence.',
          },
          {
            title: 'Prophecies fulfilled',
            summary: 'Statements about the future that came true, and how to weigh them.',
          },
        ],
      },
      {
        heading: 'Islam among the religions',
        modules: [
          {
            title: 'Can more than one religion be true?',
            summary: 'Contradiction, inherited truth, and why Islam alone holds revelation whole.',
            slug: 'sample-one-true-religion',
          },
          {
            title: 'The earlier scriptures',
            summary:
              'What the Qur’an affirms of the Torah and the Gospel, and what it says was changed.',
          },
          {
            title: 'Islam and Christianity',
            summary: 'The Trinity, the Incarnation and the cross, set beside tawḥīd.',
          },
          {
            title: 'Islam and Judaism',
            summary: 'A shared monotheism, and where the two part.',
          },
          {
            title: 'Islam and the religions of the East',
            summary: 'Hinduism and Buddhism read beside the Qur’an.',
          },
        ],
      },
    ],
  },
  {
    category: 'Answering Doubts',
    title: 'Answering doubts',
    classical: 'radd al-shubuhāt',
    groups: [
      {
        heading: 'Worldviews',
        modules: [
          {
            title: 'Atheism and naturalism',
            summary: 'What it means to hold that nature is all there is, and what that costs.',
          },
          {
            title: 'Scientism',
            summary: 'Can science answer every question, including that one?',
          },
          {
            title: 'Liberalism',
            summary: 'The autonomous self, neutrality and rights, examined from the inside.',
          },
          {
            title: 'Feminism',
            summary: 'Its waves and claims, and how Islam frames men, women and justice.',
          },
          {
            title: 'Moral relativism',
            summary: 'If right and wrong are only local custom, can anything be condemned?',
          },
        ],
      },
      {
        heading: 'Arguments',
        modules: [
          {
            title: 'The problem of evil',
            summary: 'If God is good and all-powerful, why is there evil?',
            slug: 'sample-problem-of-evil',
          },
          {
            title: '“Who created God?”',
            summary: 'Why the question misreads the arguments it answers.',
          },
          {
            title: 'Divine hiddenness',
            summary: 'If God exists, why is He not more obvious?',
          },
          {
            title: 'Morality without God',
            summary: 'The Euthyphro dilemma, and where moral obligation comes from.',
          },
          {
            title: 'Hell and divine justice',
            summary: 'Is eternal punishment just?',
          },
          {
            title: 'Predestination and free will',
            summary: 'Qadar, choice and responsibility.',
          },
        ],
      },
    ],
  },
]

export default course
