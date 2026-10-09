import type { GuideText } from '../../types'

export const guide: GuideText = {
  tipGroups: [
    {
      title: 'Komma igång',
      items: [
        {
          title: 'Börja med 12:12',
          body: 'Sluta äta efter middagen en vecka. Gå till 14:10 när det känns lätt och därefter 16:8. Att hoppa direkt till 18:6 är det vanligaste sättet att ge upp.',
        },
        {
          title: 'Låt sömnen göra jobbet',
          body: 'Lägg den största delen av fastan över natten. Åtta timmars sömn är halva 16:8.',
        },
        {
          title: 'Välj ett fönster som passar ditt liv',
          body: 'Den bästa metoden är den du kan hålla. Ett ätfönster som krockar med familjemiddagen håller inte.',
        },
        {
          title: 'Tidigt fönster är bättre än sent',
          body: 'Studier tyder på att ett tidigare ätfönster (t.ex. 08–16) ger bättre blodsocker och blodtryck än ett sent, eftersom kroppen hanterar socker bättre tidigt på dygnet.',
        },
      ],
    },
    {
      title: 'Hantera hunger',
      items: [
        {
          title: 'Hunger kommer i vågor',
          body: 'Hungern går inte linjärt uppåt. Den toppar runt dina vanliga mattider och lägger sig efter 15–20 minuter. Rid ut vågen.',
        },
        {
          title: 'Drick först',
          body: 'Ett stort glas vatten, kolsyrat vatten eller en kopp te tar bort mycket av suget.',
        },
        {
          title: 'Salt mot huvudvärk',
          body: 'Huvudvärk och yrsel beror ofta på lite salt och vätska. En nypa salt i vattnet hjälper ofta.',
        },
        {
          title: 'Håll dig sysselsatt',
          body: 'Tristess är fastans värsta fiende. Gå en promenad, ring någon eller gör något med händerna.',
        },
        {
          title: 'Det blir lättare',
          body: 'De flesta tycker att de första 1–2 veckorna är jobbigast. Kroppen vänjer sig vid det nya schemat.',
        },
      ],
    },
    {
      title: 'I ätfönstret',
      items: [
        {
          title: 'Protein först',
          body: 'Sikta på ungefär 1,2–1,6 g protein per kilo kroppsvikt och dag om du vill behålla muskelmassa. Protein mättar också bäst.',
        },
        {
          title: 'Fasta är inte en ursäkt att frossa',
          body: 'Forskningen visar att den mesta viktnedgången från fasta kommer från att du äter mindre totalt. Kompenserar du i fönstret uteblir effekten.',
        },
        {
          title: 'Fiber och grönsaker',
          body: 'Fiber ger mättnad och stabilare blodsocker – och gör nästa fasta lättare.',
        },
        {
          title: 'Planera första måltiden',
          body: 'Den som inte har en plan när fastan tar slut tar det som finns närmast – oftast något snabbt och sött.',
        },
      ],
    },
    {
      title: 'Träning',
      items: [
        {
          title: 'Lätt träning går bra',
          body: 'Promenader, yoga och lugn cykling fungerar utmärkt fastande och kan kännas riktigt bra.',
        },
        {
          title: 'Styrketräning: tänk på timingen',
          body: 'Lägg gärna tunga pass nära eller i ätfönstret och ät protein efteråt.',
        },
        {
          title: 'Lyssna på kroppen',
          body: 'Blir du yr, skakig eller svag – avbryt passet och ät något.',
        },
      ],
    },
    {
      title: 'Socialt',
      items: [
        {
          title: 'Flytta fönstret, inte festen',
          body: 'Ska du på middag? Flytta ätfönstret den dagen. Det är helt okej att pausa fastan för ett socialt tillfälle.',
        },
        {
          title: 'Du behöver inte förklara',
          body: '”Jag är inte hungrig än” räcker gott.',
        },
      ],
    },
  ],

  breakingFast: [
    {
      title: 'Efter 12–18 h',
      body: 'Ät som vanligt. Börja gärna med protein och grönsaker i stället för snabba kolhydrater, så slipper du blodsockerdippen.',
    },
    {
      title: 'Efter 18–24 h',
      body: 'Börja med en lagom stor måltid. Mycket socker eller en enorm portion direkt kan ge illamående och trötthet.',
    },
    {
      title: 'Efter 24–48 h',
      body: 'Börja lätt: buljong, ägg, yoghurt, kokta grönsaker eller fisk. Vänta 30–60 minuter innan nästa portion.',
    },
    {
      title: 'Efter 48 h +',
      body: 'Bryt försiktigt och gärna med medicinsk rådgivning. Vid längre fastor finns risk för refeedingsyndrom – farliga elektrolytrubbningar när kroppen börjar ta emot mat igen.',
    },
  ],

  dos: [
    'Drick vatten – mycket vatten',
    'Svart kaffe och te utan socker',
    'Salt eller elektrolyter vid fastor över 24 h',
    'Sov ordentligt – sömnen är en gratis del av fastan',
    'Ät näringsrikt och proteinrikt i ätfönstret',
    'Börja kort och öka gradvis',
    'Lyssna på kroppen och avbryt vid symtom',
    'Ta medicin som läkaren ordinerat',
  ],

  donts: [
    'Hetsa inte i dig mat när fönstret öppnar',
    'Fasta inte om du är gravid, ammar, är under 18 eller har ätstörningshistorik',
    'Ingen alkohol på fastande mage',
    'Inga ”fastevänliga” drycker med socker eller protein',
    'Pressa inte igenom yrsel, hjärtklappning eller förvirring',
    'Fasta inte för att kompensera för att du ätit ”för mycket”',
    'Gör inga förlängda fastor (48 h +) utan läkarkontakt',
    'Jämför dig inte med andra – kroppar är olika',
  ],

  notFor: [
    'Gravid eller ammande',
    'Barn och ungdomar under 18 år',
    'Ätstörning eller historik av ätstörning',
    'Typ 1-diabetes',
    'Typ 2-diabetes med insulin eller blodsockersänkande tabletter (t.ex. sulfonylurea) – utan läkarkontakt',
    'Undervikt (BMI under 18,5)',
    'Allvarlig hjärt-, njur- eller leversjukdom',
    'Läkemedel som måste tas med mat',
    'Skör äldre person, eller återhämtning efter sjukdom eller operation',
  ],

  stopSigns: [
    'Yrsel eller svimningskänsla',
    'Hjärtklappning eller oregelbunden puls',
    'Förvirring eller ovanligt svårt att koncentrera sig',
    'Kraftig huvudvärk som inte släpper av vatten och salt',
    'Darrighet, kallsvett eller stark svaghet (tecken på lågt blodsocker)',
    'Illamående eller kräkningar',
  ],

  faq: [
    {
      title: 'Jag åt något mitt i fastan. Är allt förstört?',
      body: 'Nej. En liten sak (en skvätt mjölk, ett tuggummi) påverkar knappt något. Något större (ett äpple, en läsk) bryter fastan: insulinet stiger, fettförbränningen pausas och eventuell ketos avbryts några timmar. Men det långsiktiga resultatet avgörs av vad du gör de flesta dagarna – inte av en enskild fasta. Avsluta fastan i appen eller fortsätt och se det som en nystart.',
    },
    {
      title: 'Går jag ner mer i vikt av fasta än av vanlig bantning?',
      body: 'Studier visar i regel ungefär samma viktnedgång som vanlig kaloribegränsning när den totala energin är densamma. Fastans styrka är att många tycker att det är enklare att följa – inte att den har en magisk effekt.',
    },
    {
      title: 'Hur mycket kan jag gå ner av en fasta?',
      body: 'Mindre än vågen antyder. En fasta på 16 timmar förbrukar ungefär 1 000–1 600 kcal, vilket motsvarar upp till ~0,2 kg fett om måltiderna inte kompenserar. Vågen sjunker ofta mer, men det är mest vatten och glykogen som kommer tillbaka när du äter. Se Lär dig → Uppskattning.',
    },
    {
      title: 'Bränner kroppen muskler?',
      body: 'Vid korta fastor (12–24 h) är det minimalt om du äter tillräckligt med protein och styrketränar. Viss förlust av fettfri massa har setts i vissa studier av tidsbegränsat ätande, så protein och styrketräning är viktigt.',
    },
    {
      title: 'Saktar ämnesomsättningen ner?',
      body: 'Korta fastor sänker inte ämnesomsättningen nämnvärt. All viktnedgång, oavsett metod, sänker dock energibehovet något eftersom en mindre kropp gör av med mindre energi.',
    },
    {
      title: 'Är fasta annorlunda för kvinnor?',
      body: 'Forskningen på kvinnor är begränsad. Vissa kvinnor upplever att långa eller täta fastor påverkar sömn, humör eller menstruationscykeln. Börja försiktigt, t.ex. med 12:12 eller 14:10, och var uppmärksam på hur du mår.',
    },
    {
      title: 'Räknas sömnen?',
      body: 'Ja! Fastan räknas från när du slutade äta, oavsett om du är vaken eller sover. Därför är kvällsfasta + nattsömn det smidigaste upplägget.',
    },
    {
      title: 'När börjar autofagin?',
      body: 'Ärligt svar: vi vet inte för människor. Autofagi är väl dokumenterat i djurstudier och celler, men det finns ingen bra metod att mäta den i hela människokroppen, så alla exakta siffror (”efter 16 timmar”) är spekulation.',
    },
  ],

  researchCaveats: [
    'De flesta studier är korta (8–12 veckor) och små. Vi vet lite om effekter över flera år.',
    'När kalorierna är lika ger fasta ungefär samma viktnedgång som vanlig bantning.',
    'Många studier gjordes på personer med övervikt – resultaten gäller inte självklart för alla.',
    'Djurstudier (möss lever längre av fasta) går inte att översätta direkt till människor.',
    'Observationsstudier visar samband, inte orsak. Randomiserade studier väger tyngre.',
  ],
}
