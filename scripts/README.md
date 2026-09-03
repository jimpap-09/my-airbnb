# UI Generator

Το `generate.js` είναι ένα CLI script που δημιουργεί έτοιμα React/Next.js components
με Tailwind CSS και `react-icons`. Μπορεί να δημιουργήσει είτε ένα navigation bar
είτε ένα βασικό website landing page.

## Εκτέλεση

Από οποιονδήποτε root φάκελο:

```bash
npm run generate -- --type navbar --name MainNavbar
```

Αν το script βρίσκεται σε άλλο project ή φάκελο, μπορείς να το τρέξεις απευθείας:

```bash
node /path/to/scripts/generate.js --type navbar --name MainNavbar
```

Για να εμφανίσεις τη βοήθεια:

```bash
npm run generate -- --help
```

## Ορίσματα

### `--type` (υποχρεωτικό)

Ορίζει τι θα δημιουργηθεί:

- `navbar`: ένα responsive navigation bar σε ένα αρχείο `.tsx`
- `site`: ένα landing page και το αντίστοιχο navigation bar σε δύο αρχεία `.tsx`

### `--name`

Το όνομα του βασικού React component. Πρέπει να είναι σε PascalCase και να αρχίζει
με κεφαλαίο γράμμα. Προεπιλογή: `GeneratedPage`.

Παράδειγμα:

```bash
npm run generate -- --type navbar --name AirbnbNavbar
```

### `--output`

Ο φάκελος στον οποίο θα γραφτούν τα αρχεία. Προεπιλογή: `app/generated`.

```bash
npm run generate -- --type site --name LandingPage --output app/pages/landing
```

### `--root`

Ο root φάκελος στον οποίο θα δημιουργηθεί το `--output`. Προεπιλογή είναι ο
τρέχων φάκελος από όπου τρέχεις την εντολή. Αυτό επιτρέπει στο script να
χρησιμοποιείται από οποιοδήποτε project:

```bash
node /path/to/scripts/generate.js --type site --name LandingPage --root /path/to/my-project
```

### `--force`

Επιτρέπει την αντικατάσταση αρχείων στον φάκελο output. Χωρίς αυτό το όρισμα,
το script σταματά αν κάποιο από τα αρχεία που θα δημιουργήσει υπάρχει ήδη,
για να προστατεύσει υπάρχοντα αρχεία. Ο φάκελος μπορεί να υπάρχει ήδη.

```bash
npm run generate -- --type navbar --name MainNavbar --force
```

## Τι επιστρέφει

Το script δεν επιστρέφει δεδομένα JavaScript. Δημιουργεί αρχεία στον φάκελο
`--output` και εμφανίζει μήνυμα επιτυχίας στο terminal, για παράδειγμα:

```text
Generated navbar in app/generated
```

Σε μη έγκυρο `--type` ή `--name`, ή όταν υπάρχει ήδη ο φάκελος output χωρίς
`--force`, εμφανίζει μήνυμα σφάλματος και τερματίζει με exit code `1`.

## Παραγόμενα αρχεία

Για `--type navbar`:

```text
app/generated/MainNavbar.tsx
```

Για `--type site`:

```text
app/generated/LandingPage.tsx
app/generated/LandingPageNavbar.tsx
```

Τα παραγόμενα components μπορούν να εισαχθούν σε οποιαδήποτε σελίδα του Next.js
project και να προσαρμοστούν στο περιεχόμενο και στο design της εφαρμογής.
