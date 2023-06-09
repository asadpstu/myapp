import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function DashboardContact({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>This Contact Screen</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate("AppHome")}
            >
                <Text>Go to home</Text>
            </TouchableOpacity>
        </View>
    );
}