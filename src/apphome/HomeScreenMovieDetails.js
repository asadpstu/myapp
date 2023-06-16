import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActivityIndicator, Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PieChart from 'react-native-pie-chart'
import LinearGradient from 'react-native-linear-gradient'
import FloatingButton from './FloatingButton';
import { addCart } from '../../redux/actions/addCartAction';
import { Card, Button, Title, Paragraph } from 'react-native-paper';
import { withRepeat } from 'react-native-reanimated/lib/types/lib/reanimated2/animation';
import FloatingButtonRight from './FloatingButtonRight';

export default function HomeScreenMovieDetails({ navigation, route }) {
    const cartList = useSelector((store) => store.cart.cart);
    const dispatch = useDispatch();
    const movieId = route.params.props;
    const [details, setDetails] = useState({});
    const [isLoading, setIsLoading] = useState(false)
    const [url, setUrl] = useState(null)
    const [cartBtnTxt, setCartBtnTxt] = useState('Add to cart')

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


    const addtocart = (movieId, url, title) => {
        const payload = {
            imdbID: movieId,
            price: 100,
            qty: 1,
            url: url,
            title: title
        }
        setTimeout(() => {
            setCartBtnTxt('In progress ...')
            setHeight(50);
            setWidth(50);
        }, 1);

        setTimeout(() => {
            setCartBtnTxt('Item added into cart.')
            dispatch(addCart(payload));
        }, 1000);

        setTimeout(() => {
            setHeight(70);
            setWidth(70);
            setCartBtnTxt('Add to cart')
        }, 2000);

    };

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
            setHeight(70);
            setWidth(70);
        }
        else {
            setHeight(50);
            setWidth(50);
        }
    }

    const showCartItem = () => {
        navigation.navigate('My Cart List')
    }

    const goHome = () => {
        navigation.navigate('AppHome')
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

                                }}
                            />

                        </View>

                        <Card style={styles.containerCard}>

                            <Card.Content>
                                <Card.Content style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Title>
                                        <Text style={{ fontFamily: 'Courthes', fontSize: 20, color: 'green' }}>{details.Title}</Text>
                                    </Title>
                                </Card.Content>

                                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                    <View style={{ width: '50%' }}>
                                        <Text style={{ color: '#000', marginStart: '2%' }}>IMDB <Text style={{ color: '#FF0000', }}>{details.imdbRating}</Text></Text>
                                    </View>
                                    <View style={{ width: '50%' }}>
                                        <Text style={{ color: '#000', marginStart: '2%' }}>VOTE <Text style={{ color: '#FF0000', }}>{details.imdbVotes}</Text></Text>
                                    </View>

                                </View>

                                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                    <View style={{ width: '50%' }}>
                                        <Text style={{ color: '#000', marginStart: '2%' }}>COLLECTION <Text style={{ color: '#FF0000', }}>{details.BoxOffice ? details.BoxOffice : '1,00,000'}</Text></Text>
                                    </View>

                                    <View style={{ width: '50%' }}>
                                        <Text style={{ color: '#000', marginStart: '2%' }}>DURATION <Text style={{ color: '#FF0000' }}>{details.Runtime}</Text></Text>
                                    </View>
                                </View>
                            </Card.Content>

                        </Card>

                        <LinearGradient
                            colors={['#DDD', '#FFF', '#ddd']}
                            locations={[.3, .55, .9]}

                        >
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ fontFamily: 'Courthes', fontSize: 22, color: 'green', padding: 5, marginLeft: 20, marginRight: 20, borderBottomWidth: 5, borderBottomColor: 'green' }}>Overview</Text>
                                <Text style={{ color: '#000', marginTop: 1, paddingLeft: 25, paddingRight: 25, textAlign: 'justify' }}>{details.Plot}</Text>
                            </View>
                        </LinearGradient>


                        <LinearGradient
                            colors={['#DDD', '#FFF', '#ddd']}
                            locations={[.3, .55, .9]}
                        >
                            <View style={{ flexDirection: 'column', }}>
                                <Text style={{ fontFamily: 'Courthes', fontSize: 22, color: 'green', padding: 5, margin: 20, borderBottomWidth: 5, borderBottomColor: 'green' }}>Ratings</Text>
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



                        <TouchableOpacity onPress={() => { addtocart(movieId, url, details.Title) }}>
                            <View style={{
                                //width: '100%',
                                height: 50,
                                flexDirection: 'row',
                                flex: 1,
                                flexWrap: 'wrap',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'green',
                                paddingTop: 10,
                                margin: 20,
                                borderRadius: 10
                            }}>
                                <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>{cartBtnTxt}</Text>

                            </View>

                        </TouchableOpacity>



                    </ScrollView>
                    {cartList.length > 0 &&
                        <FloatingButton
                            CartList={() => { showCartItem() }}
                            style={styles.floatinBtn}
                            height={cartHeight}
                            width={cartWidth}
                            cartListCount={cartList.length}
                        />
                    }

                    <FloatingButtonRight
                        goHome={() => { goHome() }}
                        style={styles.floatinBtnRight}
                        height={50}
                        width={50}

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

    },
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        width: '100%',
    },
    floatinBtn: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    floatinBtnRight: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    containerCard: {
        alignContent: 'center',
        margin: 20
    }
})