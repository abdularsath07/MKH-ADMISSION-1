# M.K.H Admissions — Online Admission Form

A simple, mobile-friendly admission form for M.K.H Admissions. When a
parent submits it, the details are emailed straight to your inbox.

## Files

- `index.html` — the form
- `style.css` — the design
- `script.js` — handles submission (edit one line here, see below)
- `logo.jpg` — your madrasa logo, shown at the top of the form

## Step 1 — Connect your email (Web3Forms, free)

GitHub Pages only hosts static pages, so it can't send emails on its own.
This project uses **Web3Forms**, a free service that forwards form
submissions to your inbox — 250 submissions/month free, no card needed.

1. Go to https://web3forms.com and click **"Create Access Key"** (or
   sign up first, either works).
2. For the form's email, enter: `luca.arsath120186@gmail.com`
3. Web3Forms will show you an **Access Key** — a string like
   `a1b2c3d4-e5f6-7890-abcd-ef1234567890`. Copy it.
4. Open `script.js` in this project and replace this line:

   ```js
   const ACCESS_KEY = "YOUR_ACCESS_KEY";
   ```

   with your real key, e.g.:

   ```js
   const ACCESS_KEY = "a1b2c3d4-e5f6-7890-abcd-ef1234567890";
   ```

5. Save the file.

That's it — every submission will now land in `luca.arsath120186@gmail.com`.
(250 submissions/month free — more than enough for one admissions form.)

## Step 2 — Put it on GitHub

1. Create a new repository on GitHub, e.g. `madrasa-admission`.
2. Upload these four files (`index.html`, `style.css`, `script.js`,
   `logo.jpg`) to it — either by dragging them into the GitHub web UI
   ("Add file" → "Upload files"), or via git:

   ```bash
   git init
   git add .
   git commit -m "Admission form"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/madrasa-admission.git
   git push -u origin main
   ```

## Step 3 — Turn on GitHub Pages (make it a live website)

1. In your repository, go to **Settings** → **Pages**.
2. Under "Build and deployment", set **Source** to `Deploy from a branch`.
3. Set **Branch** to `main` and folder to `/ (root)`, then **Save**.
4. Wait about a minute — GitHub will give you a live link like:
   `https://YOUR_USERNAME.github.io/madrasa-admission/`

Share that link with parents. Every form they submit will arrive in your
inbox automatically.

## Testing it

Open the live link, fill in the form yourself, and submit — you should
get a test email within a minute. If nothing arrives, double check:
- `ACCESS_KEY` in `script.js` was saved with your real Web3Forms key
- The email on your Web3Forms account is `luca.arsath120186@gmail.com`
-
