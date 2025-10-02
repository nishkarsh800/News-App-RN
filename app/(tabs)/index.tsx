import BreakingNews from '@/components/BreakingNews';
import Categories from '@/components/Categories';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
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
  const [isLoading, setIsLoading] = useState(true);
  const [isNewsLoading, setIsNewsLoading] = useState(true);
  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([])
  const [news, setNews] = useState<NewsDataType[]>([])


  useEffect(() => {
    getBreakingNews()  // called the breakingNews()
    getNews()
  }, [])
  

  const getBreakingNews = async () => {
  try {
    setIsLoading(true); // start loading
    const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en&image=1&removeduplicate=1&size=5`
    const response = await axios.get(URL);

    if (response && response.data) {
      setBreakingNews(response.data.results);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false); // stop loading
  }
};


  const getNews = async () => {
  try {
    setIsNewsLoading(true); // start loading
    const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en&image=1&removeduplicate=1&size=10`
    const response = await axios.get(URL)

    if (response && response.data) {
      setNews(response.data.results)  
    }
  } catch (error) {
    console.error(error)
  } finally {
    setIsNewsLoading(false); // stop loading
  }
};


  const onCatChanged = (category: string)=>{
    console.log('Category: ', category);

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
