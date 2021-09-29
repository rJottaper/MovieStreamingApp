import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Platform,
    Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { ProgressBar } from '../components'
import { COLORS, SIZES, FONTS, icons } from '../constants'

const MovieDetail = ({navigation, route}) => {
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        let {selectedMovie} = route.params;
        setSelectedMovie(selectedMovie)
    }, [])

    function renderHeaderBar() {
        return (
            <View 
                style={{
                    flexDirection: 'row', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginTop: Platform.OS == 'ios' ? 40 : 20}}
            >
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 45,
                        height: 45,
                        borderRadius: 20,
                        backgroundColor: 20,
                        backgroundColor: COLORS.transparentBlack,
                        marginLeft: 10
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.left_arrow}
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: COLORS.white
                        }}
                    />    
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 45,
                        height: 45,
                        borderRadius: 20,
                        backgroundColor: 20,
                        backgroundColor: COLORS.transparentBlack,
                        marginRight: 10
                    }}
                    onPress={() => console.log('Share')}
                >
                    <Image
                        source={icons.upload}
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: COLORS.white
                        }}
                    />    
                </TouchableOpacity>
            </View>
        )
    }

    function renderHeaderSection() {
        return (
            <ImageBackground
                source={selectedMovie?.details?.image}
                resizeMode="cover"
                style={{
                    width: '100%',
                    height: SIZES.height < 700 ? SIZES.height * 0.6 : SIZES.height * 0.7
                }}
            >
            <View 
                style={{flex: 1}}
            >
                {renderHeaderBar()}
                <View style={{flex: 1, justifyContent: 'flex-end', }}>
                    <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 0, y: 1}}
                        colors={['transparent', '#000']}
                        style={{
                            width: '100%',
                            height: 150,
                            alignItems: 'center',
                            justifyContent: 'flex-end'
                        }}
                    >
                        <Text style={{color: COLORS.white, ...FONTS.body4}}>
                            {selectedMovie?.details.season}
                        </Text>
                        <Text style={{marginTop: SIZES.base, color: COLORS.white, ...FONTS.h1}}>
                            {selectedMovie?.name}
                        </Text>
                    </LinearGradient>
                </View>
            </View>
            </ImageBackground>
        )
    }

    function renderCategoryAndRatings() {
        return (
            <View style={{
                flexDirection: 'row',
                marginTop: SIZES.base,
                alignItems: 'center',
                justifyContent: 'center'
            }}
            >
                <View style={[
                    styles.categoryContainer, { marginLeft: 0 }
                ]}>
                    <Text style={{color: COLORS.white, ...FONTS.h4}}>
                        {selectedMovie?.details.age}
                    </Text>
                </View>
                <View style={[
                    styles.categoryContainer, { paddingHorizontal: SIZES.padding }
                ]}>
                    <Text style={{color: COLORS.white, ...FONTS.h4}}>
                        {selectedMovie?.details.genre}
                    </Text>
                </View>
                <View style={styles.categoryContainer}>
                    <Image 
                        source={icons.star}
                        resizeMode="contain"
                        style={{
                            width: 15,
                            height: 15
                        }}
                    />
                    <Text style={{marginLeft: SIZES.base, color: COLORS.white, ...FONTS.h4}}>
                        {selectedMovie?.details.ratings}
                    </Text>
                </View>
            </View>
        )
    }

    function renderMovieDetails() {
        return (
            <View style={{
                flex: 1,
                paddingHorizontal: SIZES.padding, 
                marginTop: SIZES.padding,
                justifyContent: 'space-around'
            }}>
                <View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={{flex: 1, color: COLORS.white, ...FONTS.h4}}>
                            {selectedMovie?.details.currentEpisode}
                        </Text>
                        <Text style={{color: COLORS.lightGray, ...FONTS.body4}}>
                            {selectedMovie?.details?.runningTime}
                        </Text>
                    </View>
                    <ProgressBar  
                        containerStyle={{
                            marginTop: SIZES.radius
                        }}
                        barStyle={{
                            height: 5,
                            borderRadius: 3
                        }}
                        barPercentage={selectedMovie?.detais?.progress}
                    />
                </View>
                <TouchableOpacity
                    style={{
                        height: 60,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: Platform.OS === 'ios' ? SIZES.padding * 2 : 0,
                        borderRadius: 15,
                        backgroundColor: COLORS.primary 
                    }}
                >
                    <Text style={{color: COLORS.white, ...FONTS.h2}}>
                        {selectedMovie?.details?.progress == '0%' ? 'Watch Now' : 'Continue Watching'}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
     <ScrollView
        style={{backgroundColor: COLORS.black}}
        contentContainerStyle={{flex: 1, backgroundColor: COLORS.black}}
     >
         {renderHeaderSection()}
         {renderCategoryAndRatings()}
         {renderMovieDetails()}
     </ScrollView>
    )
}

const styles = StyleSheet.create({
    categoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: SIZES.base,
        paddingHorizontal: SIZES.base,
        paddingVertical: 3,
        borderRadius: SIZES.base,
        backgroundColor: COLORS.gray1
    }
})

export default MovieDetail;