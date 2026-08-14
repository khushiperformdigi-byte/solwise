import spiritualityImg from "../assets/wisdom/spirituality.jpg";
import meditationImg from "../assets/wisdom/meditation.jpg";
import healingImg from "../assets/wisdom/healing.jpg";
import crystalsImg from "../assets/workshops/crystals.jpg";
import retreatImg from "../assets/workshops/meditation.jpg";
import numerologyImg from "../assets/workshops/numerology.jpg";
import candleImg from "../assets/transformations/candle.jpg";
import stillLifeImg from "../assets/booking/still-life.jpg";
import candleVaseImg from "../assets/faq/candle-vase.jpg";

export const BLOG_CATEGORIES = [
  "Meditation",
  "Mindfulness",
  "Healing",
  "Spiritual Growth",
  "Wellness",
  "Life-Coaching",
];

export const BLOG_POSTS = [
  {
    id: 1,
    slug: "the-power-of-daily-meditation",
    image: meditationImg,
    category: "Meditation",
    date: "May 12, 2024",
    readTime: "8 min read",
    author: "Dr. Sachin Bansal",
    title: "The Power of Daily Meditation: A Journey Within",
    excerpt: "Learn how stillness and presence open the door to deeper wisdom and inner peace.",
    intro:
      "In the quiet hours of morning, when the world has not yet asked anything of you, there is a doorway. Daily meditation is not about emptying the mind or becoming someone else — it is a return to the stillness that has always lived within you.",
    sections: [
      {
        heading: "Why Daily Meditation Matters",
        paragraphs: [
          "A few minutes of presence each day can gently reshape how you meet stress, emotion and choice. Over time, meditation becomes less of a task and more of a homecoming — a way of remembering who you are beneath the noise.",
        ],
        bullets: [
          "Reduced stress and a calmer nervous system",
          "Greater emotional balance and self-awareness",
          "Clearer focus for work, relationships and inner work",
          "A deeper sense of peace that stays with you through the day",
        ],
      },
      {
        heading: "Simple Ways to Start Your Practice",
        paragraphs: [
          "You do not need a perfect space or a long ritual. Begin simply, and let consistency do the sacred work.",
        ],
        steps: [
          "Begin with just five minutes, at the same time each day.",
          "Choose a quiet, comfortable seat and soften the shoulders.",
          "Rest your attention on the breath, without forcing it.",
          "When the mind wanders, return gently — this is the practice.",
          "Close with gratitude for showing up for yourself.",
        ],
      },
    ],
    quote: {
      text: "You don't have to control your thoughts. You just have to stop letting them control you.",
      attribution: "— A reminder for the path",
    },
  },
  {
    id: 2,
    slug: "the-power-of-inner-alignment",
    image: spiritualityImg,
    category: "Spiritual Growth",
    date: "May 8, 2024",
    readTime: "6 min read",
    author: "Dr. Sachin Bansal",
    title: "The Power of Inner Alignment",
    excerpt: "Discover how aligning your thoughts, energy, and actions can transform your reality.",
    intro:
      "Inner alignment is the quiet agreement between what you feel, what you believe and how you live. When those three begin to move as one, life stops feeling like a struggle and starts feeling like a path.",
    sections: [
      {
        heading: "What Alignment Really Means",
        paragraphs: [
          "Alignment is not perfection. It is honesty — choosing thoughts, environments and relationships that support the soul you are becoming.",
        ],
        bullets: [
          "Clarity about what you truly want",
          "Less inner conflict and self-doubt",
          "Decisions that feel grounded, not forced",
        ],
      },
      {
        heading: "Practices to Realign",
        paragraphs: ["Return to alignment with small, daily acts of truth."],
        steps: [
          "Pause and ask: does this feel true?",
          "Release one obligation that drains your spirit.",
          "Speak one honest sentence you have been holding back.",
          "End the day with a simple reflection of gratitude.",
        ],
      },
    ],
    quote: {
      text: "When you align with your inner truth, the outer world begins to rearrange itself around you.",
      attribution: "— Dr. Sachin Bansal",
    },
  },
  {
    id: 3,
    slug: "energy-healing-restoring-balance",
    image: healingImg,
    category: "Healing",
    date: "April 30, 2024",
    readTime: "7 min read",
    author: "Dr. Sachin Bansal",
    title: "Energy Healing: Restoring Balance",
    excerpt: "Explore the gentle art of energy healing and how it helps restore your natural balance.",
    intro:
      "Energy healing is a return to the body’s original intelligence. When the field is clear, the mind softens, the heart opens and balance becomes possible again.",
    sections: [
      {
        heading: "How Energy Work Supports You",
        paragraphs: [
          "Gentle, intentional work with the energy body can release what words alone cannot reach — old emotion, tension and unseen fatigue.",
        ],
        bullets: [
          "Release of stored emotional weight",
          "A lighter, more spacious inner state",
          "Support for rest, clarity and vitality",
        ],
      },
      {
        heading: "What to Expect",
        paragraphs: ["Every session is held with care, presence and confidentiality."],
        steps: [
          "We begin by listening to where you are.",
          "The work is gentle, never forced.",
          "Integration continues after the session ends.",
        ],
      },
    ],
    quote: {
      text: "Healing is not becoming someone new. It is remembering who you were before the world asked you to forget.",
      attribution: "— Dr. Sachin Bansal",
    },
  },
  {
    id: 4,
    slug: "crystal-wisdom-for-daily-life",
    image: crystalsImg,
    category: "Healing",
    date: "April 22, 2024",
    readTime: "5 min read",
    author: "Dr. Sachin Bansal",
    title: "Crystal Wisdom for Daily Life",
    excerpt: "Simple ways to work with crystals to cleanse your aura and support emotional clarity.",
    intro:
      "Crystals are quiet companions. They do not replace inner work — they remind you of it, holding a steady frequency while you return to yourself.",
    sections: [
      {
        heading: "Living with Crystal Energy",
        paragraphs: ["Keep the practice simple, sincere and close to daily life."],
        bullets: [
          "Place a clear quartz near your meditation seat",
          "Hold a stone while you set an intention",
          "Cleanse crystals with moonlight, sound or breath",
        ],
      },
    ],
    quote: {
      text: "Let the stone remind you of stillness. Let your stillness do the rest.",
      attribution: "— Dr. Sachin Bansal",
    },
  },
  {
    id: 5,
    slug: "a-morning-practice-for-calm",
    image: retreatImg,
    category: "Mindfulness",
    date: "April 16, 2024",
    readTime: "5 min read",
    author: "Dr. Sachin Bansal",
    title: "A Morning Practice for Calm",
    excerpt: "A gentle mindfulness ritual to begin your day with presence, breath and gratitude.",
    intro:
      "The first minutes of the day shape the rest. A short morning practice can turn hurry into presence before the world arrives.",
    sections: [
      {
        heading: "A Simple Morning Sequence",
        paragraphs: ["Keep it brief enough to repeat, deep enough to feel."],
        steps: [
          "Sit, and feel the body arrive.",
          "Take ten slow breaths.",
          "Name one thing you are grateful for.",
          "Set a single intention for the day.",
        ],
      },
    ],
    quote: {
      text: "How you begin is how you belong to the day.",
      attribution: "— Dr. Sachin Bansal",
    },
  },
  {
    id: 6,
    slug: "numbers-as-a-path-to-purpose",
    image: numerologyImg,
    category: "Spiritual Growth",
    date: "April 9, 2024",
    readTime: "6 min read",
    author: "Dr. Sachin Bansal",
    title: "Numbers as a Path to Purpose",
    excerpt: "How astro numerology can reveal patterns, timing and the deeper meaning of your journey.",
    intro:
      "Numbers are a language of timing and truth. When read with wisdom, they do not trap you in fate — they illuminate the path you are already walking.",
    sections: [
      {
        heading: "What Numerology Can Reveal",
        paragraphs: [
          "Your numbers can highlight strengths, cycles and the lessons asking for attention now.",
        ],
        bullets: [
          "Life path and soul purpose",
          "Personal year cycles and timing",
          "Patterns in relationships and work",
        ],
      },
    ],
    quote: {
      text: "The numbers do not decide your life. They help you listen to it.",
      attribution: "— Dr. Sachin Bansal",
    },
  },
  {
    id: 7,
    slug: "sacred-rhythms-of-rest",
    image: candleImg,
    category: "Wellness",
    date: "March 28, 2024",
    readTime: "6 min read",
    author: "Dr. Sachin Bansal",
    title: "Sacred Rhythms of Rest",
    excerpt: "Create a nourishing evening ritual that restores your nervous system and inner light.",
    intro:
      "Rest is not a reward you earn after doing enough. It is a sacred rhythm — the soil in which clarity, healing and devotion grow.",
    sections: [
      {
        heading: "An Evening Unwinding Ritual",
        paragraphs: ["Let night become a gentle closing, not another list."],
        steps: [
          "Dim the lights and put the phone aside.",
          "Light a candle as a threshold into rest.",
          "Breathe slowly for two minutes.",
          "Journal one release and one gratitude.",
        ],
      },
    ],
    quote: {
      text: "Your nervous system is a temple. Treat evening as its prayer.",
      attribution: "— Dr. Sachin Bansal",
    },
  },
  {
    id: 8,
    slug: "choosing-a-life-that-feels-true",
    image: stillLifeImg,
    category: "Life-Coaching",
    date: "March 18, 2024",
    readTime: "7 min read",
    author: "Dr. Sachin Bansal",
    title: "Choosing a Life That Feels True",
    excerpt: "Coaching insights to release old stories and move toward a more aligned, purposeful path.",
    intro:
      "A true life is not the most impressive one. It is the one that feels honest in the body when no one is watching.",
    sections: [
      {
        heading: "From Old Stories to New Choices",
        paragraphs: [
          "Coaching is a mirror and a map — helping you see the story you have been living, then choose a truer one.",
        ],
        bullets: [
          "Name the life you are performing vs. the life you want",
          "Release roles that no longer belong to you",
          "Take one aligned action this week",
        ],
      },
    ],
    quote: {
      text: "Purpose is not found far away. It is chosen, again and again, in the next honest step.",
      attribution: "— Dr. Sachin Bansal",
    },
  },
  {
    id: 9,
    slug: "small-altars-big-shifts",
    image: candleVaseImg,
    category: "Wellness",
    date: "March 6, 2024",
    readTime: "4 min read",
    author: "Dr. Sachin Bansal",
    title: "Small Altars, Big Shifts",
    excerpt: "How a simple sacred corner at home can support healing, focus and daily devotion.",
    intro:
      "A small altar is a promise to yourself. It says: there is a place in this home where the soul is welcome.",
    sections: [
      {
        heading: "Create a Corner of Devotion",
        paragraphs: ["Keep it simple, beautiful and used."],
        steps: [
          "Choose one quiet surface.",
          "Add a candle, a flower or a meaningful object.",
          "Visit it daily, even for one breath.",
        ],
      },
    ],
    quote: {
      text: "Sacred space is not about decoration. It is about remembrance.",
      attribution: "— Dr. Sachin Bansal",
    },
  },
];

export function getPostBySlug(slug) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getRelatedPosts(slug, limit = 3) {
  const current = getPostBySlug(slug);
  if (!current) return BLOG_POSTS.slice(0, limit);
  const sameCategory = BLOG_POSTS.filter((p) => p.slug !== slug && p.category === current.category);
  const others = BLOG_POSTS.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...sameCategory, ...others].slice(0, limit);
}

export function getAdjacentPosts(slug) {
  const index = BLOG_POSTS.findIndex((p) => p.slug === slug);
  if (index < 0) return { prev: null, next: null };
  return {
    prev: index > 0 ? BLOG_POSTS[index - 1] : null,
    next: index < BLOG_POSTS.length - 1 ? BLOG_POSTS[index + 1] : null,
  };
}

export function getCategoryCounts() {
  return BLOG_CATEGORIES.map((name) => ({
    name,
    count: BLOG_POSTS.filter((p) => p.category === name).length,
  }));
}
