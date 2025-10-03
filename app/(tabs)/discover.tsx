import CheckBox from '@/components/CheckBox'
import SearchBar from '@/components/SearchBar'
import newsCategoryList from '@/constants/Categories'
import { Colors } from '@/constants/Colors'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Props = {}

const Page = (props: Props) => {
  const {top: safeTop} = useSafeAreaInsets()

  return (
    <View style={[styles.container,{paddingTop: safeTop + 20}]}>
      <SearchBar withHorizonatalPadding ={false}/>
      <Text style = {styles.title}>Categories</Text>
      <View style ={styles.listContainer}>
        {newsCategoryList.map((item) =>(
         <CheckBox key={item.id} label={item.title} checked={item.selected} onPress={()=>{}}
         />
        ))}
      </View>
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
  }
})