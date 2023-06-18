import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Animated, Text, Image, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';
export default FloatingButtonRight = (props) => {

    return (
        <TouchableOpacity
            onPress={props.goHome} style={props.style}
        >
            <Animated.View
                style={{
                    //backgroundColor: 'rgba(255,255,255,.8)',
                    width: props.width,
                    height: props.height,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingLeft: 10,

                    flexDirection: 'column'
                }}
            >

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        resizeMode="cover"
                        style={{
                            width: 25,
                            height: 25,
                        }}
                        source={require('../../asset/image/leftarrow.png')}
                    />
                    <View>

                    </View>
                </View>

            </Animated.View>
        </TouchableOpacity >
    )
}