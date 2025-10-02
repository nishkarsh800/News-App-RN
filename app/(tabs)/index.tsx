import BreakingNews from '@/components/BreakingNews';
import Categories from '@/components/Categories';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import NewsList from '@/components/NewsList';
import SearchBar from '@/components/SearchBar';
import { NewsDataType } from '@/types';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {}

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets()
  const [isLoading, setIsLoading] = useState(true);
  const [isNewsLoading, setIsNewsLoading] = useState(true);
  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([])
  const [news, setNews] = useState<NewsDataType[]>([])

  // store debounce timer ref (React Native → number type)
  const debounceTimer = useRef<number | null>(null);

  useEffect(() => {
    getBreakingNews()  // called the breakingNews()
    getNews()
  }, [])
  

  const getBreakingNews = async () => {
    try {
      setIsLoading(true);
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en&image=1&removeduplicate=1&size=5`
      const response = await axios.get(URL);

      if (response && response.data) {
        setBreakingNews(response.data.results);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getNews = async (category: string = '') => {
    try {
      setIsNewsLoading(true);
      let categoryString = ''
      if (category.length !== 0) {
        categoryString = `&category=${category}`
      }
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en&image=1&removeduplicate=1&size=10${categoryString}`
      const response = await axios.get(URL)

      if (response && response.data) {
        setNews(response.data.results)  
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsNewsLoading(false);
    }
  };

  const onCatChanged = (category: string) => {
    // clear old timer if user taps again quickly
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // wait 500ms before firing request
    debounceTimer.current = setTimeout(() => {
      console.log('Category: ', category);
      setNews([]);
      getNews(category);
    }, 500) as unknown as number; // ensure correct typing
  };

  return (
    <ScrollView style={[styles.container, { paddingTop: safeTop }]}>
      <Header />
      <SearchBar />
      {isLoading?(
        <Loading size={'large'}/>
      ):(
        <BreakingNews newsList={breakingNews}/>
      )}
      <Categories onCategoryChanged={onCatChanged}/>
      {isNewsLoading ? (
        <Loading size={'large'}/>
      ) : (
        <NewsList newsList={news}/>
      )}
    </ScrollView>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})
