<template>
    <QCard class="movie-Suggestion flex row full-width bg-black" style="">
    <div class="text-h4 text-white q-ml-lg ">Movies you may Love </div>
    <q-virtual-scroll
        :items="moviesFound"
        virtual-scroll-horizontal
        class=""
        v-slot="{ item, index }">

        
        <NuxtLink
        :key="index"
        class=""
        :to="`/${item.imdbID}`"
        >

            <SuggestMovie :Title="item.Title" :imdbID="item.imdbID" :Poster="item.Poster" :Year="item.Year" :Genre="item.Genre"/>

        </NuxtLink>
    </q-virtual-scroll>
</QCard>
</template>

<script setup lang="ts">


const ratingModel:Ref<number> = ref(0)
const moviesFound = ref<any>([])
const breakpoint = computed(() => {
      return window.innerWidth
    })
const {getRating} = useReadLocalStorage()
const {getPreviousSearch} = useReadLocalStorage()
const recentRating = computed(() => {
        let rateString:any = localStorage.getItem('Ratings');
        let movieRates = JSON.parse(rateString)
        if(movieRates){
          return movieRates[0]
        }else{
            return null
        }
        
})

 const fetchSuggestion = async()=>{
  const response = getPreviousSearch()
    const movies:any = await $fetch(`http://www.omdbapi.com/?apikey=dc473ecd&s=${response ? response.term: 'moana'}&page=5&type=${recentRating.value ?recentRating.value.Type: 'movie'}`)
    
    console.log(movies)
    moviesFound.value = [...movies.Search.reverse()]
    console.log(moviesFound.value)
 }

  watch(recentRating, (newValue, oldValue) => {
      console.log('recentRating changed!', newValue, oldValue)
      fetchSuggestion()
  })

    const fetchRating = ()=>{
    ratingModel.value += getRating(moviesFound.value)
    }


 onMounted(async ()=>{
   fetchSuggestion()
   fetchRating()
  })

</script>
<style>
.desktopview{
    height: 70vh;
    width:23vw
}
.mobileview{
    height: 50vh;
    width: 50vw;
}
</style>