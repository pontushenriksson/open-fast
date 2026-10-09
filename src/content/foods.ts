/**
 * "Does it break my fast?" items. Verdict and impact are language-neutral;
 * names, amounts and explanations live in `src/i18n/locales/<lang>/foods.ts`.
 */

export type Verdict = 'ok' | 'gray' | 'breaks'

/** 0 = none, 1 = small, 2 = clear */
export type Impact = 0 | 1 | 2

export type FoodCategory = 'drink' | 'food' | 'supplement' | 'other'

export const FOOD_IDS = [
  // drinks
  'water',
  'sparkling',
  'coffee',
  'tea',
  'coffee-milk',
  'latte',
  'cream',
  'bulletproof',
  'soda',
  'diet-soda',
  'juice',
  'milk',
  'alcohol',
  'energy',
  'sports-drink',
  'kombucha',
  'broth',
  'lemon',
  'acv',
  // food
  'apple',
  'banana',
  'nuts',
  'egg',
  'sugar',
  'candy',
  // supplements
  'electrolytes',
  'creatine',
  'protein',
  'bcaa',
  'collagen',
  'vitamins',
  'medicine',
  'fiber',
  'mct',
  // other
  'gum',
  'mints',
  'sweetener',
  'toothpaste',
  'nicotine',
] as const

export type FoodId = (typeof FOOD_IDS)[number]

export interface FoodImpact {
  insulin: Impact
  ketosis: Impact
  autophagy: Impact
}

export interface Food {
  id: FoodId
  emoji: string
  category: FoodCategory
  verdict: Verdict
  impact: FoodImpact
}

const none: FoodImpact = { insulin: 0, ketosis: 0, autophagy: 0 }
const full: FoodImpact = { insulin: 2, ketosis: 2, autophagy: 2 }

export const FOODS: Food[] = [
  { id: 'water', emoji: '💧', category: 'drink', verdict: 'ok', impact: none },
  { id: 'sparkling', emoji: '🫧', category: 'drink', verdict: 'ok', impact: none },
  { id: 'coffee', emoji: '☕', category: 'drink', verdict: 'ok', impact: none },
  { id: 'tea', emoji: '🍵', category: 'drink', verdict: 'ok', impact: none },
  { id: 'coffee-milk', emoji: '🥛', category: 'drink', verdict: 'gray', impact: { insulin: 1, ketosis: 0, autophagy: 1 } },
  { id: 'latte', emoji: '🧋', category: 'drink', verdict: 'breaks', impact: { insulin: 2, ketosis: 1, autophagy: 2 } },
  { id: 'cream', emoji: '🧈', category: 'drink', verdict: 'gray', impact: { insulin: 0, ketosis: 0, autophagy: 1 } },
  { id: 'bulletproof', emoji: '🧈', category: 'drink', verdict: 'breaks', impact: { insulin: 0, ketosis: 0, autophagy: 2 } },
  { id: 'soda', emoji: '🥤', category: 'drink', verdict: 'breaks', impact: full },
  { id: 'diet-soda', emoji: '🥫', category: 'drink', verdict: 'gray', impact: none },
  { id: 'juice', emoji: '🧃', category: 'drink', verdict: 'breaks', impact: full },
  { id: 'milk', emoji: '🥛', category: 'drink', verdict: 'breaks', impact: { insulin: 2, ketosis: 1, autophagy: 2 } },
  { id: 'alcohol', emoji: '🍷', category: 'drink', verdict: 'breaks', impact: { insulin: 1, ketosis: 2, autophagy: 2 } },
  { id: 'energy', emoji: '⚡', category: 'drink', verdict: 'gray', impact: none },
  { id: 'sports-drink', emoji: '🏃', category: 'drink', verdict: 'breaks', impact: full },
  { id: 'kombucha', emoji: '🍾', category: 'drink', verdict: 'breaks', impact: { insulin: 1, ketosis: 1, autophagy: 1 } },
  { id: 'broth', emoji: '🍲', category: 'drink', verdict: 'gray', impact: { insulin: 1, ketosis: 0, autophagy: 1 } },
  { id: 'lemon', emoji: '🍋', category: 'drink', verdict: 'ok', impact: none },
  { id: 'acv', emoji: '🫙', category: 'drink', verdict: 'ok', impact: none },

  { id: 'apple', emoji: '🍎', category: 'food', verdict: 'breaks', impact: full },
  { id: 'banana', emoji: '🍌', category: 'food', verdict: 'breaks', impact: full },
  { id: 'nuts', emoji: '🥜', category: 'food', verdict: 'breaks', impact: { insulin: 1, ketosis: 1, autophagy: 2 } },
  { id: 'egg', emoji: '🥚', category: 'food', verdict: 'breaks', impact: { insulin: 1, ketosis: 0, autophagy: 2 } },
  { id: 'sugar', emoji: '🍯', category: 'food', verdict: 'breaks', impact: { insulin: 1, ketosis: 1, autophagy: 1 } },
  { id: 'candy', emoji: '🍬', category: 'food', verdict: 'breaks', impact: full },

  { id: 'electrolytes', emoji: '🧂', category: 'supplement', verdict: 'ok', impact: none },
  { id: 'creatine', emoji: '💪', category: 'supplement', verdict: 'ok', impact: none },
  { id: 'protein', emoji: '🥤', category: 'supplement', verdict: 'breaks', impact: { insulin: 2, ketosis: 1, autophagy: 2 } },
  { id: 'bcaa', emoji: '💊', category: 'supplement', verdict: 'breaks', impact: { insulin: 1, ketosis: 0, autophagy: 2 } },
  { id: 'collagen', emoji: '🦴', category: 'supplement', verdict: 'breaks', impact: { insulin: 1, ketosis: 0, autophagy: 2 } },
  { id: 'vitamins', emoji: '💊', category: 'supplement', verdict: 'gray', impact: none },
  { id: 'medicine', emoji: '🩺', category: 'supplement', verdict: 'gray', impact: none },
  { id: 'fiber', emoji: '🌾', category: 'supplement', verdict: 'gray', impact: { insulin: 0, ketosis: 0, autophagy: 1 } },
  { id: 'mct', emoji: '🫗', category: 'supplement', verdict: 'breaks', impact: { insulin: 0, ketosis: 0, autophagy: 2 } },

  { id: 'gum', emoji: '🫧', category: 'other', verdict: 'gray', impact: none },
  { id: 'mints', emoji: '🍬', category: 'other', verdict: 'gray', impact: none },
  { id: 'sweetener', emoji: '🌿', category: 'other', verdict: 'ok', impact: none },
  { id: 'toothpaste', emoji: '🪥', category: 'other', verdict: 'ok', impact: none },
  { id: 'nicotine', emoji: '🚭', category: 'other', verdict: 'ok', impact: none },
]

/** Shortcuts shown on the timer screen. */
export const QUICK_FOOD_IDS: FoodId[] = ['apple', 'soda', 'diet-soda', 'coffee-milk', 'gum', 'protein']

export function findFood(id: FoodId): Food {
  return FOODS.find((f) => f.id === id)!
}
