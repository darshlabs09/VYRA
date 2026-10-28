# VYRA - Fitness, Nutrition and Workout Tracker
By Darsh Vishwakarma

A static web app that you can host free on GitHub Pages. It has two modes:

| Mode | When | What you get |
|---|---|---|
| **Local mode** | `firebase-config.js` still has the PASTE_... placeholders | Works instantly. Accounts and data stay in each person's browser. Pro can be tried as a demo. No admin panel. |
| **Cloud mode** | You paste your Firebase settings | Real accounts (email + Google) that sync across devices, a database of all users, an **Admin panel only you can open**, and a **Pro plan** you control. |

## Files
- `index.html` the whole app
- `firebase-config.js` your settings (Firebase, payment link, price)
- `firestore.rules` the database security rules (this is what keeps data private and the admin panel owner-only)

---

## Set up Cloud mode (about 15 minutes, free)

### 1. Create the Firebase project
1. Go to https://console.firebase.google.com and click **Add project** (name it `vyra`). Google Analytics is not needed.
2. **Build > Authentication > Get started > Sign-in method**: turn on **Email/Password** and **Google** (pick your support email).
3. **Build > Firestore Database > Create database**: choose **Production mode** and a region near you (for India, `asia-south1` Mumbai).

### 2. Add the security rules
1. Firestore Database > **Rules** tab.
2. Delete everything there, paste the full contents of `firestore.rules`, click **Publish**.

### 3. Connect the app
1. Project settings (gear icon) > **General** > **Your apps** > click the web icon `</>` > register an app (no hosting needed).
2. Copy the `firebaseConfig` values into `firebase-config.js` (replace every PASTE_... value).
   The apiKey is not a secret. The rules protect the data.

### 4. Deploy on GitHub Pages
1. Create a GitHub repo and upload `index.html`, `firebase-config.js` (and `firestore.rules` if you like).
2. **Settings > Pages > Deploy from a branch > main > / (root) > Save.**
3. Your site: `https://<your-username>.github.io/<repo-name>/`
4. **Important:** Firebase Console > Authentication > **Settings > Authorized domains > Add domain** and add `<your-username>.github.io`. Without this, Google sign-in is blocked.

### 5. Make yourself the admin
1. Open your live site and **sign up** with the account you want as admin.
2. Firebase Console > Authentication > **Users**: copy your **User UID**.
3. Firestore Database > **Start collection** named `admins` > Document ID = **your UID** > add any field (for example `email` = your email) > Save.
4. Reload the site. An **Admin** tab appears for you, and only you.

Why this is secure: the Admin tab is only a convenience. The real lock is in `firestore.rules`: only accounts that have a document in `admins` can read the user list or change a plan, and only you can create that document (from the console). Nobody can edit the page's code to get around it.

---

## The Admin panel
- Total users, Pro users, pending Pro requests, active and new users this week
- Search users, see name, email, joined date, last active, plan, days logged, food entries, workouts
- **Make Pro / Approve Pro / Remove Pro** with one tap
- Export all users as CSV
- You see account details and activity counts only. Food logs and workouts stay private to each user.

## The Pro plan
Free: everything for tracking, diet plans, workouts, 5 custom foods.
Pro adds: **Insights** (7-day calorie chart, macro averages, streak, weight trend), **CSV export** of the food log, **unlimited custom foods**, a PRO badge.

How payment works (no server needed):
1. In `firebase-config.js`, set `paymentLink` to a **Razorpay Payment Link** (Razorpay Dashboard > Payment Links) and set `proPrice`.
2. A user taps **Go Pro > Pay with Razorpay**, pays, then taps **I have paid, notify the admin**.
3. In **Admin** you see a red **PRO REQUESTED** badge. Check the payment in your Razorpay dashboard, then tap **Approve Pro**.
If `paymentLink` is empty, users just see **Request Pro access**.

Automatic activation (optional, later): needs a small server function that receives Razorpay's payment webhook and sets `plan: "pro"`. That needs Firebase Cloud Functions, which require the paid Blaze plan, so it is left out to keep this free.

## Good to know
- Firebase free tier (Spark) is plenty for a student project.
- Users can move data between devices automatically. They can also use Goals > **Download backup** / **Restore backup**.
- Deleting an account removes its data and sign-in. Firebase may ask the user to log in again first for safety.
- Nutrition values are typical estimates, not medical advice.
- Without internet, Google Fonts fall back to the default font and cloud sign-in cannot load (the app tells the user it is running in local mode).
