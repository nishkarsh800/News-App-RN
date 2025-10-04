import Loading from '@/components/Loading'
import NewsItem from '@/components/NewsItem'
import { NewsDataType } from '@/types'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import { Link, router, Stack, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'

type Props = {}

const Page = (props: Props) => {
  const { query, category, country } = useLocalSearchParams<{
    query?: string
    category?: string
    country?: string
  }>()

  const [news, setNews] = useState<NewsDataType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const getNews = async () => {
    try {
      setIsLoading(true)
      let categoryString = ''
      let countryString = ''
      let queryString = ''
      if (category) {
        categoryString = `&category=${category}`
      }
      if (country) {
        countryString = `&country=${country}`
      }
      if (query) {
        queryString = `&q=${query}` // q -> to search in all fields
      }
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en&image=1&removeduplicate=1&size=10${categoryString}${countryString}${queryString}`
      const response = await axios.get(URL)

      if (response && response.data) {
        setNews(response.data.results)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getNews()
  }, [query, category, country])

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={22} />
            </TouchableOpacity>
          ),
          title: 'Search',
        }}
      />
      <View style={styles.container}>
        {isLoading ? (
          <Loading size={'large'} />
        ) : (
          <FlatList
            data={news}
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
    marginVertical: 20,
    marginHorizontal: 20

  },
})
