<template>
    <q-img class="q-ma-md rounded-borders col-3" :src="props.Poster" :ratio="1" :class="{mobileview: breakpoint < 760, desktopview: breakpoint > 760}">
                <div class="absolute-bottom">
                    <div class="text-h6 ">{{props.Title}}</div>
                    <div class="text-subtitle1">Year: {{props.Year}}</div>
                    <QRating
                    class=""
                    readonly
                    v-model="ratingModel"
                    max="5"
                    size="1.7em"
                    color="yellow"
                    :icon="matStarBorder"
                    :icon-selected="matStar"
                    no-dimming
                />
                </div>
            
            </q-Img>    
</template>
<script setup lang="ts">
import{ matStarBorder, matStarHalf, matStar} from '@quasar/extras/material-icons'
const ratingModel:Ref<number> = ref(0)
const {getRating} = useReadLocalStorage()

const props = defineProps<{
  Title: string
  imdbID: string
  Poster: string
  Year: number
  Genre: string
  Rating?: number
}>()

const breakpoint = computed(() => {
    return window.innerWidth
})

const fetchRating = ()=>{
    ratingModel.value += getRating(props)
}

onMounted(async ()=>{
   fetchRating()
})
</script>