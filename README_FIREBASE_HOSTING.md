# WeaponLog - Complete Setup & Deployment Guide

##  Table of Contents
1. [Firebase Project Setup](#firebase-project-setup)
2. [Web App Registration](#web-app-registration)
3. [Configuration](#configuration)
4. [Firestore Database Setup](#firestore-database-setup)
5. [Authentication Setup](#authentication-setup)
6. [Local Development](#local-development)
7. [Hosting Setup & Deployment](#hosting-setup--deployment)
8. [Multi-User & Cloud Sync](#multi-user--cloud-sync)
9. [Sharing with Other Shooting Clubs](#sharing-with-other-shooting-clubs)

---

## Firebase Project Setup

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Create Project"** or **"Add Project"**
3. Enter project name (e.g., `WeaponLog-Firebase` for your club)
4. Accept Google Analytics settings (default is fine)
5. Click **"Create Project"** and wait for initialization (1-2 minutes)

---

## Web App Registration

### Step 2: Register a Web App

1. In Firebase Console, click the **gear icon** → **Project Settings**
2. Go to the **"Your apps"** section
3. Click the **Web icon** (`</>`)
4. Enter app nickname: `WeaponLog` (or your club name)
5. **Check:** "Also set up Firebase Hosting for this app" (optional but recommended)
6. Click **"Register app"**
7. Copy the entire Firebase configuration block

---

## Configuration

### Step 3: Update firebase-config.js

1. In your code editor, open `firebase-config.js` in the project root
2. Replace the existing `firebaseConfig` object with the one you copied from Firebase:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123xyz"
};
```

**Save the file.**

---

## Firestore Database Setup

### Step 4: Create Firestore Database

1. In Firebase Console, go to **Build** → **Firestore Database**
2. Click **"Create Database"**
3. **Choose:**
   - Location: Select closest region to you (e.g., `europe-west1` for Norway)
   - Mode: **"Start in production mode"** (permanent, requires security rules)
4. Click **"Create"**
5. Wait for database to initialize (1-2 minutes)

**Note:** Production mode is required for permanent club use. Test mode auto-expires after 30 days.

### Step 5: Set Security Rules (Production Mode)

**⚠️ IMPORTANT:** Production mode denies ALL access by default. You MUST set security rules or the app won't work.

1. In Firestore Console, go to the **"Rules"** tab
2. Replace all content with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Check if user is in the allowed users list
    match /weaponlog/access {
      allow read: if request.auth != null;
    }
    
    // Allow access only if user is in allowedUsers list
    match /{document=**} {
      allow read, write: if request.auth != null && 
        request.auth.email in 
        get(/databases/$(database)/documents/weaponlog/access).data.allowedUsers;
    }
  }
}
```

3. Click **"Publish"** and wait for deployment (1-2 minutes)
4. Verify rules are published (green checkmark)

### What These Rules Mean

- ✅ **Only invited users** can access (must be in `allowedUsers` list)
- ✅ **Add users via Admin panel** - click "Legg til bruker" with their email
- ✅ **Secure at database level** - Firestore enforces access, not just the app
- ✅ **No data leakage** - Unauthorized users get database error if they try to access

### How to Add Users

1. In the app: Click **Admin** (red button)
2. Click **"Legg til bruker"**
3. Enter user's email address
4. Enter admin password
5. Click "Legg til"
6. User now has access (they will be added to `allowedUsers` in Firestore)

### Remove User Access

1. In the app: Click **Admin** → **"Fjern bruker"**
2. Select user from list
3. Enter admin password
4. User access is revoked immediately

### Optional: Simple Access (Everyone with Google Account)

If you want ANY Google user to access (easier for testing), use the simple rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

**Use the first (restricted) rules for production.** Use simple rules only for testing.

---

## Authentication Setup

### Step 6: Enable Google Sign-In

1. Go to **Build** → **Authentication**
2. Click the **"Sign-in method"** tab
3. Click **"Google"** provider
4. Toggle **"Enable"** to ON
5. Select a **Support email** from the dropdown
6. Click **"Save"**

### Step 7: Add OAuth Redirect URIs

1. Go to **APIs & Services** → **Credentials** (in Google Cloud Console)
2. Click your **OAuth 2.0 Client ID** (created automatically)
3. Add to **Authorized JavaScript origins:**
   - `https://YOUR_HOSTING_URL.web.app`
   - `https://YOUR_HOSTING_URL.web.app/`
   - `http://localhost:8000` (for local development)

4. Add to **Authorized redirect URIs:**
   - `https://YOUR_HOSTING_URL.web.app/__/auth/callback`

5. Click **"Save"**

---

## Local Development

### Step 8: Start Local Server

To test locally, you need an HTTP server (required for Firebase authentication):

**Using Python (easiest):**
```powershell
python -m http.server 8000
```

**Using Node.js:**
```powershell
npx http-server -p 8000
```

Then open: `http://localhost:8000` in your browser

---

## Hosting Setup & Deployment

### Step 9: Install Node.js & Firebase CLI

1. Go to https://nodejs.org/
2. Download the **LTS** version
3. Run installer with default settings
4. **Restart PowerShell after installation**

Verify:
```powershell
node --version
npm --version
```

Install Firebase CLI globally:
```powershell
npm install -g firebase-tools
```

Verify:
```powershell
firebase --version
```

### Step 10: Login to Firebase

```powershell
firebase login
```

Your browser opens - log in with your Google account and authorize. Return to PowerShell when done.

### Step 11: Initialize Hosting

In your project folder:
```powershell
firebase init hosting
```

Answer as follows:
- **Use existing project?** → Y
- **Select project** → Choose your Firebase project
- **Public directory** → **.** (just a period)
- **Single-page app (rewrite URLs to index.html)?** → Y
- **File exists, overwrite?** → N
- **Auto-deploy with GitHub?** → N

### Step 12: Deploy to Firebase Hosting

```powershell
firebase deploy
```

**Result:**
```
✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/your-project/overview
Hosting URL: https://your-project.web.app
```

Your app is now live! 🎉

---

## Multi-User & Cloud Sync

### How It Works

- **First login:** The first user (admin) gets automatically added to the access list
- **Add more users:** Click **Admin** → **Legg til bruker** and enter their email + admin password
- **Real-time sync:** All users see updates in real-time across devices
- **Offline support:** Changes sync to cloud when connection is restored

### Admin Features

- Change admin password (red **Admin** button)
- Add/remove users
- Export data to CSV
- View active users

---

## Sharing with Other Shooting Clubs

### For Each Shooting Club:

1. **Clone the repository:**
   ```powershell
   git clone <your-repo-url>
   cd WeaponLogg-Firebase
   ```

2. **Create their own Firebase project** (follows steps 1-7 above)

3. **Update firebase-config.js** with their Firebase credentials

4. **Set up Hosting** (follows steps 9-12 above)

5. **Deploy to their hosting URL**

### Important Notes:

- ✅ Each club has **completely separate data** (own database)
- ✅ Each club controls their **own admin password**
- ✅ No data is shared between clubs
- ✅ Each club can customize icons and styling
- ✅ Full offline support for all clubs

---

## Troubleshooting

### "API key not valid" Error
- Verify `firebase-config.js` has correct credentials from your Firebase project
- Check that Web App is registered in Firebase Console

### "Operation not allowed" Error  
- Google Sign-In is not enabled
- Go to **Authentication** → **Sign-in method** → Enable **Google**

### "Cloud Firestore backend unavailable"
- Firestore database not created
- Go to **Firestore Database** and click **Create Database**
- Wait for initialization (1-2 minutes)

### CORS Errors in Console
- Add your hosting URL to OAuth authorized origins (Step 7)
- Wait 5-15 minutes for settings to take effect
- Errors are warnings - app still works

### Can't deploy with `firebase deploy`
- Verify you're logged in: `firebase login`
- Verify correct project: `firebase projects:list`
- Verify `firebase.json` exists in project root

---

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review [Firebase Documentation](https://firebase.google.com/docs)
3. Check your app's browser console (F12 → Console tab) for error messages

---

## Next Steps

✅ Setup complete! Your shooting club now has:
- Cloud data storage
- Multi-user real-time sync
- Offline support
- Google authentication
- Mobile & desktop support
- Free hosting

Start adding your shooting club members in the Admin panel!

Project Console: https://Link name will be in your Terminal
Hosting URL: https://Link name will be in your Terminal
```

**Your app is now live!** 🎉

---

## STEP 6: Test the App

1. Go to Exsample: `https://WeaponLog-Firebase.firebaseapp.com` in your browser
2. Click "Sign In with Google"
3. Sign in and test the functionality

**If it fails:**
- Open Developer Tools (F12)
- Go to the **Console** tab
- Look for error messages

---

## Future Deployments

**Every time you make changes to the code:**

```powershell
# Go to the project folder
cd path\to\WeaponLogg-Firebase-main

# Deploy to Firebase
firebase deploy
```

You can either:
- Push to GitHub first + deploy, or
- Deploy directly from your local version

**Tip:** Create a PowerShell shortcut if you deploy frequently:
```powershell
Set-Alias fbd "firebase deploy"
```

---

## API Key Security

✅ **What's secure now:**
- `firebase-config.js` is in `.gitignore`
- Your API key is NOT on GitHub
- The file only exists on Your PC (and the Firebase Hosting server)

✅ **Firebase Hosting handles:**
- Server-side distribution of `firebase-config.js`
- SSL/HTTPS (secure encryption)
- 24/7 online hosting

---

## Troubleshooting

### Problem: `firebase: The command cannot be found`
**Solution:** Restart PowerShell after npm install

### Problem: 404 - firebase-config.js not found
**Solution:** Run `firebase deploy` again

### Problem: Login fails
**Solution:** Run `firebase logout` and then `firebase login`

### Problem: Deploy fails with permission error
**Solution:** Run PowerShell as Administrator

---

## Useful Commands

```powershell
# Check deployment status
firebase status

# Check deployment history
firebase hosting:channel:list

# Log out
firebase logout

# View local preview (before deploy)
firebase emulators:start --only hosting
```

---

## Cost

**Firebase Hosting - Free plan provides:**
- ✅ 1 GB storage
- ✅ 10 GB/month bandwidth
- ✅ 5 site deployments/day
- ✅ Unlimited concurrent connections

**For WeaponLogg:** Mer enn nok! 

---

## Supportinstitusjoner

- Firebase Docs: https://firebase.google.com/docs/hosting
- Firebase CLI Docs: https://firebase.google.com/docs/cli

---

**Sist oppdatert:** March 22, 2026
**Versjon:** 1.0
