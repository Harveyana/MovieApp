interface MyObject {
    [key: string]: string | number;
}

export const useSort = ()=>{
    
  const sort = async (dataArray:MyObject[], sortValue:string): Promise<MyObject[]> => {
    if(sortValue == 'Rating'){
        const promises = dataArray.map((item) => fetch(`http://www.omdbapi.com/?i=${item.imdbID}&apikey=dc473ecd`))
        console.log('promises',promises)
        const responses = await Promise.all(promises)
        console.log('responses',responses)
        const movieData = await Promise.all(responses.map(response => response.json()))
        console.log('movieData',movieData)
        const sortedArray = movieData.sort((a, b) => (a[sortValue] > b[sortValue]) ? 1 : -1);
        return sortedArray
    
    }
       const sortedArray = dataArray.sort((a, b) => (a[sortValue] > b[sortValue]) ? 1 : -1);
       return sortedArray
    }
    
  return {
    sort
}
}