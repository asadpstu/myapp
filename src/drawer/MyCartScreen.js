import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Button, Image, ScrollView } from 'react-native';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, increaseCart, decreaseCart } from '../../redux/actions/addCartAction';

import { StripeProvider, useConfirmPayment } from '@stripe/stripe-react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';

export default function MyCartScreen({ navigation }) {
    const [total, setTotal] = useState(0);
    const [success, setSuccess] = useState(false);
    const [showstripe, setShowStripe] = useState(false);
    const API_URL = 'https://rn-stripe-service.onrender.com';
    const { confirmPayment, loading } = useConfirmPayment();
    const cartList = useSelector((store) => store.cart.cart);
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
        calculate();
    }

    const decrease = (imdbID) => {
        const payload = {
            imdbID: imdbID,
            qty: 1
        }
        dispatch(decreaseCart(payload));
        calculate();
    }

    const calculate = () => {
        let temp = [...cartList]
        let calc = temp.reduce((sum, current) => {
            return sum = sum + (current.price * current.qty);
        }, 0)
        setTotal(calc)
    }

    useLayoutEffect(() => {
        calculate()
    })

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
                        <Text style={{ height: 45, margin: 1, color: '#000', fontSize: 15, fontWeight: '900', textTransform: 'uppercase' }}>{title}</Text>


                        <Text style={{ marginLeft: 1, color: 'green', textTransform: 'uppercase', fontWeight: 800 }}>Price {price}</Text>
                        {/* <Text style={{ margin: 1, color: '#000', textTransform: 'uppercase', fontWeight: 600 }}>IMDBID : {imdbID}</Text> */}
                    </TouchableOpacity>
                    <View style={{
                        marginTop: 5,
                        flexDirection: 'row',
                        alignItems: 'center',

                    }}>

                        <View style={{ width: 32, }}><Text style={{ color: 'green', fontWeight: 800 }}>QTY </Text></View>
                        <View style={{ width: 30, borderColor: 'green', borderRadius: 50, marginLeft: 5, borderWidth: 1 }}><Text style={{ fontSize: 20, textAlign: 'center', color: 'green' }}>{qty}</Text></View>
                        <TouchableOpacity onPress={() => { increase(imdbID) }}>
                            <View style={{ width: 35, height: 30, backgroundColor: 'green', marginLeft: 15, justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 20, textAlign: 'center' }}>+</Text></View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { decrease(imdbID) }}>
                            <View style={{ width: 35, height: 30, backgroundColor: 'red', }}><Text style={{ fontSize: 20, textAlign: 'center' }}>-</Text></View>
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

    const showStripe = () => {
        setShowStripe(true)
    }

    const goBack = () => {
        navigation.navigate('AppHome')
    }

    const fetchPaymentIntentClientSecret = async () => {
        const response = await fetch(`${API_URL}/create-payment-intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                currency: 'usd',
                amount: total,
                paymentMethodType: ["card"]
            }),
        });
        const { clientSecret } = await response.json();
        return clientSecret;
    };
    const handlePayPress = async () => {
        const billingDetails = {
            email: 'hmasad09@gmail.com',
        };
        const clientSecret = await fetchPaymentIntentClientSecret();
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
            paymentMethodType: 'Card',
            paymentMethodData: {
                billingDetails,
            },
        });

        if (error) {
            console.log('Payment confirmation error', error);
            alert("Transaction failed!")

        } else if (paymentIntent) {
            alert("Transaction complete")
            setShowStripe(false)
            setSuccess(true)
            dispatch(clearCart());
        }
    };

    const [publishableKey, setPublishableKey] = useState('');
    const fetchPublishableKey = async () => {
        setPublishableKey('pk_test_wXXygoU9x9WcYag3k8qdNsOq');
    };
    useEffect(() => {
        fetchPublishableKey();
    }, []);

    return (
        <StripeProvider
            publishableKey={publishableKey}
            merchantIdentifier="merchant.identifier" // required for Apple Pay
            urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
        >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                <FlatList
                    data={cartList}
                    renderItem={renderItem}
                    keyExtractor={item => item.imdbID}
                    style={{ marginBottom: 20 }}
                    ListEmptyComponent={renderEmptyComponent}
                />
                {
                    cartList.length > 0 && !success && (
                        <TouchableOpacity onPress={() => { showStripe() }}>
                            <View style={{
                                width: responsiveWidth(90),
                                height: 50,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: showstripe ? 'violet' : 'blue',
                                margin: 20,
                                borderRadius: 10
                            }}>
                                <Text style={{ color: 'white', textAlign: 'center', fontSize: 14 }}>{!showstripe ? `Pay ${total} USD` : `You are paying ${total} USD using stripe`}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }

                {
                    success && (
                        <View style={{
                            width: responsiveWidth(100),
                            height: 100,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'white',
                        }}>
                            <Text style={{ color: 'white', textAlign: 'center', fontSize: 14, color: 'green' }}>Congratulations. Payment successfull.</Text>
                            <TouchableOpacity onPress={() => { goBack() }}>
                                <Text style={{ color: 'white', textAlign: 'center', fontSize: 14, backgroundColor: 'red', marginTop: 10, borderRadius: 5, padding: 5 }}>  Home </Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            </View>
            {showstripe && cartList.length > 0 &&
                <View>
                    <CardField
                        postalCodeEnabled={false}
                        placeholders={{
                            number: '4242 4242 4242 4242',
                        }}
                        cardStyle={{
                            backgroundColor: 'white',
                            textColor: '#000000',
                        }}
                        style={{
                            width: '90%',
                            height: 50,
                            marginLeft: 20,
                            marginRight: 20

                        }}
                        onCardChange={(cardDetails) => {
                            console.log('cardDetails', cardDetails);
                        }}
                        onFocus={(focusedField) => {
                            console.log('focusField', focusedField);
                        }}
                    />
                    <TouchableOpacity onPress={() => { !loading && handlePayPress() }}>
                        <View style={{
                            width: responsiveWidth(90),
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: !loading ? '#28B8EA' : '#cccc',
                            margin: 20,
                            borderRadius: 10
                        }}>
                            <Text style={{ color: 'white', textAlign: 'center', fontSize: 14 }}>Pay</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            }

        </StripeProvider>

    );
}