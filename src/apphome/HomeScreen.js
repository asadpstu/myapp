import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity
                onPress={() => navigation.navigate("DrawerScreen")}
            >
                <Text>Home Screen</Text>
            </TouchableOpacity>
        </View>
    );
}