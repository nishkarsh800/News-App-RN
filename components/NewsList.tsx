import { Colors } from '@/constants/Colors'
import { NewsDataType } from '@/types'
import { Link } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type Props = {
    newsList: Array<NewsDataType>
}

const NewsList = ({ newsList }: Props) => {
    return (
        <View
            style={styles.container}>
            {newsList.map((item, index) => (
               <Link href={`/news/${item.article_id}`} asChild key={index}>
                    <TouchableOpacity>
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
                    </TouchableOpacity>
                </Link>

            ))}
        </View>
    )
}

export default NewsList

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginBottom: 50

    },
    itemConatiner: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        flex: 1,
        gap: 10
    },
    itemImage: {
        width: 90,
        height: 100,
        borderRadius: 20,
        marginRight: 10
    },
    itemInfo: {
        flex: 1,
        gap: 10,
        justifyContent: 'space-between',
    },
    itemCategory: {
        fontSize: 12,
        color: Colors.darkGrey,
        textTransform: 'capitalize',

    },
    itemTitle: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.black
    },
    itemSourceInfo: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    itemSourceImage: {
        width: 20,
        height: 20,
        borderRadius: 20,
    },
    itemSourceName: {
        fontSize: 10,
        fontWeight: '400',
        color: Colors.darkGrey
    }
})