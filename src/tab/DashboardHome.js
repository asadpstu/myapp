
import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DashboardHome({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>This Home Screen</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate("AppHome")}
            >
                <Text>Go to home</Text>
            </TouchableOpacity>
        </View>

    );
}


