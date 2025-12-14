export interface Quote {
  text: string;
  author: string;
  source?: string;
}

export const quotes: Quote[] = [
  {
    text: "The unexamined life is not worth living.",
    author: "Socrates",
    source: "Apology"
  },
  {
    text: "We suffer more often in imagination than in reality.",
    author: "Seneca",
    source: "Letters from a Stoic"
  },
  {
    text: "Happiness depends upon ourselves.",
    author: "Aristotle",
    source: "Nicomachean Ethics"
  },
  {
    text: "The only true wisdom is in knowing you know nothing.",
    author: "Socrates"
  },
  {
    text: "He who has a why to live can bear almost any how.",
    author: "Friedrich Nietzsche"
  },
  {
    text: "The present moment is filled with joy and happiness. If you are attentive, you will see it.",
    author: "Thich Nhat Hanh"
  },
  {
    text: "No man is free who is not master of himself.",
    author: "Epictetus"
  },
  {
    text: "The soul becomes dyed with the color of its thoughts.",
    author: "Marcus Aurelius",
    source: "Meditations"
  },
  {
    text: "Life must be understood backward. But it must be lived forward.",
    author: "Søren Kierkegaard"
  },
  {
    text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "The mind is everything. What you think you become.",
    author: "Buddha"
  },
  {
    text: "Waste no more time arguing about what a good man should be. Be one.",
    author: "Marcus Aurelius",
    source: "Meditations"
  },
  {
    text: "In the depth of winter, I finally learned that within me there lay an invincible summer.",
    author: "Albert Camus"
  },
  {
    text: "The first step toward change is awareness. The second step is acceptance.",
    author: "Nathaniel Branden"
  },
  {
    text: "Peace comes from within. Do not seek it without.",
    author: "Buddha"
  }
];

export function getDailyQuote(): Quote {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 
    (1000 * 60 * 60 * 24)
  );
  return quotes[dayOfYear % quotes.length];
}
