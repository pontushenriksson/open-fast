import type { PhaseId } from '../../../content/phases'
import type { PhaseText } from '../../types'

export const phases: Record<PhaseId, PhaseText> = {
  digest: {
    title: 'Matsmältning',
    short: 'Blodsocker och insulin stiger',
    body: 'Kroppen bryter ner den senaste måltiden. Blodsockret och insulinet stiger, och insulinet hjälper till att föra in energin i cellerna. Det som inte behövs direkt lagras som glykogen i lever och muskler och som fett.',
    fuel: 'Glukos och fett från måltiden du just ätit.',
    feel: 'Mätt och belåten. Vissa blir lite trötta efter en stor, kolhydratrik måltid.',
    tips: [
      'En måltid med protein, fiber och fett håller dig mätt längre och gör fastan lättare.',
      'Starta timern när du ätit klart – eller ställ in tiden i efterhand.',
    ],
  },
  postabsorptive: {
    title: 'Blodsockret planar ut',
    short: 'Insulinet sjunker',
    body: 'Måltiden är i stort sett omhändertagen. Insulinet sjunker tillbaka mot basnivå och levern börjar släppa ut glukos från sitt glykogenförråd för att hålla blodsockret stabilt. Det här är det vanliga ”mellan måltider”-läget som kroppen är i varje natt.',
    fuel: 'Främst glukos från leverns glykogen, med en växande andel fett.',
    feel: 'Oftast inget särskilt. Brukar du småäta på kvällen är det nu vanan gör sig påmind.',
    tips: [
      'Borsta tänderna efter middagen – en enkel signal om att köket är stängt.',
      'Örtte eller kolsyrat vatten hjälper mot kvällssug.',
    ],
  },
  glycogen: {
    title: 'Glykogen används',
    short: 'Fettförbränningen ökar gradvis',
    body: 'Leverns glykogenförråd minskar och andelen energi från fett ökar stegvis. Hungern kommer ofta i vågor runt dina vanliga mattider – hungerhormonet ghrelin följer dina vanor och lägger sig igen efter en stund.',
    fuel: 'En blandning av leverglykogen och fett, där fettet ökar.',
    feel: 'Hungervågor, särskilt runt din vanliga frukosttid. De brukar gå över på 15–20 minuter.',
    tips: [
      'Rid ut hungervågen med ett stort glas vatten eller en kopp svart kaffe.',
      'Håll dig sysselsatt – tristess får hungern att kännas starkare.',
    ],
  },
  switch: {
    title: 'Metabolisk omställning',
    short: 'Ketoner börjar bildas',
    body: 'Forskare kallar detta ”the metabolic switch”: när glykogenet sjunker börjar levern omvandla fettsyror till ketoner som hjärna och muskler kan använda som bränsle. Ketonerna börjar stiga efter 8–12 timmar, och hos de flesta sker själva omställningen någonstans mellan 12 och 36 timmar.',
    fuel: 'Allt mer fett, plus de första ketonerna.',
    feel: 'Många känner sig klara i huvudet och stabila här. Andra känner sig lite energilösa tills de vant sig.',
    tips: [
      'Här slutar 12:12 och 14:10 – ett bra resultat i sig.',
      'Lätt rörelse som en promenad fungerar bra och kan få dig att må bättre.',
    ],
  },
  ketosis: {
    title: 'Lätt ketos',
    short: 'Fett blir huvudbränsle',
    body: 'Ketonnivåerna stiger och fett står för en allt större del av energin. Det är här 16:8 slutar. Autofagi – cellernas ”städprocess” – ökar under fasta i djurstudier, men när den tar fart hos människor är inte fastställt.',
    fuel: 'Främst fett och ketoner; blodsockret hålls uppe av levern.',
    feel: 'Hungern är ofta lägre än för några timmar sedan. Vissa får lätt huvudvärk – oftast av för lite vätska och salt.',
    tips: [
      'Drick ordentligt och ta en nypa salt i vattnet om du får huvudvärk.',
      'Planera första måltiden: protein och grönsaker är ett utmärkt sätt att bryta fastan.',
    ],
  },
  gluconeogenesis: {
    title: 'Glykogenet sinar',
    short: 'Kroppen nybildar glukos',
    body: 'Leverns glykogen har minskat kraftigt och det mesta av blodsockret tillverkas nu från grunden – från glycerol, laktat och aminosyror (glukoneogenes). Glykogennedbrytningen fortsätter i avtagande takt i upp till ungefär två dygn, och ketonerna fortsätter stiga.',
    fuel: 'Fett och ketoner; glukos produceras främst av levern.',
    feel: 'Hungern lättar ofta, men du kan bli frusen, trött eller lättirriterad. Koncentrationen varierar mycket mellan personer.',
    tips: [
      'Elektrolyter är viktiga nu: salt, kalium och magnesium.',
      'Undvik hård träning – en promenad räcker gott.',
      'Är du ny på så här långa fastor är det ett bra ställe att sluta.',
    ],
  },
  'deep-ketosis': {
    title: 'Djupare ketos',
    short: 'Tillväxthormon ökar',
    body: 'Ketoner står nu för en stor del av hjärnans energi. Tillväxthormonet ökar kraftigt under flerdygnsfasta (ungefär femfaldigt efter två dygn i en studie), vilket bland annat hjälper till att skydda muskelmassa.',
    fuel: 'Fett och ketoner, med allt mindre glukos.',
    feel: 'Sömnen kan bli lättare och du kan frysa. Vissa känner sig förvånansvärt klara i huvudet, andra svaga.',
    tips: [
      'Ta elektrolyter varje dag.',
      'Avbryt vid minsta tecken på yrsel, hjärtklappning eller förvirring.',
      'Bryt fastan försiktigt, med en liten måltid.',
    ],
  },
  extended: {
    title: 'Förlängd fasta',
    short: 'Endast med medicinsk koll',
    body: 'Ketosen är etablerad. Från och med här ökar riskerna: elektrolytrubbningar, muskelnedbrytning och – när du börjar äta igen – refeedingsyndrom. Fasta inte så här länge utan att ha pratat med läkare.',
    fuel: 'Mest fett och ketoner; protein används för att tillverka den glukos kroppen fortfarande behöver.',
    feel: 'Svaghet, yrsel när du reser dig och dålig sömn är vanligt.',
    tips: [
      'Prata med läkare före och under en så här lång fasta.',
      'Bryt den långsamt under ett till två dygn – små portioner först.',
    ],
  },
  prolonged: {
    title: 'Långvarig fasta',
    short: 'Kroppen sparar på protein',
    body: 'Efter ungefär tre dygn får hjärnan en stor del av sin energi från ketoner, så kroppen behöver mindre glukos och proteinnedbrytningen bromsar in för att skona musklerna. Anpassningen är klassisk fysiologi, men så långa fastor innebär verkliga risker och bör bara göras under medicinsk övervakning.',
    fuel: 'Fett och ketoner, medan proteinnedbrytningen gradvis minskar.',
    feel: 'Mycket individuellt. Svimningskänsla, hjärtklappning eller förvirring är varningssignaler – avbryt och sök vård.',
    tips: ['Endast under medicinsk övervakning.', 'Återgången till mat måste ske gradvis för att undvika refeedingsyndrom.'],
  },
}
