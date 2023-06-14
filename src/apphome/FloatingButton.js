import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Animated, Text, Image } from 'react-native';

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
            onPress={props.onPress} style={props.style}
        >
            <Animated.View
                style={{
                    backgroundColor: "rgba(0,255,0,.5)",
                    width: viewWidth,
                    height: viewHeight,
                    borderBottomStartRadius: 1,
                    borderTopStartRadius: 100,
                    borderTopWidth: 3,
                    borderLeftWidth: 3,
                    borderColor: "black",
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingLeft: 10,
                    paddingTop: 10
                }}
            >

                <Image
                    resizeMode="contain"
                    style={{
                        width: 40,
                        height: 40,
                    }}
                    source={require('../../asset/image/free-add-to-cart-icon-3046-thumb.png')}
                />
            </Animated.View>
        </TouchableOpacity >
    )
}