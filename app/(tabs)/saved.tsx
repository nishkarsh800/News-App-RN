import Loading from '@/components/Loading'
import NewsItem from '@/components/NewsItem'
import { NewsDataType } from '@/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'
import axios from 'axios'
import { Link, Stack } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type Props = {}

const Page = (props: Props) => {
  const [bookmarkNews, setBookmarkNews] = useState<NewsDataType[]>([])
  const [isLoading, setisLoading] = useState(true)
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchBookmark()
  }, [isFocused]);
  
  const fetchBookmark = async () => {
    setisLoading(true);
    try {
      const token = await AsyncStorage.getItem('bookmark')
      const res = token ? JSON.parse(token) : null

      if (Array.isArray(res) && res.length > 0) {
        const queryString = res.join(',')
        const url = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${queryString}`
        try {
          const response = await axios.get(url)
          setBookmarkNews(response.data?.results ?? [])
        } catch (error) {
          console.error(error)
          setBookmarkNews([])
        }
      } else {
        setBookmarkNews([])
      }
    } catch (e) {
      console.error(e)
      setBookmarkNews([])
    } finally {
      setisLoading(false)
    }
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
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No saved articles yet</Text>
                <Text style={styles.emptySubText}>Save articles to see them here.</Text>
              </View>
            }
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
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6
  },
  emptySubText: {
    fontSize: 14,
    color: '#777'
  }
})