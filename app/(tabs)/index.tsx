import BreakingNews from '@/components/BreakingNews';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import { NewsDataType } from '@/types';
import axios from 'axios';
import React, { useEffect, useState } from 'react'; // ✅ import useState
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {}

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets()
  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([])

  useEffect(() => {
    getBreakingNews()  // called the breakingNews()
  }, [])
  

  const getBreakingNews = async () => {
    try {
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&country=in&language=en&image=1&removeduplicate=1&size=5`
      const response = await axios.get(URL)

      if (response && response.data) {
        setBreakingNews(response.data.results)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={[styles.container, { paddingTop: safeTop }]}>
      <Header />
      <SearchBar />
      <BreakingNews newsList={breakingNews}/>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})
