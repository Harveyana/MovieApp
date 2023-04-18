import movieBase from '~/models/movieBase';

interface MyObject {
    [key: string]: string | number;
}

export const useReadLocalStorage = () => {

    const getReviews = (data:MyObject)=>{
        const movieInstance = new movieBase(data)
        const reviews = movieInstance.getReviews()
        return reviews
    }

    const getRating = (data:MyObject)=>{
        const movieInstance = new movieBase(data)
        const rating = movieInstance.getRating()
        return rating
    }

    const getMoviesFromList = (listName:string)=>{
        if(listName !==''){
            const listString:any = localStorage.getItem('movieLists');
            const lists = JSON.parse(listString)
            const movies = lists[listName]
            return movies
        }
        
    }

    const getPreviousSearch = ()=>{
        const String:any = localStorage.getItem('previousSearch');
        if(String){
            const pastSearch = JSON.parse(String)
            return pastSearch
        }else{
            return null
        }
    }

    return{
        getRating,getReviews,getMoviesFromList,getPreviousSearch
    }
        
}