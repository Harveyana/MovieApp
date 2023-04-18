<template>
    <div class="container bg-black flex column justify-center items-center overflow-hidden full-width" v-if="movie">
        <QCard class="Image col-12 full-width"  style="">
            <q-img :src="movie.Poster" class="full-width row gt-sm" fit="contain" :ratio="16/9" spinner-color="white" style="">
                <div class="absolute-bottom col-4 q-t-xl">
                    <div class="text-h4 ">{{movie.Title}} </div>
                    <div class="text-h6">Year: {{movie.Year}}</div>
                    <QRating
                        class="q-mx-sm"
                        v-model="ratingModel"
                        max="5"
                        size="2em"
                        color="yellow"
                        :icon="matStarBorder"
                        :icon-selected="matStar"
                    />
                    <div class="text-subtitle2 q-mb-md" style="width: 500px;" v-if="movie.Plot !== 'N/A'">
                        {{movie.Plot}}
                    </div>
                    <div class="text-subtitle2 Genre" style="">
                        Genre : {{movie.Genre}}
                    </div>
                    <div class="text-subtitle2 Genre" style="">
                        Actors : {{movie.Actors}}
                    </div>
                </div>
            </q-img>
            <MobileView
              :Genre="movie.Genre"
              :Actors="movie.Actors"
              :Year="movie.Year"
              :ratingModel="ratingModel" 
              :Title="movie.Title"
              :Plot="movie.Plot"
              :Poster="movie.Poster" v-if="movie"/>
        </QCard>
        <QCard class="Reviews-and-Ratings bg-black col-12 full-width flex row q-gutter-xs-none q-gutter-md-md">
            <QCardSection class="Update-Rating-Reviews flex column col-xs-12 col-md-4">
                <div class="h1 text-white q-mb-sm" style="font-size:22px;">Previous Reviews</div>
                <QCard class="single-Review bg-black" style="" v-for="review in allReviews" :key="review.Id">
                    <div class="Reviewer-Name h1 text-white" style="font-size:17px;">{{review.Name}}-</div>
                    <div class="Review h3 text-white" style="font-size:16px;"><p>{{review.body}}</p></div>
                </QCard>
                
            </QCardSection>
            <q-separator vertical dark size="5px" />
            <QCardSection class="Previous-Reviews col-xs-12 col-md-6">
                <q-card class="addMovieList row q-pl-lg">
                    <QBtn label="new List" :icon="matAdd" class="q-my-md" size="10px" color="yellow" text-color="black" @click="card = true"/>
                    <q-select outlined dense clearable color="black" label="Add to Movie List" class="q-my-md q-ml-md" v-model="ListValue" :options="movieLists" style="width: 40%;" @update:model-value="addToList()"/>
                </q-card>
                <div class="h1 text-white q-my-sm" style="font-size:27px;">Please Rate Movie</div>
                <QRating
                    class=" q-my-md"
                    v-model="ratingModel"
                    max="5"
                    size="2.7em"
                    color="yellow"
                    :icon="matStarBorder"
                    :icon-selected="matStar"
                    no-dimming
                />
                <q-input class="q-my-md" color="black" type="number" dense standout dark v-model="ratingModel" label="Enter Rating From 1-5" style="width:150px;"/>
                <QBtn label="Submit rating" type="submit" class="q-ma-md" size="15px" color="black" text-color="yellow" @click="handleRating()"/>
                <q-separator dark size="2px" />
                <div class="h1 text-white q-my-sm" style="font-size:27px;">Add your Review</div>
                <q-form @submit="handleReviews()">
                    <q-input class="q-my-md" color="black" standout dark v-model="reviewName" label="Enter Name" />
                    <q-input standout dark color="black" type="textarea" v-model="reviewBody" label="Enter Review" />
                    <QBtn label="Submit review" type="submit" class="q-ma-md" size="15px" color="black" text-color="yellow"/>
                </q-form>
                


            </QCardSection>

        </QCard>
        
        <q-dialog v-model="card">
            <q-card class="my-card q-pa-lg">
                
                <q-input v-model="newList" label="Enter List Name" color="black" />

                <q-card-section class="">
                <div class="text-subtitle1">
                    Create New Movie List
                </div>
                </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                <q-btn v-close-popup flat class="bg-yellow" label="Create List" label-color="yellow" @click="addMovieList()"/>
                </q-card-actions>
            </q-card>
    </q-dialog>
            
        <SuggestMovies/>
    </div>
</template>
<script setup lang="ts">
import{ matStarBorder,matStar, matAdd,matCheck } from '@quasar/extras/material-icons'

interface movieObject {
    [key: string]: string;
  }


const reviewName = ref<string>('')
const allReviews = ref<movieObject[]>([]);
const reviewBody = ref<string>('')
const ratingModel = ref<number>(0)
const movieLists = ref<string[]>([])
const ListValue = ref<string>('')
const card = ref<boolean>(false)
const newList = ref<string>('')
const movie = ref<movieObject>({})
const route = useRoute()
const {saveRating, saveReview, addMovieToList, addNewList} = useWriteLocalStorage()
const {getRating, getReviews} = useReadLocalStorage()

const movieInstance:any = ref(null)
const $q = useQuasar()

  interface MyObject {
  [key: string]: string[];
  }


    const notify = (message:string, icon?:string)=>{
        $q.notify({
            color: 'yellow',
            textColor: 'black',
            icon: icon || matCheck,
            message: message
        })
    }
    const handleRating = ()=>{
        saveRating({rating:ratingModel.value,Id:movie.value.imdbID,Year:movie.value.Year,Type:movie.value.Type,Title:movie.value.Title})
        notify('Movie Rated Successfully')
     }

      const handleReviews = ()=>{
        saveReview({Id:movie.value.imdbID,Name:reviewName.value,body:reviewBody.value})
        notify('Movie Review Submitted')
        allReviews.value.unshift({Id:movie.value.imdbID,Name:reviewName.value,body:reviewBody.value})
        reviewName.value = ''
        reviewBody.value = ''
      }


    const addMovieList =()=>{

        const response = addNewList(newList.value)

        if (response == true){
            notify(`New List Created`)
            movieLists.value.unshift(newList.value)
            newList.value = ''
        } else{
            notify(`List already exists`)
            newList.value = ''
        }
    }


    const addToList = ()=>{
        if(ListValue.value){

            const response = addMovieToList(movie.value, ListValue.value)
            if(response == true){
                notify(`Movie added to ${ListValue.value}`)
            } else{
                notify(`Movie already in List`)
            }

        }
        
        
    }

    const fetchMovie = async()=>{
        const movieFound:object = await $fetch(`http://www.omdbapi.com/?i=${route.params.id}&apikey=dc473ecd`)
        console.log(movie)
        Object.assign(movie.value, movieFound);
        console.log(movie.value)
        getReviewsAndRating()
    }

    const getReviewsAndRating = ()=>{

        ratingModel.value += getRating(movie.value)
        allReviews.value = [...getReviews(movie.value)];
        getMovieLists()

    }
    
    const getMovieLists = () => {
        if(movie.value){
            const listString = localStorage.getItem('movieLists');
         if (listString) {
            let lists: MyObject = JSON.parse(listString) as MyObject;
            let alllists = Object.getOwnPropertyNames(lists)
            movieLists.value = [...alllists]
        }
        }
        
    }

  onMounted(async ()=>{
   fetchMovie()
  })

</script>