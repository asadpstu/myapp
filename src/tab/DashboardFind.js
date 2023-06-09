import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function DashboardFind({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>This Find/Search Screen</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate("AppHome")}
            >
                <Text>Go to home</Text>
            </TouchableOpacity>
        </View>
    );
}