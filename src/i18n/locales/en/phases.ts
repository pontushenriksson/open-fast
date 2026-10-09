import type { PhaseId } from '../../../content/phases'
import type { PhaseText } from '../../types'

export const phases: Record<PhaseId, PhaseText> = {
  digest: {
    title: 'Digestion',
    short: 'Blood sugar and insulin rise',
    body: 'Your body is breaking down your last meal. Blood sugar and insulin rise, and insulin helps move the energy into your cells. Whatever isn’t needed right away is stored as glycogen in the liver and muscles, and as fat.',
    fuel: 'Glucose and fat from the meal you just ate.',
    feel: 'Full and satisfied. Some people feel a little sleepy after a large, carb-heavy meal.',
    tips: [
      'A meal with protein, fiber and fat keeps you full longer and makes the fast easier.',
      'Start the timer when you finish eating – or set the time afterwards.',
    ],
  },
  postabsorptive: {
    title: 'Blood sugar levels out',
    short: 'Insulin falls',
    body: 'The meal is mostly absorbed. Insulin drops back towards baseline, and the liver starts releasing glucose from its glycogen stores to keep blood sugar steady. This is the normal “between meals” state your body is in every night.',
    fuel: 'Mainly glucose from liver glycogen, with a growing share of fat.',
    feel: 'Usually nothing special. If you normally snack in the evening, this is when the habit kicks in.',
    tips: [
      'Brush your teeth after dinner – a simple signal that the kitchen is closed.',
      'Herbal tea or sparkling water helps against evening cravings.',
    ],
  },
  glycogen: {
    title: 'Glycogen in use',
    short: 'Fat burning gradually increases',
    body: 'Liver glycogen keeps falling and the share of energy from fat rises step by step. Hunger tends to come in waves around your usual mealtimes: the hunger hormone ghrelin follows your habits and settles again after a while.',
    fuel: 'A mix of liver glycogen and fat, with fat increasing.',
    feel: 'Hunger waves, especially around your usual breakfast time. They usually pass in 15–20 minutes.',
    tips: [
      'Ride out the hunger wave with a big glass of water or a cup of black coffee.',
      'Keep busy – boredom makes hunger feel stronger.',
    ],
  },
  switch: {
    title: 'The metabolic switch',
    short: 'Ketones start to form',
    body: 'Researchers call this “the metabolic switch”: as glycogen runs lower, the liver starts turning fatty acids into ketones, which your brain and muscles can use as fuel. Ketones start rising after 8–12 hours, and for most people the switch itself happens somewhere between 12 and 36 hours.',
    fuel: 'More and more fat, plus the first ketones.',
    feel: 'Many people feel clear-headed and steady here. Others feel a bit low on energy until they get used to it.',
    tips: [
      'This is where 12:12 and 14:10 end – a great result in itself.',
      'Light movement like a walk works well and can make you feel better.',
    ],
  },
  ketosis: {
    title: 'Light ketosis',
    short: 'Fat becomes the main fuel',
    body: 'Ketone levels rise and fat provides a growing share of your energy. This is where 16:8 ends. Autophagy – the cells’ “clean-up” process – increases during fasting in animal studies, but when it picks up in humans has not been established.',
    fuel: 'Mainly fat and ketones; blood sugar is kept up by the liver.',
    feel: 'Hunger is often lower than a few hours earlier. Some get a mild headache – usually from too little fluid and salt.',
    tips: [
      'Drink plenty, and add a pinch of salt to your water if you get a headache.',
      'Plan your first meal: protein and vegetables are a great way to break the fast.',
    ],
  },
  gluconeogenesis: {
    title: 'Glycogen runs low',
    short: 'The body makes its own glucose',
    body: 'Liver glycogen has fallen sharply and most of your blood sugar is now made from scratch – from glycerol, lactate and amino acids (gluconeogenesis). Glycogen breakdown continues at a slower pace for up to about two days, and ketones keep rising.',
    fuel: 'Fat and ketones; glucose is mainly produced by the liver.',
    feel: 'Hunger often eases, but you may feel cold, tired or irritable. Concentration varies a lot between people.',
    tips: [
      'Electrolytes matter now: salt, potassium and magnesium.',
      'Avoid hard training – a walk is plenty.',
      'If you are new to this length, it’s a good place to stop.',
    ],
  },
  'deep-ketosis': {
    title: 'Deeper ketosis',
    short: 'Growth hormone rises',
    body: 'Ketones now cover a large share of your brain’s energy. Growth hormone rises sharply during multi-day fasts (about five-fold after two days in one study), which among other things helps protect muscle mass.',
    fuel: 'Fat and ketones, with less and less glucose.',
    feel: 'Sleep can get lighter and you may feel cold. Some feel surprisingly clear-headed, others weak.',
    tips: [
      'Take electrolytes every day.',
      'Stop at any sign of dizziness, palpitations or confusion.',
      'Break the fast gently, with a small meal.',
    ],
  },
  extended: {
    title: 'Extended fast',
    short: 'Only with medical supervision',
    body: 'Ketosis is well established. From here the risks increase: electrolyte disturbances, muscle loss and – when you start eating again – refeeding syndrome. Don’t fast this long without having talked to a doctor.',
    fuel: 'Mostly fat and ketones; protein is used to make the glucose the body still needs.',
    feel: 'Weakness, dizziness when standing up and poor sleep are common.',
    tips: ['Talk to a doctor before and during a fast this long.', 'Break it slowly over a day or two – small portions first.'],
  },
  prolonged: {
    title: 'Prolonged fast',
    short: 'The body saves protein',
    body: 'After about three days the brain gets much of its energy from ketones, so the body needs less glucose and protein breakdown slows down to spare muscle. This adaptation is classic physiology, but fasts this long carry real risks and should only be done under medical care.',
    fuel: 'Fat and ketones, with protein breakdown gradually slowing.',
    feel: 'Very individual. Feeling faint, palpitations or confusion are warning signs – stop and seek care.',
    tips: ['Only under medical supervision.', 'Refeeding must be gradual to avoid refeeding syndrome.'],
  },
}
