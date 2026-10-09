import type { PlanId } from '../../../content/plans'
import type { PlanText } from '../../types'

export const plans: Record<PlanId, PlanText> = {
  '12:12': {
    name: '12:12',
    tagline: 'The gentle start',
    description:
      'Fast for 12 hours and eat within 12. For many people this simply means no snacking after dinner. A good way to get used to fasting before going further.',
    howTo: ['Finish dinner by 7 pm', 'Breakfast no earlier than 7 am', 'Water, coffee and tea are fine all night'],
    goodFor: ['Complete beginners', 'Building a routine around evening snacking', 'Testing whether fasting suits you'],
    watchOut: ['Rarely gives much weight loss on its own – what you eat still matters most'],
  },
  '14:10': {
    name: '14:10',
    tagline: 'The step before 16:8',
    description:
      'A middle ground that many people keep long term. Often recommended for women who want to start gently, since some find that longer fasts affect sleep and energy.',
    howTo: ['Finish dinner by 7 pm', 'First meal at 9 am', 'Eat two to three proper meals within the window'],
    goodFor: ['Beginners who are comfortable with 12:12', 'Anyone who wants a sustainable everyday schedule'],
    watchOut: ['Don’t make up for it with bigger portions late in the evening'],
  },
  '16:8': {
    name: '16:8',
    tagline: 'The most popular method',
    description:
      'The Leangains method: a 16-hour fast and an 8-hour eating window. In practice most people skip breakfast and eat between, say, noon and 8 pm. It’s the most studied form of time-restricted eating (TRE).',
    howTo: ['Last meal at 8 pm', 'First meal at noon the next day', 'Two to three meals rich in protein and fiber'],
    goodFor: ['People who aren’t breakfast people', 'Eating less without counting', 'A fixed daily routine'],
    watchOut: ['Get enough protein to keep your muscle mass', 'Training on an empty stomach can feel harder at first'],
  },
  '18:6': {
    name: '18:6',
    tagline: 'A bit more challenge',
    description:
      'A shorter, six-hour eating window. Easier to end up in a calorie deficit, but also harder to get enough nutrients.',
    howTo: ['Eat between e.g. 1 pm and 7 pm', 'Plan two substantial meals', 'Prioritize protein, vegetables and whole grains'],
    goodFor: ['Experienced 16:8 fasters who want more structure'],
    watchOut: ['Risk of too little protein', 'Watch out for dizziness, headaches and sleep problems'],
  },
  '20:4': {
    name: '20:4 – Warrior',
    tagline: 'A short eating window',
    description:
      'The Warrior diet: a 20-hour fast and a four-hour eating window, usually in the evening. Demanding – and hard to get all the nutrients your body needs.',
    howTo: ['Eat between e.g. 4 pm and 8 pm', 'One large meal plus a snack', 'Electrolytes can help with headaches'],
    goodFor: ['Experienced fasters in good health'],
    watchOut: ['Binge eating in the window', 'Hard to reach your protein needs', 'Not suitable with diabetes medication'],
  },
  omad: {
    name: 'OMAD 23:1',
    tagline: 'One meal a day',
    description:
      'One Meal A Day. You eat all your daily energy in one sitting. Simple logistics, but that single meal has to be nutritious and large enough.',
    howTo: [
      'Pick a fixed time, e.g. 6 pm',
      'The meal should contain protein, fat, vegetables and carbohydrates',
      'Drink plenty during the day',
    ],
    goodFor: ['Experienced fasters who find it simplifies their day'],
    watchOut: ['High risk of nutrient gaps if done every day', 'A huge meal can cause blood sugar spikes and fatigue'],
    warning: 'Talk to your doctor if you have a chronic condition or take medication.',
  },
  '5:2': {
    name: '5:2',
    tagline: 'Two light days a week',
    description:
      'Eat normally five days a week and about 500 kcal (women) or 600 kcal (men) on two non-consecutive days. The method became hugely popular in the UK and Scandinavia around 2013 and is backed by several studies.',
    howTo: [
      'Pick two days, e.g. Monday and Thursday',
      'Spend the 500–600 kcal on one or two protein-rich meals',
      'Eat normally – not extra – on the other days',
    ],
    goodFor: ['People who prefer two tough days over daily rules', 'People who don’t want to skip meals every day'],
    watchOut: ['Can cause headaches, irritability and poor concentration on the low days'],
  },
  'eat-stop-eat': {
    name: 'Eat-Stop-Eat (24 h)',
    tagline: 'A 24-hour fast once or twice a week',
    description: 'Fast for a full day, e.g. dinner to dinner, once or twice a week. Eat normally on the other days.',
    howTo: [
      'Eat dinner at 6 pm',
      'Fast until 6 pm the next day',
      'Drink water, coffee and tea – consider adding salt/electrolytes',
    ],
    goodFor: ['People who want flexibility the rest of the week'],
    watchOut: ['Hunger, headaches and irritability are common the first times', 'Avoid hard training on fasting days at first'],
  },
  adf: {
    name: 'Alternate-day fasting (ADF)',
    tagline: 'Fast every other day',
    description:
      'Eat normally one day and fast the next – either completely or on about 25% of your energy needs (around 500 kcal). One of the most studied forms, but studies show more drop-outs than with ordinary calorie restriction.',
    howTo: [
      'Fasting day: water, coffee, tea – optionally one small ~500 kcal meal',
      'Eating day: eat normally, don’t feast',
      'Use the timer’s 36-hour goal for a full fasting day',
    ],
    goodFor: ['People who want clear rules and handle hunger well'],
    watchOut: ['Hard to keep up socially and long term', 'Can get in the way of your training schedule'],
    warning: 'Not suitable with diabetes, a history of eating disorders, pregnancy or underweight.',
  },
  '36h': {
    name: '36 hours',
    tagline: 'The monk fast',
    description:
      'You skip a whole day: dinner on day 1 to breakfast on day 3. Sometimes used by experienced fasters as an occasional challenge.',
    howTo: ['Dinner at 8 pm on day 1', 'No food on day 2', 'Breakfast at 8 am on day 3 – start light'],
    goodFor: ['Experienced fasters who have done 24 h without problems'],
    watchOut: ['Electrolytes (salt, potassium, magnesium) become important', 'Break the fast gently'],
    warning: 'Stop if you feel dizzy, get palpitations, confusion or feel faint.',
  },
  '48h': {
    name: '48 hours',
    tagline: 'Extended fast',
    description:
      'Two days without food. Extended fasts have much weaker research support than short ones and carry more risk. Do it rarely, and only if you know your body well.',
    howTo: [
      'Plan for low physical activity',
      'Drink water with electrolytes',
      'Break the fast with a small, easily digested meal',
    ],
    goodFor: ['Very experienced fasters in good health'],
    watchOut: ['Muscle breakdown', 'Electrolyte disturbances', 'Sleep problems'],
    warning: 'Talk to a doctor before an extended fast. Not suitable with medication, diabetes, heart disease or pregnancy.',
  },
  '72h': {
    name: '72 hours',
    tagline: 'Only with medical supervision',
    description:
      'Three days without food. We include it because many people ask, but we don’t recommend it without medical follow-up.',
    howTo: ['Talk to a doctor first', 'Electrolytes every day', 'Stop immediately if you get symptoms'],
    goodFor: ['People under medical supervision'],
    watchOut: [
      'Risk of refeeding syndrome when you start eating again',
      'Severe electrolyte disturbances',
      'Effects on heart rhythm',
    ],
    warning: 'Don’t do this without having talked to a doctor.',
  },
}
