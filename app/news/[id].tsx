import Loading from '@/components/Loading'
import { Colors } from '@/constants/Colors'
import { NewsDataType } from '@/types'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import Moment from "moment"
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type Props = {}

const NewsDetails = (props: Props) => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [isLoading, setIsLoading] = useState(true);
    const [news, setNews] = useState<NewsDataType[]>([])

    useEffect(() => {
        getNews();
    }, [])
    

    const getNews = async () => {
        try {
            setIsLoading(true);
            const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${id}`
            const response = await axios.get(URL);

            if (response && response.data) {
                setNews(response.data.results);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Stack.Screen options={{
                headerLeft: () => (
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name='arrow-back' size={22} />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity onPress={() => { }}>
                        <Ionicons name='heart-outline' size={22} />
                    </TouchableOpacity>
                ),
                title: ''

            }} />
            {isLoading ? (
                <Loading size={'large'} />
            ) : (
                <ScrollView contentContainerStyle ={styles.contentcontainer} style={styles.container}>
                    <Text style ={styles.titletxt}>{news[0].title}</Text>
                    <View style ={styles.newsInfoWrapper}>
                        <Text style={styles.newsInfo}>{Moment(news[0].pubDate).format('MMMM DD, hh:mm a')}</Text>
                        <Text style={styles.newsInfo}>{news[0].source_name}</Text>
                        <Text style={styles.newsInfo}>{news[0].category}</Text>
                        <Text style={styles.newsInfo}>{`Country: ${news[0]?.country?.[0]?.toUpperCase()}${news[0]?.country?.slice(1) || ""}`}</Text>

                    </View>
                    <Image source={{ uri: news[0].image_url }} style= {styles.newsImg} />
                    <Text>{news[0].description}</Text>
                </ScrollView>
            )}
        </>
    )
}

export default NewsDetails

const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor : Colors.white,
    },
    contentcontainer:{
        paddingHorizontal: 20,
        paddingBottom : 30
    },
    newsImg:{
        width: '100%',
        height: 300,
        marginBottom : 20,
        borderRadius :10,
        
    },
    titletxt:{
        fontSize: 16,
        fontWeight: 600,
        color: Colors.black,
        marginTop: 20,
        marginBottom: 20,
        marginVertical: 10,
        letterSpacing:0.6
    },
    newsInfoWrapper:{
        flexDirection:'column',
        justifyContent:'space-between',
        marginBottom: 20,
    },
    newsInfo:{
        fontSize: 12,
        color: Colors.darkGrey
    }
})