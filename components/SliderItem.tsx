import { Colors } from '@/constants/Colors';
import { NewsDataType } from '@/types';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';

type Props = {
  slideItem: NewsDataType,
  index: number,
  scrollX: SharedValue<number>
};

const { width } = Dimensions.get('screen');
const CARD_WIDTH = width * 0.85; // Card takes 85% of screen
const SPACING = (width - CARD_WIDTH) / 2; // Equal spacing on both sides

const SliderItem = ({ slideItem, index, scrollX }: Props) => {
    const rnStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: interpolate(
                        scrollX.value,
                        [(index - 1) * width, index * width, (index + 1) * width],
                        [-width * 0.15, 0, width * 0.15],
                        Extrapolation.CLAMP
                    ),
                },
                {
                    scale: interpolate(
                        scrollX.value,
                        [(index - 1) * width, index * width, (index + 1) * width],
                        [0.9, 1, 0.9],
                        Extrapolation.CLAMP
                    ),
                },
            ],
        };
    });

    return (
        <Link href={`/news/${slideItem.article_id}`} asChild>
        <TouchableOpacity>
        <View style={styles.itemWrapper}>
            <Animated.View style={[styles.cardContainer, rnStyle]}>
                {/* Image with corner radius */}
                <Image source={{ uri: slideItem.image_url }} style={styles.image} />
                {/* Gradient + Text overlay */}
                <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.8)"]}
                    style={styles.overlay}
                >
                    <View style={styles.sourceInfo}>
                        {slideItem.source_icon && (
                            <Image 
                                source={{ uri: slideItem.source_icon }} 
                                style={styles.sourceIcon}
                            />
                        )}
                        <Text style={styles.sourceName}>{slideItem.source_name}</Text>
                    </View>
                    <Text style={styles.title} numberOfLines={2}>{slideItem.title}</Text>
                </LinearGradient>
            </Animated.View>
        </View>
        </TouchableOpacity>
        </Link>
    );
};

export default SliderItem;

const styles = StyleSheet.create({
    itemWrapper: {
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SPACING,
    },
    cardContainer: {
        width: CARD_WIDTH,
        height: 180,
        borderRadius: 20,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '50%',
        justifyContent: 'flex-end',
        padding: 12,
    },
    title: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        paddingHorizontal: 20,
    },
    sourceInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    sourceIcon: {
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    sourceName: {
        color: Colors.white,
        fontSize: 12,
        fontWeight: '600',
    },
});