import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import PieChart from 'react-native-pie-chart'


import LinearGradient from 'react-native-linear-gradient'

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

    const widthAndHeight = 100

    const sliceColorImdb = ['#ddd', 'green']
    const sliceColorRt = ['#ddd', 'green']
    const sliceColorMeta = ['#ddd', 'green']


    const getMovieDetails = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(`http://www.omdbapi.com/?apikey=6af2b52f&i=${movieId}`);
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
    return (
        <SafeAreaView>
            <ScrollView>
                {isLoading &&
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 40,
                        width: '100%'
                    }}
                    >
                        <Text style={{
                            color: 'green',
                            fontSize: 20,
                            textAlign: 'center',
                            borderRadius: 10
                        }}>
                            Loading....
                        </Text>
                    </View>
                }
                {details && seriesImdb && seriesMeta && seriesRt && !isLoading &&
                    <View style={{ backgroundColor: '#ddd' }}>

                        <LinearGradient
                            colors={['#DDD', '#FFF', '#ddd']}
                            style={styles.container}
                            locations={[.3, .55, .9]}

                        >
                            <Text style={{ fontFamily: 'Courthes', fontSize: 16, color: 'blue', textTransform: 'uppercase' }}>{details.Title}</Text>
                            <View style={{ flexDirection: 'row', }}>
                                <Text style={{ color: '#000', }}>IMDB </Text>
                                <Text style={{ color: '#FF0000', }}>{details.imdbRating}</Text>

                                <Text style={{ color: '#000', marginStart: 10 }}>Votes </Text>
                                <Text style={{ color: '#FF0000', }}>{details.imdbVotes}</Text>

                                <Text style={{ color: '#000', marginStart: 10 }}>BoxOffice </Text>
                                <Text style={{ color: '#FF0000', }}>{details.BoxOffice}</Text>


                                <Text style={{ color: '#000', marginStart: 10 }}>{details.Runtime}</Text>
                            </View>
                        </LinearGradient>

                        <View style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignContent: 'center'
                        }}
                        >
                            <Image source={url}
                                style={{
                                    width: '100%',
                                    height: undefined,
                                    aspectRatio: 1,
                                }}
                            />


                        </View>

                        <LinearGradient
                            colors={['#DDD', '#FFF', '#ddd']}
                            locations={[.3, .55, .9]}
                        >
                            <View style={{ flexDirection: 'column', marginTop: 30 }}>
                                <Text style={{ fontFamily: 'Courthes', fontSize: 18, color: 'blue', padding: 5, marginStart: 22 }}>Overview</Text>
                                <Text style={{ color: '#000', marginTop: 1, paddingLeft: 25, paddingRight: 25, textAlign: 'justify' }}>{details.Plot}</Text>
                            </View>
                        </LinearGradient>


                        <LinearGradient
                            colors={['#DDD', '#FFF', '#ddd']}
                            locations={[.3, .55, .9]}
                        >
                            <View style={{ flexDirection: 'column', marginTop: 30 }}>
                                <Text style={{ fontFamily: 'Courthes', fontSize: 18, color: 'blue', padding: 5, marginStart: 22 }}>Ratings</Text>
                            </View>



                            <View style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                margin: 7,
                                borderRadius: 10,
                                marginBottom: 30,

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
                                        coverRadius={0.5}
                                        coverFill={'#ddd'}
                                    />
                                    <Text style={{ marginTop: 5, color: 'blue' }}>IMDB</Text>
                                    <Text style={{ marginTop: 5, color: 'green' }}>{seriesImdbRaw}</Text>
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
                                        coverRadius={0.5}
                                        coverFill={'#FFF'}
                                    />
                                    <Text style={{ marginTop: 5, color: 'blue' }}>Rotten Tomatoes</Text>
                                    <Text style={{ marginTop: 5, color: 'green' }}>{seriesRtRaw}</Text>
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
                                        coverRadius={0.5}
                                        coverFill={'#FFF'}
                                    />
                                    <Text style={{ marginTop: 5, color: 'blue' }}>Metacritic</Text>
                                    <Text style={{ marginTop: 5, color: 'green' }}>{seriesMetaRaw}</Text>

                                </View>
                            </View>



                        </LinearGradient>



                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 70,
        marginBottom: 10
    },
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        width: '100%',
    },
})