
<template>
    <div class="defaultLayout">
        <QToolbar no-padding class="bg-black q-py-lg">
        <q-icon :name="mdiAbTesting" color="yellow" size="xl"/>
        <QToolbarTitle class="text-yellow">Movies</QToolbarTitle>
        
       </QToolbar>
        <slot />
       
    </div>
    
</template>

<script setup lang="ts">
import { mdiAbTesting,mdiTextSearch } from '@quasar/extras/mdi-v6'
</script>
