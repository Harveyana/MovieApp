type item = {
    [key: string]: string
}

export default class movieBase{
    
    imdbID: string
    Title: string
    Year: number
    Genre: string
    Actors: string
    Poster: string

    constructor(initData:{imdbID: string,Title: string,Year: number,Genre: string,Actors: string,Poster: string}){
        this.imdbID = initData && initData.imdbID
        this.Title = initData && initData.Title
        this.Year = initData && initData.Year
        this.Genre = initData && initData.Genre
        this.Actors = initData && initData.Actors
        this.Poster = initData && initData.Poster
    }

    getRating(){
        const allRatingString = localStorage.getItem('Ratings');
        if (allRatingString){
            let allRatings = JSON.parse(allRatingString)
            let existingRateIndex: number = allRatings.findIndex((item:item) => item.Id === this.imdbID);
            if(existingRateIndex === -1){
                return 0
            }else{
                return allRatings[existingRateIndex].rating
            }
        }else{
            return 0
        }
    }

    getReviews(){
        const allReviewString = localStorage.getItem('Reviews')
        if(allReviewString){
            let allReviews = JSON.parse(allReviewString)
            let reviews = allReviews.filter((item:item)=>item.Id === this.imdbID)
            return reviews
        }
        else{
            return []
        }
    }

    addToList(list:string){
        if(list !== ''){
            const listString:any = localStorage.getItem('movieLists');
            // if (listString) {
                const lists = JSON.parse(listString)
                const alreadyExists = lists[list].some((movie:item)=> movie.imdbID === this.imdbID)
                if(alreadyExists){
                    return false
                }else{
                  lists[list].push(this)
                  localStorage.setItem('movieLists', JSON.stringify(lists))
                  return true
                }
                
            // }else{
            //     return false
            // }
        }
    }


}