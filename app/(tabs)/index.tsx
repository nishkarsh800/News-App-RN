import BreakingNews from '@/components/BreakingNews';
import Categories from '@/components/Categories';
import Header from '@/components/Header';
import NewsList from '@/components/NewsList';
import SearchBar from '@/components/SearchBar';
import { NewsDataType } from '@/types';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {}

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets()
  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([])
  const [news, setNews] = useState<NewsDataType[]>([])


  useEffect(() => {
    getBreakingNews()  // called the breakingNews()
    getNews()
  }, [])
  

  const getBreakingNews = async () => {
    try {
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en&image=1&removeduplicate=1&size=5`
      const response = await axios.get(URL)

      if (response && response.data) {
        setBreakingNews(response.data.results)
      }
    } catch (error) {
      console.error(error)
    }
  };

  const getNews = async () => {
  try {
    const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en&image=1&removeduplicate=1&size=10`
    const response = await axios.get(URL)

    if (response && response.data) {
      setNews(response.data.results)  
    }
  } catch (error) {
    console.error(error)
  }
};


  const onCatChanged = (category: string)=>{
    console.log('Category: ', category);

  };

  return (
    <ScrollView style={[styles.container, { paddingTop: safeTop }]}>
      <Header />
      <SearchBar />
      <BreakingNews newsList={breakingNews}/>
      <Categories onCategoryChanged={onCatChanged}/>
      <NewsList newsList={news}/>
    </ScrollView>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})
