import { StyleSheet, Text, View } from 'react-native';
import * as React from "react";


export default function SettingsScreen() {
    return (
        <View style={styles.container}>
            <Text>Настройки!</Text>
        </View>
    );
}
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#ab7979',
            alignItems: 'center',
            justifyContent: 'center',
        },
    });