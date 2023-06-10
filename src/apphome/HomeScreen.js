import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export default function HomeScreen({ navigation }) {
    return (
        <SafeAreaView>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("DrawerScreen")}
                >
                    <Text>Home Screen hello</Text>
                </TouchableOpacity>
            </View>

            <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                padding: 5,
                margin: 5,
                borderColor: '#ccc',
                borderWidth: 2,
                borderRadius: 10
            }}>
                <View style={{
                    height: 100,
                    width: '60%'
                }}
                >
                    <Text style={{ margin: 1 }}> Nostalgic Era </Text>
                    <Text style={{ margin: 1 }}> Movies </Text>
                    <Text style={{ margin: 1 }}> Released on 2018 </Text>
                    <Text style={{ margin: 2 }}> Released on 2018 </Text>
                    <Text style={{ margin: 2 }}> $ 10,00,00,000 </Text>
                </View>

                <View style={{
                    height: 100,
                    width: '38%',
                    padding: 1
                }}

                >
                    <Image source={require('../../asset/image/onboard/snapchat-3-512-3.png')}
                        style={{
                            width: responsiveWidth(30),
                            height: responsiveHeight(17),
                            padding: 1,
                            alignSelf: 'flex-end'
                        }}
                    />
                </View>
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("DrawerScreen")}
                >
                    <Text>Home Screen hello</Text>
                </TouchableOpacity>
            </View>


        </SafeAreaView>
    );
}

