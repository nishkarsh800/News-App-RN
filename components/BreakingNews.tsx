import Pagination from '@/components/Pagination';
import SliderItem from '@/components/SliderItem';
import { Colors } from '@/constants/Colors';
import { NewsDataType } from '@/types';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, View, ViewToken } from 'react-native';
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

type Props = {
    newsList : Array<NewsDataType>
}

const BreakingNews = ({newsList}: Props) => {
    const { width } = Dimensions.get('screen');
    const [data, setdata] = useState(newsList)
    const [paginationIndex, setpaginationIndex] = useState(0)
    const scrollX = useSharedValue(0);
    const ref = useAnimatedRef<Animated.FlatList<any>>();

    const onScrollHandler = useAnimatedScrollHandler({
        onScroll:(e) =>{
            scrollX.value = e.contentOffset.x;
        }
    })

    useEffect(() => {
        setdata(newsList)
    }, [newsList])

    const onViewableItemsChanged = ({
        viewableItems,
    }: {
        viewableItems: ViewToken[];
    }) =>{
        if(
            newsList.length > 0 &&
            viewableItems[0].index !== undefined &&
            viewableItems[0].index !== null
        ){
            setpaginationIndex(viewableItems[0].index % newsList.length);
        }
    };

    const viewabilityConfig ={
        itemVisiblePercentThreshold: 50,
    };

    const viewabilityConfigCallbackPairs = useRef([
        {viewabilityConfig, onViewableItemsChanged}
    ])

  return (
    <View style = {styles.container}>
      <Text style={styles.title}>Breaking News</Text>
      <View style={styles.slideWrapper}>
        <Animated.FlatList
        ref ={ref}
        data ={data} 
        /*not used this bcz: keyExtractor={(_,index) => `list_items${index}`} Keys must be stable 
        across renders. With index keys, any insert/remove/reorder changes keys and React re-mounts
        rows, causing lost state and animation glitches.*/
        keyExtractor={(item, index) => item?.article_id ? `${item.article_id}-${index}` : `list_item_${index}`}
        horizontal= {true}
        showsHorizontalScrollIndicator ={false}
        pagingEnabled = {true}
        renderItem={({item,index})=>(
            <SliderItem slideItem={item} index={index} scrollX={scrollX}/>
        )}
        onScroll={onScrollHandler}
        onMomentumScrollEnd={(e)=>{
            if (newsList.length === 0) return;
            const page = Math.round(e.nativeEvent.contentOffset.x / width);
            setpaginationIndex(page % newsList.length);
        }}
        scrollEventThrottle={16}
        onEndReachedThreshold={0.5}
        onEndReached={()=>setdata([...data, ...newsList])}
        viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
        }
        />
        <Pagination items={newsList} scrollX={scrollX} paginationIndex={paginationIndex}/>
      </View>
    </View>
  )
}

export default BreakingNews

const styles = StyleSheet.create({

    container : {
        marginBottom : 10
    },

title: {
  fontSize: 18,
  fontWeight: "600",
  color: Colors.black,
  marginBottom: 10,
  marginLeft: 20
},
slideWrapper: {
  height: 200,
  justifyContent: 'center',
  marginBottom: 10
}

})