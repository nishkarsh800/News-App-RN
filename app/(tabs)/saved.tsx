import Loading from '@/components/Loading'
import NewsItem from '@/components/NewsItem'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'
import axios from 'axios'
import { Link, Stack } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'

type Props = {}

const Page = (props: Props) => {
  const [bookmarkNews, setBookmarkNews] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchBookmark()
  }, [isFocused]);
  
  const fetchBookmark = async() => {
    await AsyncStorage.getItem('bookmark').then(async(token) => {
      const res = JSON.parse(token);
      setisLoading(true);
      if(res){
        console.log('Bookmark res: ', res);
        let query_string = res.join(',');
        console.log('Query string: ',query_string);

        const response = await axios.get(`https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${query_string}`)
        setBookmarkNews(response.data.results);
        setisLoading(false);
      }else{
        setBookmarkNews([])
        setisLoading(false)
      }
    })
  }
  return (
    <>
    <Stack.Screen options={{
      headerShown:  true,

    }} />
    <View style={styles.container}>
      {isLoading ?(
        <Loading size={'large'}/>
      ):(
        <FlatList
            data={bookmarkNews}
            keyExtractor={(_, index) => `list_items${index}`}
            showsVerticalScrollIndicator={false}
            renderItem={({ index,item }) => (
                <Link href={`/news/${item.article_id}`} asChild key={index}>
                    <TouchableOpacity>
                       <NewsItem item={item}/> 
                    </TouchableOpacity>
                </Link>
            )}
          />
      )}
    </View>
    </>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20
  },
})