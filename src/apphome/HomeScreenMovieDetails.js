import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PieChart from 'react-native-pie-chart'
import LinearGradient from 'react-native-linear-gradient'
import FloatingButton from './FloatingButton';

export default function HomeScreenMovieDetails({ navigation, route }) {
    const movieId = route.params.props;
    const [details, setDetails] = useState({});
    const [isLoading, setIsLoading] = useState(false)
    const [url, setUrl] = useState(null)

    const [seriesImdb, setSeriesImdb] = useState([10, 10])
    const [seriesRt, setSeriesRt] = useState([10, 10])
    const [seriesMeta, setSeriesMeta] = useState([10, 10])

    const [seriesImdbRaw, setSeriesImdbRaw] = useState(null)
    const [seriesRtRaw, setSeriesRtRaw] = useState(null)
    const [seriesMetaRaw, setSeriesMetaRaw] = useState(null)

    const widthAndHeight = 90

    const [cartHeight, setHeight] = useState(50)
    const [cartWidth, setWidth] = useState(50)


    const sliceColorImdb = ['#ddd', 'green']
    const sliceColorRt = ['#ddd', 'green']
    const sliceColorMeta = ['#ddd', 'green']


    const getMovieDetails = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(`https://www.omdbapi.com/?apikey=6af2b52f&i=${movieId}`);
            if (response.data) {
                setDetails(response.data)
                let URL = { uri: response.data.Poster }
                setUrl(URL)
                setSeriesImdbRaw(response.data.Ratings[0].Value ? response.data.Ratings[0].Value : 'n/a')
                setSeriesRtRaw(response.data.Ratings[1].Value ? response.data.Ratings[1].Value : 'n/a')
                setSeriesMetaRaw(response.data.Ratings[2].Value ? response.data.Ratings[2].Value : 'n/a')
                setSeriesImdb([Number(response.data.Ratings[0].Value.split('/')[0]), Number(response.data.Ratings[0].Value.split('/')[1])])
                setSeriesRt([Number(response.data.Ratings[1].Value.split('%')[0]) / 100, 10])
                setSeriesMeta([Number(response.data.Ratings[2].Value.split('/')[0]), Number(response.data.Ratings[2].Value.split('/')[1])])
                setIsLoading(false);
            }
            else setIsLoading(false)
        }
        catch (error) {
            setIsLoading(false);
            console.log(error)
        }
    }
    useEffect(() => {
        setIsLoading(true);
        getMovieDetails();
    }, [])

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    const enableFocusCartButton = (condition) => {
        if (condition) {
            setHeight(100);
            setWidth(100);
        }
        else {
            setHeight(50);
            setWidth(50);
        }
    }

    const addToCart = (movieId) => {
        setHeight(100);
        setWidth(100);
        alert(movieId)
    }


    return (
        <View>

            {isLoading &&
                <View style={styles.containerLoading}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            }
            {details && seriesImdb && seriesMeta && seriesRt && !isLoading &&
                <View style={{ backgroundColor: '#ddd' }}>
                    <ScrollView
                        onScroll={({ nativeEvent }) => {
                            if (isCloseToBottom(nativeEvent)) {
                                enableFocusCartButton(true);
                            }
                            else enableFocusCartButton(false)
                        }}
                        scrollEventThrottle={600}
                    >
                        <LinearGradient
                            colors={['#ddd', '#FFF', '#ddd']}
                            style={styles.container}
                            locations={[.021, .09, .99]}
                        >
                            <Text style={{ fontFamily: 'Courthes', fontSize: 22, color: 'blue', marginBottom: 10, marginTop: 15, textAlign: 'center' }}>{details.Title}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ color: '#000', }}>IMDB </Text>
                                <Text style={{ color: '#FF0000', }}>{details.imdbRating}</Text>

                                <Text style={{ color: '#000', marginStart: 10 }}>Votes </Text>
                                <Text style={{ color: '#FF0000', }}>{details.imdbVotes}</Text>

                            </View>

                            <View style={{ flexDirection: 'row', }}>
                                <Text style={{ color: '#000', marginStart: 10 }}>BoxOffice </Text>
                                <Text style={{ color: '#FF0000', }}>{details.BoxOffice ? details.BoxOffice : '1,00,000'}</Text>
                                <Text style={{ color: '#000', marginStart: 10 }}>Duration </Text>
                                <Text style={{ color: '#FF0000' }}>{details.Runtime}</Text>
                            </View>


                        </LinearGradient>

                        <View style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignContent: 'center',

                        }}
                        >
                            <Image source={url}
                                style={{
                                    width: '100%',
                                    height: undefined,
                                    aspectRatio: 1,
                                    borderRadius: 15,
                                    margin: 10,
                                    borderColor: '#DDD',
                                    borderWidth: 5
                                }}
                            />


                        </View>

                        <LinearGradient
                            colors={['#DDD', '#FFF', '#ddd']}
                            locations={[.3, .55, .9]}

                        >
                            <View style={{ flexDirection: 'column', marginTop: 30 }}>
                                <Text style={{ fontFamily: 'Courthes', fontSize: 22, color: 'blue', padding: 5, marginStart: 22 }}>Overview</Text>
                                <Text style={{ color: '#000', marginTop: 1, paddingLeft: 25, paddingRight: 25, textAlign: 'justify' }}>{details.Plot}</Text>
                            </View>
                        </LinearGradient>


                        <LinearGradient
                            colors={['#DDD', '#FFF', '#ddd']}
                            locations={[.3, .55, .9]}
                        >
                            <View style={{ flexDirection: 'column', marginTop: 30 }}>
                                <Text style={{ fontFamily: 'Courthes', fontSize: 22, color: 'blue', padding: 5, marginStart: 22 }}>Ratings</Text>
                            </View>



                            <View style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                margin: 10,
                                borderRadius: 10,
                                marginBottom: 50,

                            }}>
                                <View style={{
                                    width: '33%',
                                    marginTop: 5,
                                    marginBottom: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>

                                    <PieChart
                                        widthAndHeight={widthAndHeight}
                                        series={seriesImdb}
                                        sliceColor={sliceColorImdb}
                                        coverRadius={0.6}
                                        coverFill={'#ddd'}
                                    />
                                    <Text style={{ marginTop: 5, color: 'blue', textAlign: 'center' }}>IMDB</Text>
                                    <Text style={{ marginTop: 5, color: 'green', textAlign: 'center' }}>{seriesImdbRaw}</Text>
                                </View>

                                <View style={{
                                    width: '33%',
                                    marginTop: 5,
                                    marginBottom: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <PieChart
                                        widthAndHeight={widthAndHeight}
                                        series={seriesRt}
                                        sliceColor={sliceColorRt}
                                        coverRadius={0.6}
                                        coverFill={'#FFF'}
                                    />
                                    <Text style={{ marginTop: 5, color: 'blue', textAlign: 'center' }}>Rotten Tomatoes</Text>
                                    <Text style={{ marginTop: 5, color: 'green', textAlign: 'center' }}>{seriesRtRaw ? seriesRtRaw : '5/10'}</Text>
                                </View>

                                <View style={{
                                    width: '33%',
                                    marginTop: 5,
                                    marginBottom: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center',

                                }}>

                                    <PieChart
                                        widthAndHeight={widthAndHeight}
                                        series={seriesMeta}
                                        sliceColor={sliceColorMeta}
                                        coverRadius={0.6}
                                        coverFill={'#FFF'}
                                    />
                                    <Text style={{ marginTop: 5, color: 'blue', textAlign: 'center' }}>Metacritic</Text>
                                    <Text style={{ marginTop: 5, color: 'green', textAlign: 'center' }}>{seriesMetaRaw ? seriesMetaRaw : '5 / 10'}</Text>

                                </View>
                            </View>



                        </LinearGradient>
                    </ScrollView>
                    <FloatingButton
                        style={styles.floatinBtn}
                        onPress={() => { addToCart(movieId) }}
                        height={cartHeight}
                        width={cartWidth}
                    />
                </View>
            }

        </View>
    );
}

const styles = StyleSheet.create({
    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '50%'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 90,
        marginBottom: 20
    },
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        width: '100%',
    },
    floatinBtn: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    }
})