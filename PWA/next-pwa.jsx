
// npm i next-pwa


// ================ next.config.js ==================//

/** @type {import('next').NextConfig} */
const nextConfig = {}

const withPWA = require('next-pwa')({
    dest: 'public'
  })

module.exports = withPWA(nextConfig)


// goole search --> Next js pwa mainifest generator 
// go to --> https://www.simicart.com/manifest-generator.html/
// fill the form and click --> Generate Menifest (it will auto download manifest file)
// past the menifest file to the --> public folder

// ================= app/public/manifest.webmanifest ==================//
// this file is downloaded
{
    "theme_color": "#f69435",
    "background_color": "#f69435",
    "display": "standalone",
    "scope": "/",
    "start_url": "/",
    "name": "Test1",
    "short_name": "Test1",
    "icons": [
        {
            "src": "/icon-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/icon-256x256.png",
            "sizes": "256x256",
            "type": "image/png"
        },
        {
            "src": "/icon-384x384.png",
            "sizes": "384x384",
            "type": "image/png"
        },
        {
            "src": "/icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ]
}


// ================== app/layout.js===================/
// add manifest
export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
    manifest: "/manifest.webmanifest"
  };
  