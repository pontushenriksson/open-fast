/**
 * The phases of a fast, counted from the last meal. Timings are approximate and
 * vary with the previous meal, activity level and metabolism.
 * Texts live in `src/i18n/locales/<lang>/phases.ts`.
 */

export type Evidence = 'strong' | 'moderate' | 'limited'

/** Badge tone per evidence level. */
export const EVIDENCE_TONE: Record<Evidence, 'ok' | 'gray' | 'bad'> = { strong: 'ok', moderate: 'gray', limited: 'bad' }

export interface SourceRef {
  label: string
  url: string
}

export const PHASE_IDS = [
  'digest',
  'postabsorptive',
  'glycogen',
  'switch',
  'ketosis',
  'gluconeogenesis',
  'deep-ketosis',
  'extended',
  'prolonged',
] as const

export type PhaseId = (typeof PHASE_IDS)[number]

export interface Phase {
  id: PhaseId
  /** Start of the phase in hours since the last meal. */
  from: number
  evidence: Evidence
  sources: SourceRef[]
}

const SRC = {
  anton: { label: 'Anton et al., Obesity 2018', url: 'https://pubmed.ncbi.nlm.nih.gov/29086496/' },
  deCabo: { label: 'de Cabo & Mattson, NEJM 2019', url: 'https://pubmed.ncbi.nlm.nih.gov/31881139/' },
  rothman: { label: 'Rothman et al., Science 1991', url: 'https://pubmed.ncbi.nlm.nih.gov/1948033/' },
  hartman: { label: 'Hartman et al., J Clin Endocrinol Metab 1992', url: 'https://pubmed.ncbi.nlm.nih.gov/1548337/' },
  cahill: { label: 'Cahill, Annu Rev Nutr 2006', url: 'https://pubmed.ncbi.nlm.nih.gov/16848698/' },
  bagherniya: { label: 'Bagherniya et al., Ageing Res Rev 2018', url: 'https://pubmed.ncbi.nlm.nih.gov/30172870/' },
  natalucci: { label: 'Natalucci et al., Eur J Endocrinol 2005', url: 'https://pubmed.ncbi.nlm.nih.gov/15941923/' },
  mehanna: { label: 'Mehanna et al., BMJ 2008', url: 'https://pubmed.ncbi.nlm.nih.gov/18583681/' },
} satisfies Record<string, SourceRef>

export const PHASES: Phase[] = [
  { id: 'digest', from: 0, evidence: 'strong', sources: [SRC.deCabo] },
  { id: 'postabsorptive', from: 4, evidence: 'strong', sources: [SRC.rothman] },
  { id: 'glycogen', from: 8, evidence: 'strong', sources: [SRC.rothman, SRC.natalucci] },
  { id: 'switch', from: 12, evidence: 'moderate', sources: [SRC.anton, SRC.deCabo] },
  { id: 'ketosis', from: 16, evidence: 'moderate', sources: [SRC.deCabo, SRC.bagherniya] },
  { id: 'gluconeogenesis', from: 24, evidence: 'strong', sources: [SRC.rothman] },
  { id: 'deep-ketosis', from: 36, evidence: 'moderate', sources: [SRC.hartman, SRC.cahill] },
  { id: 'extended', from: 48, evidence: 'moderate', sources: [SRC.cahill, SRC.mehanna] },
  { id: 'prolonged', from: 72, evidence: 'moderate', sources: [SRC.cahill, SRC.mehanna] },
]

export function phaseAt(hours: number): { current: Phase; next?: Phase; index: number } {
  let index = 0
  for (let i = 0; i < PHASES.length; i++) if (hours >= PHASES[i].from) index = i
  return { current: PHASES[index], next: PHASES[index + 1], index }
}
