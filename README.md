# WeaponLog (V1.0) - Firebase Edition

##  Overview
WeaponLog is a web-based application designed for shooting clubs to efficiently track and manage firearms, rentals, maintenance, and user permissions. This Firebase edition includes cloud synchronization, multi-user access, and real-time updates across all devices.

**Live Demo:** https://weaponlog-firebase.web.app  
**Default Password:** Admin (change via Admin panel)

---

##  Features

-  **Firebase Authentication** - Secure Google Sign-In
-  **Cloud Synchronization** - Real-time updates across all users and devices
-  **Multi-Platform** - Optimized for desktop and mobile
-  **Offline Support** - Works offline, syncs when connection is restored
-  **Progressive Web App** - Install as app on mobile/desktop
-  **Admin Panel** - Manage users, set passwords, export data
-  **Audit Logs** - Track all changes with timestamps
-  **Multi-Club Support** - Each club has separate secure database

---

##  Quick Start

### For First-Time Users
1. **New shooting club?** Follow [SETUP GUIDE](README_FIREBASE_HOSTING.md) for complete Firebase setup
2. **Already have Firebase?** Log in with Google: https://weaponlog-firebase.web.app
3. **Need to set up for your club?** See [Sharing with Other Clubs](#sharing-with-other-clubs) section

### Essential Passwords
- **Admin Password:** `Admin` (Default - change in Admin panel)
- Access password-protected features in Admin section

---

##  Documentation

- **[Complete Setup Guide](README_FIREBASE_HOSTING.md)** - Step-by-step Firebase & hosting setup
- **[Firebase Integration Details](FIREBASE_SETUP.md)** - Technical Firebase configuration

---

##  Project Structure

```
WeaponLog-Firebase/
├── index.html                 # Main app interface
├── app.js                     # Core application logic
├── style.css                  # Styling
├── firebase-config.js         # Firebase credentials (customize per club)
├── firebase-auth.js           # Authentication module
├── firebase-db.js             # Database module
├── manifest.json              # PWA configuration
├── sw.js                      # Service worker (offline support)
├── assets/
│   ├── icons/                 # App icons
│   └── screenshots/           # Feature screenshots
├── README.md                  # This file
├── README_FIREBASE_HOSTING.md # Full setup guide
└── FIREBASE_SETUP.md          # Firebase technical guide
```

---

##  Main Features Explained

### User Management
- First user becomes admin automatically
- Admin can add/remove users by email
- Each user has their own Google account

### Weapon Tracking
- Add weapons with details (make, model, caliber)
- Track maintenance history
- Mark weapons as active/inactive
- View all rentals and assignments

### Rentals & Assignments  
- Assign weapons to club members
- Track checkout/return dates
- View active rentals in real-time
- History of all assignments

### Admin Features
- **User Management** - Add/remove club members
- **Password Control** - Change admin password anytime
- **Data Export** - Download records as CSV
- **Maintenance Logs** - Track weapon servicing
- **Audit Trail** - See all changes with timestamps

---

##  Sharing with Other Clubs

Each shooting club can have their own WeaponLog instance with complete data separation:

### For Each Club:

1. **Clone the repository**
   ```powershell
   git clone <this-repository-url>
   cd WeaponLog-Firebase
   ```

2. **Create Firebase project** (see [Setup Guide](README_FIREBASE_HOSTING.md#firebase-project-setup))

3. **Update firebase-config.js** with your Firebase credentials

4. **Deploy to Firebase Hosting** (see [Setup Guide](README_FIREBASE_HOSTING.md#hosting-setup--deployment))

### What Gets Customized per Club:
- ✅ Firebase project (separate database)
- ✅ Admin password
- ✅ Hosting URL (e.g., `your-club-name.web.app`)
- ✅ Icons and branding (optional)

### What Stays the Same:
- ✅ Application code
- ✅ UI/UX
- ✅ Features

---

##  Local Development

### Prerequisites
- Node.js v14+ ([Download](https://nodejs.org/))
- Firebase project configured
- `firebase-config.js` updated with credentials

### Setup

1. **Clone repository**
   ```powershell
   git clone <repository-url>
   cd WeaponLog-Firebase
   ```

2. **Start local HTTP server** (required for Firebase)
   ```powershell
   python -m http.server 8000
   ```
   Or with Node.js:
   ```powershell
   npx http-server -p 8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

---

##  Progressive Web App (PWA)

Install WeaponLog as an app on your device:

**Desktop (Chrome):**
- Click the install icon (⬇️) in address bar

**Mobile (Android/iOS):**
- Tap menu → "Add to Home Screen" or "Install app"

The app works offline and syncs when connection is restored!

---

##  Security

-  Firebase Authentication (no passwords stored)
-  Firestore Security Rules (authenticated users only)
-  HTTPS encrypted communication
-  Admin password only for sensitive operations
-  Full audit trail of all changes

---

##  Performance

- Fast real-time updates
- Offline-first architecture
- Optimized for mobile (responsive design)
- Minimal data transfer
- Service worker caching

---

##  Troubleshooting

### Login Issues
- Ensure Google Sign-In is enabled in Firebase Console
- Check OAuth redirect URIs are configured (see [Setup Guide](README_FIREBASE_HOSTING.md#step-7-add-oauth-redirect-uris))
- Clear browser cache and try again

### Data Not Syncing
- Check internet connection
- Verify Firestore database is created
- Check browser console (F12) for errors

### Can't Access Database
- Ensure Firestore Security Rules are published
- Verify authenticated (logged in with Google)

See [Setup Guide Troubleshooting](README_FIREBASE_HOSTING.md#troubleshooting) for more help.

---

##  Support

- Check application console (F12 → Console tab)
- Review [Setup Guide](README_FIREBASE_HOSTING.md)
- Visit [Firebase Documentation](https://firebase.google.com/docs)

---

##  License

**⚠️ PROPRIETARY - RESTRICTED USE**

This software is proprietary and confidential. It may ONLY be used by:
- Stephen Olaussen (Author)  
- Authorized shooting clubs that have purchased an explicit commercial license

**Unauthorized use, copying, modification, or distribution is strictly prohibited** and will result in legal action.

See [LICENSE](LICENSE) file for full terms. For licensing inquiries: Contact Stephen Olaussen

---

## 👤 Author

**Stephen Olaussen**

Last Updated: March 24, 2026 (Firebase Integration Complete)

---

##  Getting Started Today

1.  Read the [Setup Guide](README_FIREBASE_HOSTING.md)
2.  Follow the steps to configure Firebase
3.  Deploy to Firebase Hosting  
4.  Add your shooting club members
5.  Start tracking weapons and rentals!

**Questions?** Check the troubleshooting section or review the setup guide!
