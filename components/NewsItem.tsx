import { NewsDataType } from '@/types'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

type Props = {
  item: NewsDataType
}

const NewsItem = ({ item }: Props) => {
  return (
    <View style={styles.itemConatiner}>
      <Image source={{ uri: item.image_url }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemCategory}>{item.category}</Text>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <View style={styles.itemSourceInfo}>
          <Image source={{ uri: item.source_icon }} style={styles.itemSourceImage} />
          <Text style={styles.itemSourceName}>{item.source_name}</Text>
        </View>
      </View>
    </View>
  )
}

export default NewsItem

const styles = StyleSheet.create({
  itemConatiner: {
    flexDirection: 'row',
    padding: 10,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 10,
  },
  itemCategory: {
    fontSize: 12,
    color: 'gray',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemSourceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  itemSourceImage: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  itemSourceName: {
    fontSize: 12,
    color: 'gray',
  },
})
