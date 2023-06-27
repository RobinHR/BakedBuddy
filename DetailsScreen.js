import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetailsScreen = ({ route, darkMode }) => {
    const { item } = route.params;
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        setIsDarkMode(darkMode);
    }, [darkMode]);

    const appStyles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDarkMode ? '#000' : '#fff',
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
        item: {
            padding: 20,
            borderBottomWidth: 1,
            borderBottomColor: isDarkMode ? '#ccc' : '#888',
        },
        itemText: {
            fontSize: 16,
            fontWeight: 'bold',
            color: isDarkMode ? '#fff' : '#000',
        },
    });

    return (
        <View style={appStyles.container}>
            <View style={appStyles.item}>
                <Text style={appStyles.itemText}>{item.name}</Text>
                <Text style={appStyles.itemText}>{item.address}</Text>
                <Text style={appStyles.itemText}>{item.number}</Text>
            </View>
        </View>
    );
};

export default DetailsScreen;
