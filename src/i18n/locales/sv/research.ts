import type { ResearchId } from '../../../content/research'
import type { ResearchText } from '../../types'

export const research: Record<ResearchId, ResearchText> = {
  'bmj-2025': {
    big: '99 studier',
    title: 'Största jämförelsen hittills: fasta ≈ vanlig kaloribegränsning',
    body: 'En nätverksmetaanalys i BMJ jämförde alla former av fasta med vanlig kaloribegränsning. Varannandagsfasta gav i snitt 1,3 kg mer viktnedgång än kaloribegränsning, men i studier längre än 24 veckor var ingen fastemetod bättre. Jämfört med ingen diet: varannandagsfasta −3,4 kg, heldagsfasta −2,4 kg, kaloribegränsning −2,1 kg, tidsbegränsat ätande −1,7 kg.',
    design: 'Nätverksmetaanalys · 99 RCT · 6 582 vuxna · median 12 veckor',
  },
  'treat-2020': {
    big: '−0,26 kg',
    title: '16:8 utan kalorikontroll gav ingen extra viktnedgång',
    body: 'I TREAT-studien åt ena gruppen 12–20 (16:8) och den andra tre måltider om dagen. Efter 12 veckor: −0,94 kg mot −0,68 kg – skillnaden var inte signifikant. Slutsats: tidsbegränsat ätande ensamt är inte effektivare än att äta under hela dagen.',
    design: 'RCT · 116 personer · 12 veckor',
  },
  'liu-2022': {
    big: '−8,0 kg',
    title: 'Ett år med 8 timmars ätfönster + kalorikoll',
    body: 'Båda grupperna åt lika få kalorier, men den ena åt bara 08–16. Efter 12 månader: −8,0 kg mot −6,3 kg. Skillnaden på 1,8 kg var inte statistiskt säker. Det är kalorierna som gör mest – fönstret kan göra det lättare att hålla dem.',
    design: 'RCT · 139 personer · 12 månader',
  },
  'jamshed-2022': {
    big: '−2,3 kg',
    title: 'Tidigt ätfönster slog sent – när kalorierna var desamma',
    body: 'Alla åt med kaloribegränsning, men ena gruppen åt 07–15. Efter 14 veckor hade de gått ner 6,3 kg mot 4,0 kg och fått 4 mmHg lägre diastoliskt blodtryck. Effekten motsvarade att de åt ca 214 kcal mindre per dag.',
    design: 'RCT · 90 personer · 14 veckor',
  },
  'harvie-2011': {
    big: '−6,4 kg',
    title: '5:2 fungerade lika bra som daglig bantning',
    body: 'Kvinnor som åt ~650 kcal två dagar i veckan gick ner 6,4 kg på sex månader, jämfört med 5,6 kg för de som minskade lite varje dag. Ingen säker skillnad i vikt, men 5:2-gruppen fick något lägre fasteinsulin.',
    design: 'RCT · 107 kvinnor · 6 månader',
  },
  'trepanowski-2017': {
    big: '−6,0 %',
    title: 'Varannandagsfasta i ett år: samma resultat, fler hoppade av',
    body: 'Efter ett år: −6,0 % kroppsvikt med varannandagsfasta mot −5,3 % med daglig kaloribegränsning. Men 38 % hoppade av fastegruppen mot 29 % i bantningsgruppen – och LDL-kolesterolet steg i fastegruppen.',
    design: 'RCT · 100 vuxna · 12 månader',
  },
  'welton-2020': {
    big: '0,8–13 %',
    title: 'Hur mycket går man ner?',
    body: 'En översikt av 27 studier fann viktnedgång mellan 0,8 och 13 % av kroppsvikten under 2–26 veckor. Spridningen är stor – resultatet beror mer på personen och totala intaget än på metoden.',
    design: 'Systematisk översikt · 27 studier',
  },
  'sutton-2018': {
    big: '−11 mmHg',
    title: 'Tidigt ätfönster sänkte blodtrycket – utan viktnedgång',
    body: 'Män med förstadium till diabetes åt alla måltider inom sex timmar före kl. 15. Utan att gå ner i vikt sjönk det systoliska blodtrycket med 11 mmHg och insulinkänsligheten förbättrades. Liten studie, men den visar att tidpunkten kan spela roll.',
    design: 'Randomiserad crossover · 8 män · 5 veckor per period',
  },
  'wilkinson-2020': {
    big: '−11 %',
    title: 'LDL-kolesterol vid metabolt syndrom',
    body: 'Personer med metabolt syndrom åt inom 10 timmar i 12 veckor: −3 % vikt, lägre blodtryck och 11 % lägre LDL. Obs: ingen kontrollgrupp, och de flesta tog redan blodtrycks- eller kolesterolmedicin.',
    design: 'Enarmad studie · 19 personer · 12 veckor',
  },
  'patikorn-2021': {
    big: '1 av 104',
    title: 'Få fynd håller hög kvalitet',
    body: 'En paraplyöversikt av 11 metaanalyser (130 studier) graderade 104 samband mellan fasta och hälsa. Bara ett höll hög evidenskvalitet: modifierad varannandagsfasta sänkte BMI med 1,2 enheter på 1–2 månader. Fasta var också kopplat till förlust av fettfri massa.',
    design: 'Paraplyöversikt · 130 RCT',
  },
  'metabolic-switch': {
    big: '12–36 h',
    title: 'Den metaboliska omställningen',
    body: 'Efter 12–36 timmar utan mat skiftar kroppen från glukos till fett och ketoner som huvudbränsle. Ketonerna börjar stiga redan efter 8–12 timmar. Exakt när beror på hur mycket glykogen du har lagrat och hur aktiv du är.',
    design: 'Översiktsartiklar',
  },
  'growth-hormone': {
    big: '5×',
    title: 'Tillväxthormonet ökar kraftigt vid flerdygnsfasta',
    body: 'Efter två dygns fasta ökade dygnsproduktionen av tillväxthormon ungefär femfaldigt hos friska män. Hormonet hjälper bl.a. till att bevara muskelmassa när maten saknas. Vid vanlig 16:8 är effekten mycket mindre.',
    design: 'Klinisk studie · 9 män · 2 dygn',
  },
  gluconeogenesis: {
    big: '64 %',
    title: 'Kroppen börjar tillverka sitt eget socker',
    body: 'Redan under de första 22 timmarna av en fasta kommer 64 % av blodsockret från nybildning (glukoneogenes) snarare än från leverns glykogen. Glykogennedbrytningen avtar sedan successivt och är nära noll efter ungefär två dygn.',
    design: 'MR-spektroskopi · friska försökspersoner',
  },
  'lean-mass': {
    big: '−0,47 kg',
    title: 'Muskler kan försvinna om du inte äter protein',
    body: 'I TREAT-studien förlorade 16:8-gruppen mer muskelmassa i armar och ben än kontrollgruppen (0,64 mot 0,17 kg). I en annan studie med tidigt fönster och kalorikontroll sågs ingen skillnad. Protein och styrketräning är ditt skydd.',
    design: 'RCT · 116 personer · 12 veckor',
  },
  autophagy: {
    big: '?',
    title: 'Autofagi hos människor: tidpunkten är okänd',
    body: 'Autofagi är väl dokumenterad i djur- och cellstudier. Hos människor finns bara indirekta mätningar – t.ex. ökat uttryck av autofagigener i blodceller efter fyra dagar med tidigt ätfönster (11 personer). Påståenden som ”autofagin startar efter 16 timmar” saknar stöd.',
    design: 'Översikt + liten crossover-studie',
  },
  ific: {
    big: '13 %',
    title: 'Andel amerikaner som fastar periodiskt',
    body: 'I IFIC:s årliga mat- och hälsoundersökning uppgav 10 % att de följde periodisk fasta 2018 och 2020 – då den populäraste dieten i USA. 2023 var andelen 12 % och 2024 13 %, men sedan 2023 är proteinrik kost vanligast.',
    design: 'Årlig enkät · 1 000–3 000 amerikaner per år',
  },
  ramadan: {
    big: '−1,3 kg',
    title: 'Ramadan – världens största fasta',
    body: 'Runt två miljarder muslimer firar ramadan, där en stor majoritet fastar från gryning till skymning i en månad. En metaanalys fann i snitt −1,34 kg under ramadan – men bara −0,59 kg återstod 2–5 veckor efteråt. Vikten kommer tillbaka när vanorna gör det.',
    design: 'Metaanalys · 70 publikationer · 2 947 personer',
  },
  'aha-2024': {
    big: '+91 %',
    title: 'Omdebatterat: kort ätfönster och hjärtdöd',
    body: 'En konferenspresentation (inte granskad publikation) fann att personer som åt inom mindre än 8 timmar hade 91 % högre risk för hjärt-kärldöd. Men: observationsdata, bara 414 personer i gruppen, kostdata från två dagars intervjuer, fler rökare och högre BMI. Ingen ökning av total dödlighet. Bevisar inte orsakssamband – men en påminnelse om att långtidsdata saknas.',
    design: 'Observationsstudie · 20 078 personer (NHANES) · konferensabstract',
  },
  dropout: {
    big: '2–38 %',
    title: 'Många hoppar av',
    body: 'I studier som jämför fasta med vanlig bantning varierar avhoppen kraftigt, och de är ofta högre i fastegrupperna. Den metod du faktiskt kan hålla i månader är viktigare än den ”optimala”.',
    design: 'Systematisk översikt · 11 RCT',
  },
}
