import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image, TextInput, StyleSheet, Button, FlatList } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export default function HomeScreen({ navigation }) {
    const [search, setSearch] = useState('')
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [filterColor, setFilterColor] = useState('')

    const handleInputChange = (text) => {
        setSearch(text);
    };

    const onSearchMovie = async () => {
        setIsLoading(true)
        setFilterColor('')
        try {
            setMovies([])
            const url = `http://www.omdbapi.com/?apikey=6af2b52f&s=${search}`
            const response = await axios.get(url);
            if (response.data && response.data.Search) {
                setMovies(response.data.Search);
                setIsLoading(false)
            }
            else setIsLoading(false)
        }
        catch (e) {
            console.log(e)
            setIsLoading(false);
        }
    }

    const filterResult = async (filter) => {
        try {
            setMovies([])
            setFilterColor(filter)
            const url = `http://www.omdbapi.com/?apikey=6af2b52f&s=${search}&type=${filter}`
            const response = await axios.get(url);
            if (response.data && response.data.Search) {
                console.log(response.data.Search)
                setMovies(response.data.Search);
            }
        }
        catch (e) {
            console.log(e)
        }
    }


    const ListComponent = ({ Title, Year, imdbID, Type, Poster }) => {
        return (
            <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                padding: 5,
                margin: 5,
                borderColor: '#ddd',
                borderWidth: 1,
                borderRadius: 10
            }}>
                <View style={{
                    height: 120,
                    width: '60%'
                }}
                >
                    <Text style={{ margin: 1, color: '#8200d6', fontSize: 15, textTransform: 'uppercase' }}> {Title} </Text>
                    <Text style={{ margin: 1, color: '#820', fontSize: 13, textTransform: 'uppercase', fontWeight: 600 }}> {Type} </Text>
                    <Text style={{ margin: 1, color: '#820', fontSize: 13, textTransform: 'uppercase', fontWeight: 600 }}> Released on {Year} </Text>
                    <Text style={{ margin: 1, color: '#820', fontSize: 13, textTransform: 'uppercase', fontWeight: 600 }}> IMDBID : {imdbID} </Text>
                </View>

                <View style={{
                    height: 120,
                    width: '38%',
                    padding: 1
                }}

                >
                    <Image source={Poster}
                        style={{
                            width: responsiveWidth(30),
                            height: responsiveHeight(17),
                            padding: 1,
                            alignSelf: 'flex-end'
                        }}
                    />
                </View>
            </View>
        );
    }

    const renderEmptyComponent = () => (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>No items to display</Text>
        </View>
    );

    const renderItem = ({ item }) => {
        let imageSrc = { uri: item.Poster }
        return (
            <ListComponent Title={item.Title} Year={item.Year} imdbID={item.imdbID} Type={item.Type} Poster={imageSrc} />
        )
    };

    return (
        <SafeAreaView>

            <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                margin: 7,
                borderRadius: 10,
                marginBottom: 10
            }}>
                <View style={{
                    width: '67%',
                    marginTop: 5,
                    marginBottom: 5
                }}
                >
                    <TextInput
                        style={styles.input}
                        placeholder="Search by movie name"
                        onChangeText={handleInputChange}
                        value={search}
                    />
                </View>

                <View style={{
                    width: '33%',
                    marginTop: 5,
                    marginBottom: 5,
                    borderColor: "#FFF",
                    borderWidth: 1,
                    borderRadius: 5,
                    backgroundColor: '#FFF',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                >
                    {isLoading ?
                        <TouchableOpacity >
                            <View>
                                <Text>
                                    Loading...
                                </Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => { onSearchMovie() }}>
                            <View>
                                <Text style={{ fontWeight: 600, }}>
                                    Search
                                </Text>
                            </View>
                        </TouchableOpacity>
                    }

                </View>
            </View>

            {movies.length > 0 &&
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    margin: 1,
                    borderColor: '#ddd',
                    borderWidth: 0,
                    borderRadius: 10,
                    justifyContent: 'center',
                    marginBottom: 10
                }}>
                    <TouchableOpacity onPress={() => { filterResult('series') }}>
                        <View style={{
                            width: 200,
                            height: 40,
                            margin: 0,
                            borderColor: "#ddd",
                            borderWidth: 1,
                            borderTopLeftRadius: 5,
                            borderBottomLeftRadius: 5,
                            backgroundColor: `${filterColor === 'series' ? '#ddd' : '#FFF'}`,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        >

                            <View>
                                <Text>
                                    Series
                                </Text>
                            </View>


                        </View></TouchableOpacity>
                    <TouchableOpacity onPress={() => { filterResult('movie') }}>
                        <View style={{
                            width: 200,
                            height: 40,
                            margin: 0,
                            borderColor: "#ddd",
                            borderLeftWidth: 1,
                            borderTopRightRadius: 5,
                            borderBottomRightRadius: 5,
                            backgroundColor: `${filterColor === 'movie' ? '#ddd' : '#FFF'}`,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        >

                            <View>
                                <Text>
                                    Movie
                                </Text>
                            </View>


                        </View></TouchableOpacity>
                </View>
            }
            <FlatList
                data={movies}
                renderItem={renderItem}
                keyExtractor={item => item.imdbID}
                style={{ marginBottom: 130 }}
                ListEmptyComponent={renderEmptyComponent}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderWidth: 0,
        padding: 10,
        borderLeftWidth: 2,
        borderColor: '#CCC',
        fontSize: 16
    },
});

