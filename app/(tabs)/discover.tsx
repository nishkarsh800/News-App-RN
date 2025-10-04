import CheckBox from '@/components/CheckBox'
import SearchBar from '@/components/SearchBar'
import { Colors } from '@/constants/Colors'
import { Link } from 'expo-router'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import useNewsCategories from '../hooks/useNewsCategories'
import useNewsCountries from '../hooks/useNewsCountry'

type Props = {}

const Page = (props: Props) => {
  const {top: safeTop} = useSafeAreaInsets();

  const {newsCategories, toggleNewsCatogory} = useNewsCategories();
  const {newsCountries, toggleNewsCountry} = useNewsCountries();
  const [searchQuery, setsearchQuery] = useState("")
  const [category, setcategory] = useState("")
  const [country, setcountry] = useState("")

  return (
    <View style={[styles.container,{paddingTop: safeTop + 20}]}>
      <SearchBar 
      withHorizonatalPadding ={false} 
      setSearchQuery={setsearchQuery}/>

      <Text style = {styles.title}>Categories</Text>
      <View style ={styles.listContainer}>
        {newsCategories.map((item) =>(
         <CheckBox 
         key={item.id} 
         label={item.title} 
         checked={item.selected} 
         onPress={()=>{
          toggleNewsCatogory(item.id)
          setcategory(item.slug)
         }}
         />
        ))}
      </View>

      <Text style = {styles.title}>Country</Text>
      <View style ={styles.listContainer}>
        {newsCountries.map((item,index) =>(
         <CheckBox 
         key={index} 
         label={item.name} 
         checked={item.selected} 
         onPress={()=>{
          toggleNewsCountry(index);
          setcountry(item.code)
         }}
         />
        ))}
      </View>

      <Link href={{
        pathname :`/news/search`,
        params: {query: searchQuery, category, country}
      }} asChild>
      <TouchableOpacity style ={styles.searchBtn}>
        <Text style ={styles.searchBtnTxt}>Search</Text>
      </TouchableOpacity>
      </Link>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  title:{
    fontSize: 18,
      fontWeight: "600",
      color: Colors.black,
      marginBottom: 10,
  },
  listContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop : 12,
    marginBottom: 20
  },

  searchBtn:{
    backgroundColor : Colors.tint,
    alignItems:'center',
    padding : 14,
    borderRadius: 10,
    marginVertical : 10
  },
  searchBtnTxt:{
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  }
})