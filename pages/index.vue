<template>
    <div class="bg-black block fit container overflow-hidden" style="">
        <QCard class="row no-wrap-md wrap-xs wrap-sm justify-around items-center bg-yellow q-py-md" style="">

            <div class=" Filter flex row items-center justify-around no-wrap q-mx-md col-2" style="">
              <q-select filled dense clearable color="black" label="Filter By" class="q-mx-lg" v-model="filterValue" :options="['Action','Drama','Comedy']" style="width: 100%;" @update:model-value="filterMovies()" @clear="reset()"/>
            </div>

            <div class="Search flex row items-center justify-around no-wrap q-mx-md col-md-4 col-6">
                <QInput class="" clearable dense color="black" filled label-color="black" v-model="searchValue" label="Search Movies" style="width:100%;font-size: medium;"  v-on:keypress.enter="search()">
                    
                    <template v-slot:append>
                        <q-btn round dense flat :icon="mdiSend" class="search-button" @click="newSearch = true,search()"/>
                    </template>
                </QInput>
            </div>

           <div class="Sort row items-center justify-around no-wrap q-mx-md col-2">
                <q-select outlined dense clearable color="black" label="Sort By" class="" v-model="sortValue" :options="['Title','Rating','Year']" style="width: 100%;" @update:model-value="sortMovies()" @clear="filterValue ? result=[...filteredMovies]: reset()"/>
           </div>
           <div class="MovieList row items-center justify-around col-2 q-px-sm q-mx-lg">
                <q-select borderless dense clearable color="black" label="Movie Lists" class="" v-model="listValue" :options="favouritesList" style="width: 100%;font-size: x-small;" @update:model-value="fetchFromList()" @clear="onMovieList = false,result = [],result = [...defaultMovies]"/>
           </div>

            
            <QSpace/>
            
        </QCard>

        <div class="movies-container flex row items-center justify-start q-mt-lg">
            <Movie v-for="movie in result ? result : defaultMovies " :key="movie.imdbID" :imdbID="movie.imdbID" :Title="movie.Title" :Poster="movie.Poster" :Year="parseInt(movie.Year)" v-if="result || defaultMovies"/>
            <QCard class="No-Movies-Found-Container bg-black q-pa-xs window-height flex row items-center justify-center " v-else>
                <div class="h1 text-white q-my-sm" style="font-size:52px;">Movie Not Found</div>
                <q-icon :name="matNoAccounts" color="white" size="52px" class="cursor-pointer" />
            </QCard>
        </div>

        <QCard class="More-movies-loading-Container bg-black q-pa-xs q-py-lg flex row items-center justify-center q-gutter-y-md " v-if="moviesFound && searchValue">
                <QBtn label="Previous" class="q-mx-lg" size="15px" color="white" text-color="black" :icon="mdiArrowLeft" @click="onPreviousPage()"/>
                <QBtn label="Next" class="q-mx-lg" size="15px" color="yellow" text-color="black" :icon="mdiArrowRight" @click="onNextPage()"/>
        </QCard>

        <SuggestMovies/>

    </div>


</template>
<script setup lang="ts">
import { mdiArrowLeftBoldCircle,mdiArrowLeft,mdiArrowRight,mdiSend } from '@quasar/extras/mdi-v6'
import{ matNoAccounts, matDownload} from '@quasar/extras/material-icons'

definePageMeta({
  layout: "custom"
});
 
interface movie {
    [key: string]: string;
}

// interface MyObject {
//   [key: string]: string[];
//   }
const allMovies = ref<movie[]>([])
const listValue = ref<string>('')
const searchValue:Ref<string|number> = ref('')
const filterValue:Ref<string> = ref('')
const sortValue:Ref<string> = ref('')
const currentPage:Ref<number> = ref(1)
const result:Ref<movie[]> = ref([])
const favouritesList:Ref<string[]> = ref([]);
const filteredMovies:Ref<movie[]> = ref([])
const defaultMovies:Ref<movie[]> = ref([])
const onMovieList = ref<boolean>(false)
const moviesFound:Ref<boolean> =ref(true)
const newSearch =ref<boolean>(true)

const {filter} = useFilter()
const {sort} = useSort()

const {getMoviesFromList, getPreviousSearch} = useReadLocalStorage()
const {addPreviousSearch} = useWriteLocalStorage()



const fetchFromList = ()=>{
    if(listValue.value){

        const listMovies = getMoviesFromList(listValue.value)
        console.log(listMovies)
        if(onMovieList.value){
        return result.value = [...listMovies]
        }
        onMovieList.value = true
        defaultMovies.value = [...result.value]
        result.value = []
        result.value = [...listMovies]
    }
    
}

const sortMovies = async()=>{
    const sorted = await sort(result.value,sortValue.value)
    result.value = [...sorted]
    console.log('sorted')
}

const filterMovies = async()=>{
    if(filterValue.value){
        console.log('filter started')
    const filtered = await filter(defaultMovies.value,filterValue.value)
    filteredMovies.value = [...filtered]
    result.value = [...filtered]
    console.log('filtered')
    }
    
}

const reset = ()=>{
    result.value = [...defaultMovies.value]
    console.log('resetted',result.value)
    defaultMovies.value = [...allMovies.value]
    allMovies.value = [...result.value]
}

const search = async()=>{
    addPreviousSearch({ term: searchValue.value, page: currentPage.value })
   const movies:any = await $fetch(`http://www.omdbapi.com/?page=${currentPage.value}&apikey=dc473ecd&s=${searchValue.value}`)
   if(newSearch.value){
    currentPage.value = 1
    defaultMovies.value = [...movies.Search]
    allMovies.value = [...movies.Search]
   return result.value = [...movies.Search]
   }
   result.value = [...movies.Search]
   defaultMovies.value = [...movies.Search]
   allMovies.value = [...movies.Search]
}

const fetchMovies = async()=>{
    const response = getPreviousSearch()
   const movies:any = await $fetch(`http://www.omdbapi.com/?page=${response ? response.page: 1}&apikey=dc473ecd&s=${response ? response.term: 'john wick'}`)
   console.log(movies.Search)
   result.value = [...movies.Search]
   defaultMovies.value = [...movies.Search]
   allMovies.value = [...movies.Search]
}

const fetchFavourites = ()=>{
    const listString = localStorage.getItem('movieLists');
    if (listString) {
            let lists: movie[] = JSON.parse(listString) as movie[];
            const listArray = Object.getOwnPropertyNames(lists)
            favouritesList.value.push(...listArray)
        }
}

const onPreviousPage = ()=>{
    
    newSearch.value = false
    currentPage.value--
    if(currentPage.value == 0){
        currentPage.value = 1
    }
    console.log(currentPage.value)
    search()
}

const onNextPage = ()=>{
    
    newSearch.value = false
    currentPage.value++
    console.log(currentPage.value)
    search()
}




onMounted(async ()=>{
   fetchMovies()
   fetchFavourites()
})



</script>