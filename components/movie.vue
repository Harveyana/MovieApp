<template>
    <NuxtLink class="removeLinkStyle movies-card bg-black q-pa-md col-xs-12 col-sm-6 col-md-3 col-lg-3 flex row items-center justify-center" flat bordered :to="`/${props.imdbID}`">
                    <!-- <img :src="props.Poster" spinner-color="white"> -->

                    <div align="center" class="" style="height: 100%;width:100%;">

                        <q-img class="rounded-borders" :src="props.Poster" placeholder-src="/right-arrow.png" :ratio="1" style=":100%;height:100%;">
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

                    </div>
    </NuxtLink>

</template>

<script setup lang="ts">
import{ matStarBorder, matStarHalf, matStar} from '@quasar/extras/material-icons'
const props = defineProps<{
  Title: string
  imdbID: string
  Poster: string
  Year: number
  Rating?: number
}>()

const ratingModel = ref<number>(0)
const {getRating} = useReadLocalStorage()

    const fetchRating = ()=>{
        ratingModel.value += getRating(props)
    }

  onMounted(async ()=>{
   fetchRating()
})

</script>
<style>
.removeLinkStyle{
    text-decoration: none;
}
.desktopview{
    height: 70vh;
    width:23vw
}
.mobileview{
    height: 50vh;
    width: 50vw;
}
</style>