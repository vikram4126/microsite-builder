import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

const fixPathsForBuildPlugin = () => {
  return {
    name: 'fix-paths-for-build',
    enforce: 'pre' as const,
    apply: 'build' as const,
    transform(code: string, id: string) {
      if ((id.includes('/src/') || id.includes('\\src\\')) && (id.endsWith('.ts') || id.endsWith('.tsx'))) {
        return code.replace(/(['"])\/(images|videos|thumbs|team-member|background)\//g, '$1./$2/');
      }
      return null;
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), fixPathsForBuildPlugin(), viteSingleFile()],
  server: {
    watch: {
      ignored: ['**/db.json'],
    },
  },
})

