import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image, TextInput, StyleSheet, Button, FlatList } from 'react-native';
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
                onPress={() => { navigation.navigate('Movie details', { props: imdbID }) }}
            >
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    padding: 5,
                    margin: 5,
                    borderColor: '#ddd',
                    borderWidth: 1,
                    borderRadius: 10
                }}
                >
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
                margin: 7,
                borderRadius: 10,
                marginBottom: 10
            }}>
                <View style={{
                    width: '97%',
                    marginTop: 5,
                    marginBottom: 5,
                }}
                >
                    <TextInput
                        style={styles.input}
                        placeholder="Search by movie name"
                        onChangeText={handleInputChange}
                        value={search}
                    />
                </View>
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
                        backgroundColor: `${selected === 'search' ? '#ddd' : '#FFF'}`,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    >
                        <View>
                            <Text>
                                {isLoading && selected === 'search' ? 'Loading..' : 'Search'}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { onSearchMovie('series') }}>
                    <View style={{
                        width: responsiveWidth(31),
                        height: 40,
                        margin: 0,
                        borderColor: "#ddd",
                        borderWidth: 1,

                        backgroundColor: `${selected === 'series' ? '#ddd' : '#FFF'}`,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    >
                        <View>
                            <Text>
                                {isLoading && selected === 'series' ? 'Loading..' : 'Series'}
                            </Text>
                        </View>
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
                        backgroundColor: `${selected === 'movie' ? '#ddd' : '#FFF'}`,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    >
                        <View>
                            <Text>
                                {isLoading && selected === 'movie' ? 'Loading..' : 'Movie'}
                            </Text>
                        </View>
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
        borderWidth: 0,
        padding: 10,
        borderLeftWidth: 2,
        borderColor: '#CCC',
        fontSize: 16
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 1,
        borderColor: '#ddd',
        borderWidth: 0,
        borderRadius: 10,
        justifyContent: 'center',
        marginBottom: 10
    }
});

