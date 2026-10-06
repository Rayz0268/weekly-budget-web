# Weekly Budget — Web: sync status & remaining steps

## ✅ Done (Phase 1 + 2)
- Redesigned desktop web app at `public/index.html` (sidebar + dashboard layout).
- Firebase **v12.15.0 modular SDK** wired via a `type="module"` bridge (`window.__fb`).
- **Google sign-in** (popup, redirect fallback) + **Firestore real-time sync**:
  each user's budget lives at `budgets/{uid}` as `{ data, updatedAt }`. Last-write-wins
  merge on sign-in, live `onSnapshot` subscription, debounced push of local edits,
  echo-suppression so remote updates don't bounce back.
- Verified locally: SDK initializes, auth + firestore live, no errors.

## ⚠️ You must do ONE thing before sync works: publish the security rules
A production-mode Firestore denies all access until rules are set. Without this,
signing in will show "Sync error" (permission denied).

**Easiest (no CLI):** Firebase Console → your project → **Firestore Database → Rules**,
paste the contents of [`firestore.rules`](firestore.rules), click **Publish**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /budgets/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

## Using it right now (on your laptop)
The local preview server runs on your Mac at **http://localhost:8766**
(launch config `budget-web`). Firebase auto-authorizes `localhost`, so Google
sign-in + sync work there in a normal browser once the rules above are published.

## Optional: deploy to a permanent URL (needs Node.js)
This machine has no Node/npm, so the Firebase CLI isn't installed. To get a
public `https://budgeting-app-dfbde.web.app` URL (so you don't need the local
server running):
1. Install Node.js (or let me set it up in your home dir like the JDK).
2. `npm install -g firebase-tools`
3. `cd ~/budget_web && firebase login` (interactive — opens a browser)
4. `firebase deploy`  ← deploys both hosting and the firestore rules
   (`.firebaserc` already points at project `budgeting-app-dfbde`).

## Next: Phase 3 — phone APK sync
Add internet permission + the same Firebase sync to the existing APK
(`~/budget_webview_apk`), keystore preserved so it installs as an update.
The APK's WebView will use the redirect sign-in flow (popups are unreliable in WebView).
