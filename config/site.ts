/**
 * CENTRAL SITE CONFIGURATION
 * Edit this file to customise your quiz without touching any component code.
 */

export const siteConfig = {
  // ─── Profile ──────────────────────────────────────────────────────────────
  profile: {
    name: "Your Name",
    bio: "Add a short bio or tagline here ✨",
    /**
     * Can be:
     *  - an absolute URL  "https://…"
     *  - a /public path   "/profile.png"
     *  - empty string ""  → shows emoji fallback
     */
    profileImage: "https://cdn.discordapp.com/attachments/987929503730896916/1431959305128640675/fb4a9bf8f08402caaaf3d416e3f55688.jpg?ex=69f7d246&is=69f680c6&hm=18ac6052397dee5afcb21b9575cf7df691c6597fc6aea82ecdea75b31d4b6b1e",
  },

  // ─── Quiz settings ─────────────────────────────────────────────────────────
  quiz: {
    /** Total questions stored in data/questions.json */
    totalQuestions: 15,
    /** How many are randomly drawn each session */
    questionsPerSession: 5,
  },

  // ─── Scoring ───────────────────────────────────────────────────────────────
  scoring: {
    /** Random bonus added on top of raw quiz score (keeps it fun) */
    bonusMin: 0,
    bonusMax: 10,
    messages: [
      {
        minScore: 90,
        title: "Soulmate Level 💖",
        message: "You know me better than I know myself — we're basically the same person!",
      },
      {
        minScore: 70,
        title: "BFF Material 🌸",
        message: "We're definitely more than just friends — you really get me!",
      },
      {
        minScore: 50,
        title: "Good Friend 🤝",
        message: "You know the important stuff. We should hang out more though!",
      },
      {
        minScore: 30,
        title: "Acquaintance 👋",
        message: "We might be friends, but there's a lot you still don't know about me!",
      },
      {
        minScore: 0,
        title: "Stranger? 😅",
        message: "Did we just meet? Let's get to know each other better!",
      },
    ],
  },

  // ─── Certificate titles (matched by friendshipScore) ──────────────────────
  certificate: {
    titles: [
      { minScore: 90, title: "Certified Soulmate" },
      { minScore: 70, title: "Official Best Friend" },
      { minScore: 50, title: "Trusted Friend" },
      { minScore: 30, title: "Friendly Acquaintance" },
      { minScore: 0, title: "New Friend" },
    ],
  },

  // ─── Admin / logs ──────────────────────────────────────────────────────────
  admin: {
    /**
     * The URL segment that exposes your admin dashboard.
     * Must match the folder name under /app/[adminPath]
     * Change this AND rename the app folder accordingly before deploying.
     * Default: "secret-logs"  →  /secret-logs
     */
    path: "secret-logs",
  },

  // ─── Theme ─────────────────────────────────────────────────────────────────
  theme: {
    /**
     * "dark"  → Black / charcoal premium feel
     * "pink"  → Soft pink gradients (original style)
     * "green" → Calm pastel green
     */
    default: "green" as "dark" | "pink" | "green",
  },

  // ─── SEO / meta ───────────────────────────────────────────────────────────
  meta: {
    title: "Who Knows Me Best? 💖",
    description:
      "Take the quiz and find out how well you know your friend!",
  },
} as const;

export type Theme = typeof siteConfig.theme.default;
export type SiteConfig = typeof siteConfig;
