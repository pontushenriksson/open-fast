import type { PlanId } from '../../../content/plans'
import type { PlanText } from '../../types'

export const plans: Record<PlanId, PlanText> = {
  '12:12': {
    name: '12:12',
    tagline: 'Den mjuka starten',
    description:
      'Du fastar 12 timmar och äter under 12. För många är det bara att sluta småäta efter middagen. Ett bra sätt att vänja kroppen innan du går vidare.',
    howTo: ['Middag klar 19:00', 'Frukost tidigast 07:00', 'Vatten, kaffe och te fungerar hela natten'],
    goodFor: ['Helt nya fastare', 'Bättre rutin kring kvällsätande', 'Att testa om fasta passar dig'],
    watchOut: ['Ger sällan stor viktnedgång på egen hand – kosten avgör fortfarande mest'],
  },
  '14:10': {
    name: '14:10',
    tagline: 'Steget före 16:8',
    description:
      'Ett mellanläge som många håller långsiktigt. Ofta rekommenderat för kvinnor som vill börja försiktigt, eftersom vissa upplever att längre fastor påverkar sömn och energi.',
    howTo: ['Middag klar 19:00', 'Första måltid 09:00', 'Ät två till tre ordentliga måltider i fönstret'],
    goodFor: ['Nybörjare som klarat 12:12', 'Den som vill ha ett hållbart vardagsschema'],
    watchOut: ['Kompensera inte med större portioner sent på kvällen'],
  },
  '16:8': {
    name: '16:8',
    tagline: 'Den populäraste metoden',
    description:
      'Leangains-metoden. 16 timmars fasta, 8 timmars ätfönster. I praktiken hoppar de flesta över frukosten och äter mellan t.ex. 12 och 20. Det är den mest studerade formen av tidsbegränsat ätande (TRE).',
    howTo: ['Sista måltid 20:00', 'Första måltid 12:00 dagen efter', 'Två till tre måltider rika på protein och fiber'],
    goodFor: ['Den som inte är frukostmänniska', 'Enklare kaloriminskning utan att räkna', 'Fast rutin i vardagen'],
    watchOut: [
      'Få i dig tillräckligt med protein så att du behåller muskelmassa',
      'Träning på fastande mage kan kännas tyngre i början',
    ],
  },
  '18:6': {
    name: '18:6',
    tagline: 'Lite mer utmaning',
    description:
      'Ett kortare ätfönster på sex timmar. Lättare att hamna i kaloriunderskott men också svårare att få i sig tillräckligt med näring.',
    howTo: ['Ät t.ex. 13:00–19:00', 'Planera två rejäla måltider', 'Prioritera protein, grönsaker och fullkorn'],
    goodFor: ['Erfarna 16:8-fastare som vill ha mer struktur'],
    watchOut: ['Risk för för lågt proteinintag', 'Var uppmärksam på yrsel, huvudvärk och sömnproblem'],
  },
  '20:4': {
    name: '20:4 – Warrior',
    tagline: 'Ett kort ätfönster',
    description:
      'Warrior-dieten: 20 timmars fasta och ett ätfönster på fyra timmar, oftast på kvällen. Krävande – och svårt att få i sig all näring som kroppen behöver.',
    howTo: ['Ät t.ex. 16:00–20:00', 'En stor måltid plus ett mellanmål', 'Elektrolyter kan hjälpa mot huvudvärk'],
    goodFor: ['Erfarna fastare med stabil hälsa'],
    watchOut: ['Hetsätning i fönstret', 'Svårt att nå proteinbehovet', 'Inte lämpligt vid diabetesmedicin'],
  },
  omad: {
    name: 'OMAD 23:1',
    tagline: 'En måltid om dagen',
    description:
      'One Meal A Day. Du äter allt dagens energiintag vid ett tillfälle. Enkelt logistiskt, men ställer höga krav på att den enda måltiden är näringsrik och stor nog.',
    howTo: [
      'Välj en fast tid, t.ex. 18:00',
      'Måltiden ska innehålla protein, fett, grönsaker och kolhydrater',
      'Drick ordentligt under dagen',
    ],
    goodFor: ['Erfarna fastare som tycker att det förenklar vardagen'],
    watchOut: ['Hög risk för näringsbrist om det görs varje dag', 'Stor måltid kan ge blodsockertoppar och trötthet'],
    warning: 'Rådgör med vården om du har någon kronisk sjukdom eller tar läkemedel.',
  },
  '5:2': {
    name: '5:2',
    tagline: 'Två lätta dagar i veckan',
    description:
      'Du äter normalt fem dagar i veckan och äter cirka 500 kcal (kvinnor) eller 600 kcal (män) två valfria, icke-följande dagar. Metoden blev stor i Sverige och Storbritannien runt 2013 och har stöd i flera studier.',
    howTo: [
      'Välj två dagar, t.ex. måndag och torsdag',
      'Lägg de 500–600 kcal på en eller två proteinrika måltider',
      'Ät normalt – inte extra – övriga dagar',
    ],
    goodFor: ['Den som hellre har två tuffa dagar än dagliga regler', 'Den som inte vill hoppa måltider varje dag'],
    watchOut: ['Kan ge huvudvärk, irritation och sämre koncentration på lågkaloridagarna'],
  },
  'eat-stop-eat': {
    name: 'Eat-Stop-Eat (24 h)',
    tagline: 'Dygnsfasta en–två gånger i veckan',
    description: 'Du fastar ett helt dygn, t.ex. middag till middag, en eller två gånger i veckan. Övriga dagar äter du normalt.',
    howTo: [
      'Ät middag kl. 18:00',
      'Fasta till 18:00 dagen efter',
      'Drick vatten, kaffe och te – lägg gärna till salt/elektrolyter',
    ],
    goodFor: ['Den som vill ha flexibilitet resten av veckan'],
    watchOut: [
      'Hunger, huvudvärk och irritation är vanligt de första gångerna',
      'Undvik hård träning under fastedagen till en början',
    ],
  },
  adf: {
    name: 'Varannandagsfasta (ADF)',
    tagline: 'Fasta varannan dag',
    description:
      'Alternate Day Fasting: varannan dag äter du normalt, varannan dag fastar du helt eller äter cirka 25 % av ditt energibehov (ca 500 kcal). En av de mest studerade formerna, men studier visar högre avhopp än vid vanlig kaloribegränsning.',
    howTo: [
      'Fastedag: vatten, kaffe, te – ev. en liten måltid på ~500 kcal',
      'Ätdag: normalt ätande, inte frosseri',
      'Använd timerns mål på 36 h om du gör hel fasta',
    ],
    goodFor: ['Den som vill ha tydliga regler och klarar hunger bra'],
    watchOut: ['Svårt att hålla socialt och långsiktigt', 'Kan krocka med ditt träningsschema'],
    warning: 'Inte lämpligt vid diabetes, ätstörningshistorik, graviditet eller undervikt.',
  },
  '36h': {
    name: '36 timmar',
    tagline: 'Monk fast',
    description:
      'Du hoppar över en hel dag: middag dag 1 till frukost dag 3. Används ibland av erfarna fastare som en sporadisk utmaning.',
    howTo: ['Middag 20:00 dag 1', 'Ingen mat dag 2', 'Frukost 08:00 dag 3 – börja lätt'],
    goodFor: ['Erfarna fastare som tidigare klarat 24 h utan problem'],
    watchOut: ['Elektrolyter (salt, kalium, magnesium) blir viktiga', 'Bryt fastan försiktigt'],
    warning: 'Avbryt vid yrsel, hjärtklappning, förvirring eller svimningskänsla.',
  },
  '48h': {
    name: '48 timmar',
    tagline: 'Förlängd fasta',
    description:
      'Två dygn utan mat. Förlängda fastor har betydligt sämre forskningsstöd än korta och innebär större risker. Görs sällan och aldrig utan att du känner din kropp väl.',
    howTo: ['Planera för låg fysisk aktivitet', 'Drick vatten med elektrolyter', 'Bryt fastan med en liten, lättsmält måltid'],
    goodFor: ['Mycket erfarna fastare med god hälsa'],
    watchOut: ['Muskelnedbrytning', 'Elektrolytrubbningar', 'Sömnproblem'],
    warning: 'Rådgör med läkare innan förlängd fasta. Inte lämpligt vid läkemedel, diabetes, hjärtsjukdom eller graviditet.',
  },
  '72h': {
    name: '72 timmar',
    tagline: 'Endast med medicinsk koll',
    description:
      'Tre dygn utan mat. Vi tar med den eftersom många frågar, men rekommenderar den inte utan medicinsk uppföljning.',
    howTo: ['Prata med läkare först', 'Elektrolyter varje dag', 'Avsluta direkt vid symtom'],
    goodFor: ['Personer under medicinsk övervakning'],
    watchOut: ['Risk för refeedingsyndrom vid återgång till mat', 'Kraftiga elektrolytrubbningar', 'Påverkan på hjärtrytm'],
    warning: 'Gör inte detta utan att ha pratat med läkare.',
  },
}
