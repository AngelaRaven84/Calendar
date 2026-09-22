# Calendar

En svensk kalender byggd med React, Vite och Zustand. Frontend publiceras på Amazon S3 och kommunicerar med Calendar Events API via API Gateway, Lambda och DynamoDB.

**Status 22 september 2026:** Deployment Bootcamp, övning 2 och 3, genomförda. Sara har bekräftat hela CRUD-flödet både lokalt och från S3 efter den senaste publiceringen.

[Publicerad skolversion](http://calendar-bucket-260921.s3-website.eu-north-1.amazonaws.com) · [Backend](https://github.com/AngelaRaven84/Calendar-Events-API)

## Genomförda förbättringar

**Avbockat under arbetet 21–22 september:**

- [x] Rätta --color-surface från #ffffdf8 till #fffdf8.
- [x] Rätta CSS-klassen för dagens datum; fetstil och accentfärg verifierade av Sara.
- [x] Rätta formulärets margin och kontrollera centrering/avstånd.
- [x] Ändra dokumentspråket till svenska.
- [x] Namnge månadspilarna med aria-label och testa Tab/Enter.
- [x] Lägg till kopplade formuläretiketter och testa fokus genom klick.
- [x] Anpassa kalenderkolumner och långa eventtitlar till mobil; testa redigerings- och raderingsknappar.
- [x] Testa månadsväxling och datumval efter designändringarna.
- [x] Bygg och publicera Calendar på S3; öppna appen via website endpoint.
- [x] Lägg till starttid och sluttid samt byt time till startTime; testa sortering och redigering.
- [x] Bygg login med felvisning och session i minnet; testa rätt/fel uppgifter och omladdning.
- [x] Hämta användarens händelser från API:t med Bearer-token.
- [x] Skapa händelse via API:t och kontrollera beständighet efter omladdning.
- [x] Uppdatera händelse via API:t och kontrollera sparad titel med ny hämtning.
- [x] Radera via API:t; testa både avbryt och bekräfta samt omladdning.
- [x] Ersätt Zustand persist med lista i minnet; DynamoDB lagrar data permanent.
- [x] Kör lint och build före publicering, godkänt enligt Sara.
- [x] Publicera uppdaterat dist och testa hela API-flödet från S3.
- [x] Ersätt den tomma README-filen med funktioner, installation, publicering och verifieringsstatus.

**Kvar från Calendars tidigare plan – senare arbete:**

- [ ] Bygg månadsspecifika Anteckningar med sparat innehåll; lagringslösning anpassas till API:t.
- [ ] Bygg Månadens fokus som sparad checklista.
- [ ] Placera dessa två funktioner enligt Figma när de är klara.
- [ ] Lägg till aktuella screenshots för portfolion.

## Data och inloggning

DynamoDB är den permanenta lagringen. Zustand håller den hämtade listan i minnet; persist har tagits bort. Äldre calendar-events i localStorage används inte längre och migreras inte automatiskt.

Home håller accessToken och userId i React-state. jwt-decode läser sub ur tokenen, men verifierar inte dess signatur. Backend verifierar tokenen och kontrollerar ägarskapet. Tokenen skickas som Bearer i Authorization-headern och sparas inte i localStorage. Omladdning kräver ny inloggning, varefter händelserna hämtas från API:t.

## Starta lokalt

Använd Node.js 24 och installera beroenden:

~~~bash
npm ci
~~~

Skapa .env.local bredvid package.json:

~~~dotenv
VITE_API_URL=https://DIN-API-BASADRESS
~~~

Använd samma basadress som i Insomnia, utan /login eller /users. Behåll eventuell stage-sökväg. API-adressen är offentlig och byggs in i frontend; lägg aldrig JWT_SECRET, lösenord eller AWS-nycklar i VITE_-variabler. .env.local ignoreras av Git genom *.local.

~~~bash
npm run dev
~~~

Starta om Vite efter ändringar av miljövariabler. API:ts CORS tillåter http://localhost:5173 och skolversionens S3-origin. Annan lokal port behöver en motsvarande CORS-inställning.

Registrera testanvändare via backendens POST /users, exempelvis i Insomnia. Frontend har ännu inget registreringsformulär.

## Bygga och publicera

~~~bash
npm run lint
npm run build
~~~

Ladda upp innehållet i dist, inklusive index.html och assets, till roten i S3-bucketen calendar-bucket-260921. Ladda inte upp själva dist-mappen, källkod eller miljöfiler. Static website hosting använder index.html; bucket policy ger offentlig s3:GetObject-åtkomst till frontendfilerna. Öppna website endpoint och gör hård omladdning efter uppdatering.

## Verifiering 22 september 2026

Sara rapporterade godkänd lint/build före uppladdning och verifierade:

- Felaktig inloggning visar fel; korrekt inloggning visar kalendern. Omladdning visar login igen.
- GET 200 hämtar användarens händelser; tom användare ger [].
- POST 201 visar sparad händelse. Efter omladdning/inloggning finns den kvar.
- PATCH 200 ändrar titeln; efter ny hämtning finns ändringen kvar.
- Avbruten radering skickar inget DELETE. Bekräftad DELETE 200 tar bort händelsen även efter omladdning.
- Samma kompletta flöde fungerar från S3-adressen.

Agenten har granskat aktuell kod. AWS- och webbläsarresultaten ovan är Saras manuellt rapporterade tester, inte en automatiserad slut-till-slut-testsvit.

## Avgränsningar och senare arbete

Bootcampens grundflöde är klart. CloudFront/HTTPS, registreringsvy, utloggningsknapp, automatisk hantering av utgången session, Anteckningar och Månadens fokus är senare arbete. Tokenen gäller i 15 minuter; vid utgång visar API-anrop fel och ny inloggning behövs. Skolversionen använder HTTP; inför privat användning med riktiga uppgifter behövs HTTPS även för frontend. uuid finns kvar som beroende från den tidigare lokala versionen men event-ID skapas nu av backend.

**Nästa steg:** Repetera det verifierade flödet inför eventuell munta och invänta examinationens skriftliga krav före nya funktioner.
