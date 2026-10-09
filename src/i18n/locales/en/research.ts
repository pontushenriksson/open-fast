import type { ResearchId } from '../../../content/research'
import type { ResearchText } from '../../types'

export const research: Record<ResearchId, ResearchText> = {
  'bmj-2025': {
    big: '99 trials',
    title: 'The largest comparison yet: fasting ≈ ordinary calorie restriction',
    body: 'A network meta-analysis in the BMJ compared every form of fasting with ordinary calorie restriction. Alternate-day fasting gave on average 1.3 kg more weight loss than calorie restriction, but in trials longer than 24 weeks no fasting method was better. Compared with no diet: alternate-day fasting −3.4 kg, whole-day fasting −2.4 kg, calorie restriction −2.1 kg, time-restricted eating −1.7 kg.',
    design: 'Network meta-analysis · 99 RCTs · 6,582 adults · median 12 weeks',
  },
  'treat-2020': {
    big: '−0.26 kg',
    title: '16:8 without calorie control gave no extra weight loss',
    body: 'In the TREAT trial one group ate between noon and 8 pm (16:8) and the other three meals a day. After 12 weeks: −0.94 kg vs −0.68 kg – the difference was not significant. Conclusion: time-restricted eating alone is no more effective than eating throughout the day.',
    design: 'RCT · 116 people · 12 weeks',
  },
  'liu-2022': {
    big: '−8.0 kg',
    title: 'A year of an 8-hour window + calorie control',
    body: 'Both groups ate the same number of calories, but one only ate between 8 am and 4 pm. After 12 months: −8.0 kg vs −6.3 kg. The 1.8 kg difference was not statistically certain. Calories do most of the work – the window can make them easier to stick to.',
    design: 'RCT · 139 people · 12 months',
  },
  'jamshed-2022': {
    big: '−2.3 kg',
    title: 'An early window beat a late one – with the same calories',
    body: 'Everyone ate a calorie-restricted diet, but one group ate between 7 am and 3 pm. After 14 weeks they had lost 6.3 kg vs 4.0 kg and had 4 mmHg lower diastolic blood pressure. The effect equaled eating about 214 kcal less per day.',
    design: 'RCT · 90 people · 14 weeks',
  },
  'harvie-2011': {
    big: '−6.4 kg',
    title: '5:2 worked as well as daily dieting',
    body: 'Women who ate ~650 kcal two days a week lost 6.4 kg in six months, compared with 5.6 kg for those who cut back a little every day. No certain difference in weight, but the 5:2 group got slightly lower fasting insulin.',
    design: 'RCT · 107 women · 6 months',
  },
  'trepanowski-2017': {
    big: '−6.0%',
    title: 'A year of alternate-day fasting: same result, more drop-outs',
    body: 'After a year: −6.0% body weight with alternate-day fasting vs −5.3% with daily calorie restriction. But 38% dropped out of the fasting group vs 29% in the diet group – and LDL cholesterol rose in the fasting group.',
    design: 'RCT · 100 adults · 12 months',
  },
  'welton-2020': {
    big: '0.8–13%',
    title: 'How much weight do people lose?',
    body: 'A review of 27 trials found weight loss between 0.8% and 13% of body weight over 2–26 weeks. The spread is large – the result depends more on the person and total intake than on the method.',
    design: 'Systematic review · 27 trials',
  },
  'sutton-2018': {
    big: '−11 mmHg',
    title: 'An early window lowered blood pressure – without weight loss',
    body: 'Men with prediabetes ate all their meals within six hours, ending before 3 pm. Without losing weight, their systolic blood pressure fell by 11 mmHg and insulin sensitivity improved. A small study, but it shows that timing can matter.',
    design: 'Randomized crossover · 8 men · 5 weeks per period',
  },
  'wilkinson-2020': {
    big: '−11%',
    title: 'LDL cholesterol in metabolic syndrome',
    body: 'People with metabolic syndrome ate within 10 hours for 12 weeks: −3% weight, lower blood pressure and 11% lower LDL. Note: no control group, and most were already on blood pressure or cholesterol medication.',
    design: 'Single-arm study · 19 people · 12 weeks',
  },
  'patikorn-2021': {
    big: '1 of 104',
    title: 'Few findings are high quality',
    body: 'An umbrella review of 11 meta-analyses (130 trials) graded 104 links between fasting and health. Only one reached high-quality evidence: modified alternate-day fasting lowered BMI by 1.2 units over 1–2 months. Fasting was also linked to loss of fat-free mass.',
    design: 'Umbrella review · 130 RCTs',
  },
  'metabolic-switch': {
    big: '12–36 h',
    title: 'The metabolic switch',
    body: 'After 12–36 hours without food the body shifts from glucose to fat and ketones as its main fuel. Ketones start rising after 8–12 hours. Exactly when depends on how much glycogen you have stored and how active you are.',
    design: 'Review articles',
  },
  'growth-hormone': {
    big: '5×',
    title: 'Growth hormone rises sharply during multi-day fasts',
    body: 'After two days of fasting, daily growth hormone production rose about five-fold in healthy men. The hormone helps, among other things, preserve muscle mass when food is lacking. During ordinary 16:8 the effect is much smaller.',
    design: 'Clinical study · 9 men · 2 days',
  },
  gluconeogenesis: {
    big: '64%',
    title: 'The body starts making its own sugar',
    body: 'Already during the first 22 hours of a fast, 64% of blood sugar comes from new production (gluconeogenesis) rather than liver glycogen. Glycogen breakdown then slows gradually and is close to zero after about two days.',
    design: 'MR spectroscopy · healthy volunteers',
  },
  'lean-mass': {
    big: '−0.47 kg',
    title: 'You can lose muscle if you skimp on protein',
    body: 'In the TREAT trial the 16:8 group lost more muscle mass in arms and legs than the control group (0.64 vs 0.17 kg). Another study with an early window and calorie control saw no difference. Protein and strength training are your protection.',
    design: 'RCT · 116 people · 12 weeks',
  },
  autophagy: {
    big: '?',
    title: 'Autophagy in humans: the timing is unknown',
    body: 'Autophagy is well documented in animal and cell studies. In humans there are only indirect measurements – e.g. increased activity of autophagy genes in blood cells after four days of early time-restricted eating (11 people). Claims like “autophagy starts after 16 hours” have no support.',
    design: 'Review + small crossover study',
  },
  ific: {
    big: '13%',
    title: 'Share of Americans who fast intermittently',
    body: 'In IFIC’s yearly food and health survey, 10% said they followed intermittent fasting in 2018 and 2020 – the most popular diet in the US those years. In 2023 the share was 12% and in 2024 13%, but since 2023 a high-protein diet has been most common.',
    design: 'Annual survey · 1,000–3,000 Americans per year',
  },
  ramadan: {
    big: '−1.3 kg',
    title: 'Ramadan – the world’s largest fast',
    body: 'Around two billion Muslims observe Ramadan, and a large majority fast from dawn to dusk for a month. A meta-analysis found on average −1.34 kg during Ramadan – but only −0.59 kg remained 2–5 weeks later. The weight comes back when the habits do.',
    design: 'Meta-analysis · 70 publications · 2,947 people',
  },
  'aha-2024': {
    big: '+91%',
    title: 'Debated: a short eating window and heart deaths',
    body: 'A conference presentation (not a peer-reviewed paper) found that people who ate within less than 8 hours had a 91% higher risk of cardiovascular death. But: observational data, only 414 people in that group, diet data from two days of interviews, more smokers and higher BMI. No increase in overall mortality. It doesn’t prove cause and effect – but it’s a reminder that long-term data is lacking.',
    design: 'Observational study · 20,078 people (NHANES) · conference abstract',
  },
  dropout: {
    big: '2–38%',
    title: 'Many people drop out',
    body: 'In studies comparing fasting with ordinary dieting, drop-out rates vary widely and are often higher in the fasting groups. The method you can actually keep up for months matters more than the “optimal” one.',
    design: 'Systematic review · 11 RCTs',
  },
}
