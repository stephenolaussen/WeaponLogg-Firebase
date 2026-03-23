# Firebase Hosting Setup - Step by Step

## Overview
This guide explains how to deploy WeaponLogg app to Firebase Hosting. This keeps your Firebase API key secure (not exposed on GitHub) while hosting the app 24/7 for free.

## Requirements
- Windows PC
- Firebase project (`WeaponLog-Firebase`)
- Git repository on GitHub

---

## STEP 1: Install Node.js

1. Go to https://nodejs.org/
2. Download the **LTS** version (Long Term Support - green button)
3. Run the installer - select all default options (click "Next" throughout)
4. **IMPORTANT:** Restart PowerShell/Terminal after installation

**Verify installation:**
```powershell
node --version
npm --version
```
Both should display version numbers (e.g., `v20.10.0` and `10.2.0`)

---

## STEP 2: Install Firebase CLI

In PowerShell, run:
```powershell
npm install -g firebase-tools
```

This installs the Firebase Command Line Interface globally. Wait until it's complete (approximately 1-2 minutes).

**Verify:**
```powershell
firebase --version
```
Should display a version number (e.g., `13.0.0`)

---

## STEP 3: Log In to Firebase

```powershell
firebase login
```

**What happens:**
1. Your browser opens automatically
2. Log in with your Google account (same as your Firebase project)
3. Accept the permissions
4. Return to PowerShell

**You should see:**
```
Success! Logged in as your-email@gmail.com
```

---

## STEP 4: Initialize Firebase Hosting

In your project folder, run:
```powershell
firebase init hosting
```

**Answer the questions as follows:**

| Question | Answer |
|----------|--------|
| Use an existing project? | **Y** (Yes) |
| Select a project | Select `WeaponLog-Firebase` |
| What do you want to use as your public directory? | **`.`** (just a period) |
| Single-page app (rewrite all URLs to index.html)? | **Y** (Yes) |
| Overwrite index.html? | **N** (No) |
| Set up automatic builds and deploys with GitHub? | **N** (No) |

**Result:**
- New file `firebase.json` is created
- New folder `.firebaserc` (hidden) is created
- Configuration is saved

---

## STEP 5: Deploy to Firebase Hosting

```powershell
firebase deploy
```

**Wait:** Approximately 1-2 minutes

**Result - you should see:**
```
✔  Deploy complete!

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
