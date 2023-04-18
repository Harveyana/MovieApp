<template>
    <q-img :src="props.Poster" class="full-width row lt-md" fit="contain" spinner-color="white" style="">
                <div class="absolute-bottom col-4 q-t-xl">
                    <div class="text-h5 ">{{props.Title}} </div>
                    <div class="text-subtitle1" v-if="props.Year">Year: {{parseInt(props.Year)}}</div>
                    <QRating
                        class=""
                        v-model="props.ratingModel"
                        max="5"
                        size="2em"
                        color="yellow"
                        :icon="matStarBorder"
                        :icon-selected="matStar"
                        v-if="props.ratingModel"
                    />
                    <div class="text-subtitle2 q-mb-md" style="" v-if="props.Plot !== 'N/A'">
                        {{props.Plot}}
                    </div>
                    <div class="text-subtitle2 Genre" style="">
                        Genre : {{props.Genre}}
                    </div>
                    <div class="text-subtitle2 Genre" style="">
                        Actors : {{props.Actors}}
                    </div>
                </div>
            </q-img>
</template>
<script setup lang="ts">
import{ matStarBorder, matStarHalf, matStar} from '@quasar/extras/material-icons'
const props = defineProps<{
  Title?: string
  ratingModel?: number
  Poster?: string
  Year?: string
  Plot?: string
  Actors?: string
  Genre?: string
}>()


</script>