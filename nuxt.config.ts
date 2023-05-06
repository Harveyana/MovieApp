// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
      // ...
    'quasar/fonts',
    'quasar/animations',
    'quasar/icons',
    'quasar/css',
    'quasar/brand' // If config.brand is used
    // ...
     ],
  modules: ['nuxt-quasar-ui'],
  quasar: {
    plugins: [
      'BottomSheet',
      'Dialog',
      'Loading',
      'LoadingBar',
      'Notify',
      'Dark',
    ],
    extras: {
      font: 'roboto-font',
      fontIcons: [
        'material-icons',
        'mdi-v7'
        // 'ionicons-v4',
        // 'eva-icons',
        // 'fontawesome-v6',
        // 'themify',
        // 'line-awesome',
        // 'bootstrap-icons'
      ],
    },
  }
    
})
