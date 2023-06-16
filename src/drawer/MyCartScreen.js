import React from 'react';
import { Image } from 'react-native';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, increaseCart, decreaseCart } from '../../redux/actions/addCartAction';

export default function MyCartScreen({ navigation }) {
    const cartList = useSelector((store) => store.cart.cart);
    console.log(cartList)
    const dispatch = useDispatch();
    const renderItem = ({ item }) => {
        return (
            <ListComponent title={item.title} imdbID={item.imdbID} price={item.price} qty={item.qty} imgSrc={item.url} />
        )
    };

    const increase = (imdbID) => {
        const payload = {
            imdbID: imdbID,
            qty: 1
        }
        dispatch(increaseCart(payload));
    }

    const decrease = (imdbID) => {
        const payload = {
            imdbID: imdbID,
            qty: 1
        }
        dispatch(decreaseCart(payload));
    }

    const ListComponent = ({ title, imdbID, price, qty, imgSrc }) => {
        return (

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

                <View style={{ width: '60%' }}>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('Details', { props: imdbID }) }}
                    >
                        <Text style={{ margin: 1, color: '#000', fontSize: 15, fontWeight: '900', textTransform: 'uppercase' }}>{title}</Text>


                        <Text style={{ margin: 1, color: '#000', textTransform: 'uppercase', fontWeight: 600 }}>Price {price}</Text>
                        <Text style={{ margin: 1, color: '#000', textTransform: 'uppercase', fontWeight: 600 }}>IMDBID : {imdbID}</Text>
                    </TouchableOpacity>
                    <View style={{
                        marginTop: 5,
                        flexDirection: 'row',
                        alignItems: 'center',

                    }}>

                        <View style={{ width: 80, }}><Text style={{ color: '#000', fontWeight: 600 }}>QUANTITY</Text></View>
                        <View style={{ width: 25, borderColor: 'green', borderRadius: 50, marginLeft: 5, borderWidth: 1, color: 'black' }}><Text style={{ fontSize: 20, textAlign: 'center' }}>{qty}</Text></View>
                        <TouchableOpacity onPress={() => { increase(imdbID) }}>
                            <View style={{ width: 30, backgroundColor: 'green', marginLeft: 15 }}><Text style={{ fontSize: 20, textAlign: 'center' }}>+</Text></View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { decrease(imdbID) }}>
                            <View style={{ width: 30, backgroundColor: 'red', }}><Text style={{ fontSize: 20, textAlign: 'center' }}>-</Text></View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{

                    width: '38%',
                    padding: 1
                }}

                >
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('Details', { props: imdbID }) }}
                    >
                        <Image source={imgSrc}
                            style={{
                                width: responsiveWidth(30),
                                height: responsiveHeight(17),
                                padding: 1,
                                alignSelf: 'flex-end',
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>

        );
    }

    const renderEmptyComponent = () => (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>No items to display</Text>
        </View>
    );

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>

            <FlatList
                data={cartList}
                renderItem={renderItem}
                keyExtractor={item => item.imdbID}
                style={{ marginBottom: 20 }}
                ListEmptyComponent={renderEmptyComponent}

            />

        </View>
    );
}