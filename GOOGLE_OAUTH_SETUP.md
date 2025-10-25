# Google OAuth Setup Instructions

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Navigate to **APIs & Services** → **Credentials**

## Step 2: Create OAuth 2.0 Client ID

1. Click **+ CREATE CREDENTIALS** → **OAuth client ID**
2. Choose **Web application** as application type
3. Enter a name (e.g., "CulturaCart Web")

## Step 3: Configure OAuth Consent Screen

Before creating credentials, configure the OAuth consent screen:
1. Go to **OAuth consent screen**
2. Choose **External** user type
3. Fill in:
   - App name: **CulturaCart**
   - User support email: your email
   - Developer contact: your email
4. Add scopes:
   - `userinfo.email`
   - `userinfo.profile`
5. Save and continue

## Step 4: Add Authorized Origins and Redirect URIs

### For Development:

**Authorized JavaScript origins:**
```
http://localhost:5173
http://localhost:5174
http://localhost:5175
```

**Authorized redirect URIs:**
```
http://localhost:5173
http://localhost:5174
http://localhost:5175
```

### For Production:

**Authorized JavaScript origins:**
```
https://yourdomain.com
https://www.yourdomain.com
```

**Authorized redirect URIs:**
```
https://yourdomain.com
https://www.yourdomain.com
```

## Step 5: Get Your Client ID

1. After creating the OAuth client, you'll see your **Client ID**
2. Copy the Client ID (format: `xxxxx.apps.googleusercontent.com`)
3. Paste it into your `.env` file:

```env
VITE_GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
```

## Step 6: Test the Integration

1. Restart your dev server: `npm run dev`
2. Navigate to `/login` or `/signup`
3. Click **"Continue with Google"** button
4. Sign in with your Google account
5. You should be redirected back to the app and logged in!

## Troubleshooting

### Error: "redirect_uri_mismatch"
- Make sure the redirect URI in Google Console exactly matches your app's URL
- Check that you're using the correct port (5173, 5174, etc.)

### Error: "invalid_client"
- Double check your Client ID in `.env` file
- Restart dev server after changing `.env`

### Error: "Access blocked: This app's request is invalid"
- Complete the OAuth consent screen configuration
- Add test users if app is in development mode

## Security Notes

- **Never commit your `.env` file to git**
- `.env` is already in `.gitignore`
- Use environment variables for production deployment
- Rotate your Client ID if it's ever exposed publicly

## Backend Integration (Optional)

When you have a backend API:

1. Send the Google `access_token` to your backend
2. Verify the token server-side
3. Create/find user in your database
4. Return a JWT or session token
5. Store auth token in frontend

Example backend endpoint:
```javascript
POST /api/auth/google
Body: { accessToken: 'google-access-token' }
Response: { user: {...}, token: 'your-jwt-token' }
```

## Current Implementation

Right now the app:
- ✅ Authenticates with Google OAuth
- ✅ Gets user profile (name, email, picture)
- ✅ Stores user in AuthContext and localStorage
- ⚠️ Does NOT send to backend (you need to implement this)
- ⚠️ Does NOT persist sessions (localStorage only)

## Next Steps

1. Create a backend API for authentication
2. Implement JWT tokens
3. Add protected routes
4. Add session management
5. Implement logout functionality
