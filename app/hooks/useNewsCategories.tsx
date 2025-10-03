import newsCategoryList from "@/constants/Categories"
import { useCallback, useState } from "react"

const useNewsCategories = () =>{
    const [newsCategories, setNewsCategories] = useState(newsCategoryList)

    const toggleNewsCatogory = useCallback((id: number)=> {
        setNewsCategories((previousNewsCategories) =>{
            return previousNewsCategories.map((item) =>{
                if(item.id === id){
                    return{
                        ...item,
                        selected: !item.selected                   
                    }
                }
                return item;
            })
        })
    },[])

    return{
        newsCategories,
        toggleNewsCatogory
    }
}
export default useNewsCategories