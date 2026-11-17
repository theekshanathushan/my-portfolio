import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables for Node.js dev server without exposing secrets to client bundle
  const env = loadEnv(mode, process.cwd(), '');
  if (env.GITHUB_TOKEN && !process.env.GITHUB_TOKEN) {
    process.env.GITHUB_TOKEN = env.GITHUB_TOKEN;
  }
  if (env.GITHUB_USERNAME && !process.env.GITHUB_USERNAME) {
    process.env.GITHUB_USERNAME = env.GITHUB_USERNAME;
  }

  return {
    plugins: [
      react(),
      {
        name: 'api-activity-dev-middleware',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            const url = new URL(req.url, 'http://localhost');
            if (url.pathname === '/api/activity') {
              try {
                const { default: handler } = await import('./api/activity.js');
                // Polyfill Vercel/Express-like helpers on standard Node HTTP response
                res.status = (code) => {
                  res.statusCode = code;
                  return res;
                };
                res.json = (data) => {
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(data));
                };
                return await handler(req, res);
              } catch (err) {
                console.error('[vite-dev] Activity API error:', err);
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                return;
              }
            }
            next();
          });
        }
      }
    ],
    base: '/',
  };
});
