import movieBase from '~/models/movieBase';

    interface MyObject {
        [key: string]: string | number;
    }

    const resave =(name:string, dataArray:MyObject[])=>{
        localStorage.setItem(name, JSON.stringify(dataArray));
        console.log(dataArray)
        return dataArray
    }

export const useWriteLocalStorage = () => {
    const saveRating = (data:MyObject) => {
        if (data.rating !== '' && data.Id && data.Year && data.Type){

            let ratingString = localStorage.getItem('Ratings')
            if (ratingString){
                let ratingsArray: MyObject[] = JSON.parse(ratingString) as MyObject[]
                let existingRateIndex: number = ratingsArray.findIndex(item => item.Id === data.Id);
                if(existingRateIndex === -1){
                    ratingsArray.unshift(data);
                    // Save the updated array to local storage
                    resave('Ratings', ratingsArray)
                }else{
                    ratingsArray[existingRateIndex].rating = data.rating
                    resave('Ratings', ratingsArray)
                }
            }else{
                let ratingsArray:MyObject[] = []
                ratingsArray.unshift(data);
                // Save the updated array to local storage
                resave('Ratings', ratingsArray)
                
            }

        }
        
        
    }

    const saveReview = (data:MyObject) => {

        if (data.Name !== '' && data.body !== '' && data.Id){

            let reviewString = localStorage.getItem('Reviews')
            if (reviewString){
                let reviewsArray: MyObject[] = JSON.parse(reviewString) as MyObject[]
                reviewsArray.unshift(data);
                resave('Reviews', reviewsArray)
                
            }else{
                let reviewsArray:MyObject[] = []
                reviewsArray.unshift(data);
                resave('Reviews', reviewsArray)
            }
        }
        
    }
    
    const addNewList =(newListName:string)=>{
        const listString = localStorage.getItem('movieLists');
        if (listString) {
            const lists:any = JSON.parse(listString);
            if (lists[newListName]) {
             return false
            }else{
              lists[newListName] = []
              localStorage.setItem('movieLists', JSON.stringify(lists));
              return true
            }
            
        }else{
            let lists:any = {};
           lists[newListName] = []
           localStorage.setItem('movieLists', JSON.stringify(lists));
           return true
        }
    }

    const addMovieToList = (data:MyObject, listName:string)=>{
        const movieInstance = new movieBase(data)
        const response = movieInstance.addToList(listName)
        return response
    }

    const addPreviousSearch = (data:MyObject)=>{
        const String:any = localStorage.getItem('previousSearch');
        localStorage.setItem('previousSearch', JSON.stringify(data));
        return true
    }


    return {
        saveRating,saveReview,addMovieToList,addNewList,addPreviousSearch
    }
}