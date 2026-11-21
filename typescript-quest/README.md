# TypeScript Quest

Kolme taseme ja 15 küsimusega TypeScripti õpimäng. Mäng näitab pärast vastamist selgitust ja lõpus tulemust ning tasemete kokkuvõtet.

## Käivitamine

Vajalik on Node.js (soovitatavalt 22 või uuem) ja npm.

```bash
npm install
npm run dev
```

Ava terminalis kuvatud aadress (tavaliselt http://localhost:5173/).

## Testid ja ehitamine

```bash
npm test
npm run build
npm run preview
```

- `npm test` käivitab automaattestid.
- `npm run build` kontrollib TypeScripti ja loob kausta `dist/`.
- `npm run preview` näitab valmis ehitatud versiooni.

### Käsitsi testimise kontrollnimekiri

1. Ava avaleht ja vajuta **Alusta mängu**.
2. Vali õige vastus: õige vastus muutub roheliseks ja punktisumma suureneb.
3. Vali mõnel järgmisel küsimusel vale vastus: valitud vastus muutub punaseks, õige roheliseks, punktid ei suurene.
4. Proovi pärast vastamist uuesti vastata: topeltpunkte ei tohi saada.
5. Liigu läbi kõigi 15 küsimuse, kontrollides kõiki kolme taset.
6. Veendu, et lõpptulemus ja tasemete punktid vastaksid vastustele.
7. Vajuta **Mängi uuesti**: kõik punktid ja küsimused lähtestatakse.
8. Testi ka kitsas mobiilivaates (nt brauseri Device Toolbar).
9. Proovi vastamiseks klaviatuuri klahve `1`, `2`, `3`, `4`.
10. Kontrolli GitHub Pagesi aadressi eraldi inkognitoaknas.

## GitHub Pages

1. Loo GitHubis **uus tühi avalik repositoorium** (näiteks `typescript-quest`).
2. Laadi projekti failid sinna üles ja veendu, et vaikeharu nimi on `main`.
3. Repositooriumi **Settings → Pages → Build and deployment → Source** all vali **GitHub Actions**.
4. Tee `main` harusse push. `.github/workflows/deploy.yml` testib, ehitab ja avaldab mängu.
5. Vaata tegevuse õnnestumist **Actions** vahekaardil.
6. Mängu URL on tavaliselt `https://KASUTAJANIMI.github.io/typescript-quest/` (asenda kasutajanimi ja repositooriumi nimi).

Kui sinu vaikeharu on `master`, muuda töövoofailis `branches: [main]` väärtuseks `branches: [master]`.

## Ülesande esitamine

Lisa oma GitHub Pagesi veebiaadress repositooriumi `TLUHK-RIF25/learning_applications` README faili (vajadusel fork + pull request), samuti kodutöö Issue kommentaari. Lisa Issuele silt `submission` ning määra Assignee-ks õppejõud.
