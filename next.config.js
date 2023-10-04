/** @type {import('next').NextConfig} */
// next.config.js
module.exports = {
    async rewrites() {
      return [
        {
          source: '/custom-route',
          destination: '/dashboard', // Map /custom-route to /dashboard component
        },
        // Add more custom routes as needed
      ];
    },
  };
  