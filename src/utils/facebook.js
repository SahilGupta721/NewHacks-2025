// Facebook SDK Utility
export const initFacebookSDK = () => {
  return new Promise((resolve) => {
    // Set App ID globally for SDK
    const appId = import.meta.env.VITE_FACEBOOK_APP_ID || '';
    window.FACEBOOK_APP_ID = appId;

    // Wait for SDK to load
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: appId,
        cookie: true,
        xfbml: true,
        version: 'v18.0'
      });
      resolve();
    };

    // If SDK already loaded
    if (window.FB) {
      resolve();
    }
  });
};

export const loginWithFacebook = () => {
  return new Promise((resolve, reject) => {
    if (!window.FB) {
      reject(new Error('Facebook SDK not loaded'));
      return;
    }

    window.FB.login((response) => {
      if (response.authResponse) {
        // User logged in successfully
        window.FB.api('/me', { fields: 'id,name,email,picture' }, (userInfo) => {
          const user = {
            id: userInfo.id,
            name: userInfo.name,
            email: userInfo.email || null, // Email might be null if user denied permission
            avatar: userInfo.picture?.data?.url || null,
            provider: 'facebook',
            accessToken: response.authResponse.accessToken
          };
          resolve(user);
        });
      } else {
        // User cancelled login or did not fully authorize
        reject(new Error('Facebook login was cancelled or not authorized'));
      }
    }, { scope: 'public_profile,email' });
  });
};

export const logoutFacebook = () => {
  return new Promise((resolve) => {
    if (window.FB) {
      window.FB.logout(() => {
        resolve();
      });
    } else {
      resolve();
    }
  });
};
