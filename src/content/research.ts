/**
 * Research highlights. Every figure was checked against the original paper or
 * survey (October 2026). Texts live in `src/i18n/locales/<lang>/research.ts`.
 */

export type ResearchTag = 'weight' | 'health' | 'body' | 'popularity' | 'caution'

export const RESEARCH_TAGS: ResearchTag[] = ['weight', 'health', 'body', 'popularity', 'caution']

export const RESEARCH_IDS = [
  'bmj-2025',
  'treat-2020',
  'liu-2022',
  'jamshed-2022',
  'harvie-2011',
  'trepanowski-2017',
  'welton-2020',
  'sutton-2018',
  'wilkinson-2020',
  'patikorn-2021',
  'metabolic-switch',
  'growth-hormone',
  'gluconeogenesis',
  'lean-mass',
  'autophagy',
  'ific',
  'ramadan',
  'aha-2024',
  'dropout',
] as const

export type ResearchId = (typeof RESEARCH_IDS)[number]

export interface Research {
  id: ResearchId
  tag: ResearchTag
  /** Citation, e.g. "Lowe et al., JAMA Internal Medicine 2020". */
  source: string
  url: string
}

export const RESEARCH: Research[] = [
  { id: 'bmj-2025', tag: 'weight', source: 'Semnani-Azad et al., BMJ 2025', url: 'https://pubmed.ncbi.nlm.nih.gov/40533200/' },
  {
    id: 'treat-2020',
    tag: 'weight',
    source: 'Lowe et al., JAMA Internal Medicine 2020',
    url: 'https://pubmed.ncbi.nlm.nih.gov/32986097/',
  },
  {
    id: 'liu-2022',
    tag: 'weight',
    source: 'Liu et al., New England Journal of Medicine 2022',
    url: 'https://pubmed.ncbi.nlm.nih.gov/35443107/',
  },
  {
    id: 'jamshed-2022',
    tag: 'weight',
    source: 'Jamshed et al., JAMA Internal Medicine 2022',
    url: 'https://pubmed.ncbi.nlm.nih.gov/35939311/',
  },
  {
    id: 'harvie-2011',
    tag: 'weight',
    source: 'Harvie et al., International Journal of Obesity 2011',
    url: 'https://pubmed.ncbi.nlm.nih.gov/20921964/',
  },
  {
    id: 'trepanowski-2017',
    tag: 'weight',
    source: 'Trepanowski et al., JAMA Internal Medicine 2017',
    url: 'https://pubmed.ncbi.nlm.nih.gov/28459931/',
  },
  {
    id: 'welton-2020',
    tag: 'weight',
    source: 'Welton et al., Canadian Family Physician 2020',
    url: 'https://pubmed.ncbi.nlm.nih.gov/32060194/',
  },
  {
    id: 'sutton-2018',
    tag: 'health',
    source: 'Sutton et al., Cell Metabolism 2018',
    url: 'https://pubmed.ncbi.nlm.nih.gov/29754952/',
  },
  {
    id: 'wilkinson-2020',
    tag: 'health',
    source: 'Wilkinson et al., Cell Metabolism 2020',
    url: 'https://pubmed.ncbi.nlm.nih.gov/31813824/',
  },
  {
    id: 'patikorn-2021',
    tag: 'health',
    source: 'Patikorn et al., JAMA Network Open 2021',
    url: 'https://pubmed.ncbi.nlm.nih.gov/34919135/',
  },
  {
    id: 'metabolic-switch',
    tag: 'body',
    source: 'Anton et al., Obesity 2018 · de Cabo & Mattson, NEJM 2019',
    url: 'https://pubmed.ncbi.nlm.nih.gov/29086496/',
  },
  {
    id: 'growth-hormone',
    tag: 'body',
    source: 'Hartman et al., J Clin Endocrinol Metab 1992',
    url: 'https://pubmed.ncbi.nlm.nih.gov/1548337/',
  },
  { id: 'gluconeogenesis', tag: 'body', source: 'Rothman et al., Science 1991', url: 'https://pubmed.ncbi.nlm.nih.gov/1948033/' },
  {
    id: 'lean-mass',
    tag: 'body',
    source: 'Lowe et al., JAMA Internal Medicine 2020',
    url: 'https://pubmed.ncbi.nlm.nih.gov/32986097/',
  },
  {
    id: 'autophagy',
    tag: 'body',
    source: 'Bagherniya et al., Ageing Res Rev 2018 · Jamshed et al., Nutrients 2019',
    url: 'https://pubmed.ncbi.nlm.nih.gov/31151228/',
  },
  {
    id: 'ific',
    tag: 'popularity',
    source: 'IFIC Food & Health Survey 2018–2024',
    url: 'https://foodinsight.org/2024-ific-food-health-survey/',
  },
  {
    id: 'ramadan',
    tag: 'popularity',
    source: 'Fernando et al., Nutrients 2019',
    url: 'https://pubmed.ncbi.nlm.nih.gov/30813495/',
  },
  {
    id: 'aha-2024',
    tag: 'caution',
    source: 'Zhong et al., American Heart Association EPI|Lifestyle 2024',
    url: 'https://newsroom.heart.org/news/8-hour-time-restricted-eating-linked-to-a-91-higher-risk-of-cardiovascular-death',
  },
  {
    id: 'dropout',
    tag: 'caution',
    source: 'Cioffi et al., Journal of Translational Medicine 2018',
    url: 'https://pubmed.ncbi.nlm.nih.gov/30583725/',
  },
]

/** Sources behind the energy and weight estimates. */
export const ENERGY_SOURCES = [
  { label: 'Mifflin et al., Am J Clin Nutr 1990', url: 'https://pubmed.ncbi.nlm.nih.gov/2305711/' },
  { label: 'Hall, Int J Obes 2008', url: 'https://pubmed.ncbi.nlm.nih.gov/17848938/' },
  { label: 'Kreitzman et al., Am J Clin Nutr 1992', url: 'https://pubmed.ncbi.nlm.nih.gov/1615908/' },
  { label: 'Fernández-Elías et al., Eur J Appl Physiol 2015', url: 'https://pubmed.ncbi.nlm.nih.gov/25911631/' },
]
