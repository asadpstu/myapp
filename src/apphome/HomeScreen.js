import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image, TextInput, StyleSheet, Button, FlatList, ActivityIndicator } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export default function HomeScreen({ navigation }) {
    const [search, setSearch] = useState('')
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0)
    const [selected, setSelected] = useState('')

    const handleInputChange = (text) => {
        setSearch(text);
    };

    const handleChangePageNumber = () => {
        setPage(page + 1)
    }

    const onSearchMovie = async (filter) => {
        try {
            setMovies([])
            setIsLoading(true)
            setSelected(filter);
            setPage(1)
            let url = null
            if (filter === 'search') {
                url = `https://www.omdbapi.com/?apikey=6af2b52f&s=${search}`
            }
            else url = `https://www.omdbapi.com/?apikey=6af2b52f&s=${search}&type=${filter}`
            const response = await axios.get(url);
            if (response.data && response.data.Search) {
                setMovies(response.data.Search);
                setIsLoading(false)
            }
            else setIsLoading(false)
        }
        catch (e) {
            console.log(e)
        }
    }

    const onSearchMovieAppend = async (selected) => {
        try {
            setIsLoading(true)
            let url = null
            if (selected === 'search') {
                url = `https://www.omdbapi.com/?apikey=6af2b52f&s=${search}&page=${page}`
            }
            else url = `https://www.omdbapi.com/?apikey=6af2b52f&s=${search}&type=${selected}&page=${page}`
            const response = await axios.get(url);
            if (response.data && response.data.Search) {
                let temp = []
                temp.push(...movies, ...response.data.Search)
                setMovies(temp);
                setIsLoading(false)
            }
            else setIsLoading(false)
        }
        catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        onSearchMovieAppend(selected)
    }, [page])


    const ListComponent = ({ Title, Year, imdbID, Type, Poster }) => {
        return (
            <TouchableOpacity
                onPress={() => { navigation.navigate('Details', { props: imdbID }) }}
            >
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    padding: 10,
                    marginLeft: 15,
                    marginRight: 15,
                    marginBottom: 15,
                    borderColor: '#ddd',
                    borderWidth: 1,
                    borderRadius: 10
                }}
                >
                    <View style={{

                        width: '60%'
                    }}
                    >
                        <Text style={{ margin: 1, color: '#000', fontSize: 15, fontWeight: '900', textTransform: 'uppercase' }}>{Title}</Text>
                        <Text style={{ margin: 1, color: '#000', fontSize: 13, fontWeight: '400', textTransform: 'uppercase', fontWeight: 600 }}>{Type}</Text>
                        <Text style={{ margin: 1, color: '#000', fontSize: 13, fontWeight: '400', textTransform: 'uppercase', fontWeight: 600 }}>Released on {Year}</Text>
                        <Text style={{ margin: 1, color: '#000', fontSize: 13, fontWeight: '400', textTransform: 'uppercase', fontWeight: 600 }}>IMDBID : {imdbID}</Text>
                    </View>

                    <View style={{

                        width: '38%',
                        padding: 1
                    }}

                    >
                        <Image source={Poster}
                            style={{
                                width: responsiveWidth(30),
                                height: responsiveHeight(17),
                                padding: 1,
                                alignSelf: 'flex-end',
                            }}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    const renderEmptyComponent = () => (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>No items to display</Text>
        </View>
    );

    const renderItem = ({ item }) => {
        let imageSrc = item.Poster.indexOf('https') !== -1 ? { uri: item.Poster } : require('../../asset/image/blank-file-6-512.gif')
        return (
            <ListComponent Title={item.Title} Year={item.Year} imdbID={item.imdbID} Type={item.Type} Poster={imageSrc} />
        )
    };

    return (
        <SafeAreaView>
            <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                margin: 15,
                borderRadius: 10,
            }}>
                <TextInput
                    style={styles.input}
                    placeholder="Search by movie name"
                    onChangeText={handleInputChange}
                    value={search}
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => { onSearchMovie('search') }}>
                    <View style={{
                        width: responsiveWidth(31),
                        height: 40,
                        margin: 0,
                        borderColor: "#ddd",
                        borderWidth: 1,
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                        backgroundColor: `${selected === 'search' ? 'green' : '#CCC'}`,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    >

                        <Text style={{ color: '#000' }}>
                            {isLoading && selected === 'search'
                                ? <ActivityIndicator size="large" color="#0000ff" />
                                : 'Search'}
                        </Text>

                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { onSearchMovie('series') }}>
                    <View style={{
                        width: responsiveWidth(31),
                        height: 40,
                        margin: 0,
                        borderColor: "#ddd",
                        borderWidth: 1,

                        backgroundColor: `${selected === 'series' ? 'green' : '#ccc'}`,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    >

                        <Text style={{ color: '#000' }}>
                            {isLoading && selected === 'series'
                                ?
                                <ActivityIndicator size="large" color="#0000ff" />
                                : 'Series'}
                        </Text>

                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { onSearchMovie('movie') }}>
                    <View style={{
                        width: responsiveWidth(31),
                        height: 40,
                        margin: 0,
                        borderColor: "#ddd",
                        borderLeftWidth: 1,
                        borderTopRightRadius: 5,
                        borderBottomRightRadius: 5,
                        backgroundColor: `${selected === 'movie' ? 'green' : '#ccc'}`,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    >

                        <Text style={{ color: '#000' }}>
                            {isLoading && selected === 'movie'
                                ?
                                <ActivityIndicator size="large" color="#0000ff" />
                                : 'Movie'}
                        </Text>

                    </View>
                </TouchableOpacity>
            </View>

            {movies.length > 0 &&
                <FlatList
                    data={movies}
                    renderItem={renderItem}
                    keyExtractor={item => item.imdbID}
                    style={{ marginBottom: 130 }}
                    ListEmptyComponent={renderEmptyComponent}
                    onEndReachedThreshold={.5}
                    onEndReached={handleChangePageNumber}
                />
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        width: '100%',
        borderWidth: 2,
        padding: 10,
        borderColor: 'green',
        fontSize: 16,
        borderRadius: 5
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 3,
        borderColor: '#ddd',
        borderWidth: 0,
        borderRadius: 10,
        justifyContent: 'center',
        marginBottom: 10
    }
});

