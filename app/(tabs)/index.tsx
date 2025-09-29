import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Props = {}

const Page = (props: Props) => {
  const{top: safeTop} = useSafeAreaInsets();
  return (
    <View style={[styles.container, {paddingTop: safeTop}]}>
      <Header/>
      <SearchBar/>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})