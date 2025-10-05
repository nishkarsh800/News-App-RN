import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

type Props = {
  withHorizonatalPadding : boolean
  setSearchQuery : Function
  onSubmit?: (text: string) => void
}

const SearchBar = ({withHorizonatalPadding, setSearchQuery, onSubmit}: Props) => {
  return (
    <View style={[styles.container,withHorizonatalPadding && {paddingHorizontal: 20}]}> 
     <View style ={styles.searchBar}>
        <Ionicons name='search-outline' size={20} color={Colors.lightGrey}/>
        <TextInput 
        placeholder='Search here' 
        placeholderTextColor={Colors.lightGrey}
        style={styles.searchText}
        autoCapitalize='none'
        onChangeText={query => setSearchQuery(query)}
        returnKeyType='search'
        onSubmitEditing={(e) => {
          const text = e.nativeEvent.text ?? ''
          if (onSubmit) {
            onSubmit(text)
          }
        }}
        />
     </View>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  container: {
    marginBottom : 20 
  },

 searchBar: {
  backgroundColor: '#E4E4E4',
  paddingHorizontal: 10,
  paddingVertical: 6,
  borderRadius: 10,
  flexDirection: 'row',
  alignItems: 'center', 
  gap: 10,
},

  searchText :{
    fontSize : 14,
    flex: 1,
    color : Colors.lightGrey
  }
})
