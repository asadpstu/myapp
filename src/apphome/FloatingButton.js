import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Animated, Text, Image, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';
export default FloatingButton = (props) => {

    const { height, width } = props;
    const [viewHeight, setViewHeight] = useState(new Animated.Value(height));
    const [viewWidth, setViewWidth] = useState(new Animated.Value(width));

    const adjustHeightWidth = () => {
        Animated.parallel([
            Animated.timing(viewHeight, {
                toValue: height,
                duration: 500,
                useNativeDriver: false,
            }),

            Animated.timing(viewWidth, {
                toValue: width,
                duration: 500,
                useNativeDriver: false,
            })]).start();
    };

    useEffect(() => {
        adjustHeightWidth()
    }, [height, width])


    return (
        <TouchableOpacity
            onPress={props.CartList} style={props.style}
        >
            <Animated.View
                style={{
                    backgroundColor: 'rgba(255,255,255,.8)',
                    width: viewWidth,
                    height: viewHeight,
                    borderBottomStartRadius: 30,
                    borderTopStartRadius: 30,
                    borderTopWidth: 2,
                    borderLeftWidth: 2,
                    borderColor: "rgba(255,255,255,.8)",
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingLeft: 10,
                    paddingTop: 5,
                    flexDirection: 'column'
                }}
            >

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        resizeMode="cover"
                        style={{
                            width: 30,
                            height: 30,
                        }}
                        source={require('../../asset/image/cart.png')}
                    />
                    {props.cartListCount > 0 ? (
                        <View
                            style={{

                                position: 'absolute',

                                width: 31,
                                height: 45,
                                borderRadius: 15 / 2,
                                // right: height == 50 ? 3 : 3,
                                // top: height == 50 ? 5 : 11,
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingLeft: 15,
                                marginBottom: 5

                            }}>
                            <Text
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: "#FFFFFF",
                                    fontSize: 12,
                                    backgroundColor: height === 70 ? 'rgba(255,0,0,.9)' : 'rgba(255,0,0,.7)',
                                    paddingTop: 3,
                                    marginBottom: 20,
                                    height: 22,
                                    width: 22,
                                    borderRadius: 50,
                                    textAlign: 'center',
                                    marginRight: 3
                                }}>
                                {props.cartListCount}

                            </Text>
                        </View>
                    ) : null}
                    <View>

                    </View>
                </View>

            </Animated.View>
        </TouchableOpacity >
    )
}