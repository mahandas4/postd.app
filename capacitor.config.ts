
import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.961a76b294d1428c92b07604ce5590ae',
  appName: 'postd-nearby-now',
  webDir: 'dist',
  server: {
    url: 'https://961a76b2-94d1-428c-92b0-7604ce5590ae.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#000000',
      showSpinner: false
    }
  }
};

export default config;
