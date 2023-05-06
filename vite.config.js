import { defineConfig, searchForWorkspaceRoot } from 'vite'

export default defineConfig({
  server: {
    fs: {
      allow: [
        // search up for workspace root
        searchForWorkspaceRoot(process.cwd()),
        '/@fs/Users/mac/node_modules/@quasar/extras/'
      ],
    },
  },
})
