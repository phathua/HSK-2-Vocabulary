import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-cloudflare';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit({
      adapter: adapter(),
      version: {
        pollInterval: 30000
      }
    })
  ],
  server: { port: 3000, host: '0.0.0.0' }
});


