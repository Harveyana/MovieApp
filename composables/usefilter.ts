// import { useStorage } from '@vueuse/core'
interface MyObject {
    [key: string]: string;
}

export const useFilter = ()=>{
    
  const filter = async (dataArray:MyObject[], filterValue:string): Promise<MyObject[]> => {
    const promises = dataArray.map((item) => fetch(`http://www.omdbapi.com/?i=${item.imdbID}&apikey=dc473ecd`))
    const responses = await Promise.all(promises)
    const movieData = await Promise.all(responses.map(response => response.json()))
    const filteredArray = dataArray.filter((item, index) => {
      return movieData[index].Genre.includes(filterValue)
    })
    // console.log(filteredArray)
    return filteredArray
  }

  return {
    filter
}
}