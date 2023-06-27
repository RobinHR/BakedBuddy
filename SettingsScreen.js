import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

function SettingsScreen({ isDarkMode, toggleColorScheme }) {
    const data = [
        {
            key: '1',
            title: `Toggle ${isDarkMode ? 'Light' : 'Dark'} Mode`,
            onPress: toggleColorScheme
        }
    ];

    const appStyles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDarkMode ? '#000' : '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
        listContainer: {
            flex: 1,
            width: '100%',
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
        button: {
            backgroundColor: isDarkMode ? '#000' : '#fff',
            padding: 10,
            marginTop: 10,
            borderRadius: 5,
            borderColor: isDarkMode ? '#ccc' : '#888',
            borderWidth: 1,
        },
        buttonText: {
            color: isDarkMode ? '#fff' : '#000',
            fontSize: 16,
            fontWeight: 'bold',
        },
    });

    const renderItem = ({ item }) => {
        return (
            <View style={appStyles.item}>
                <Text style={appStyles.itemText}>{item.title}</Text>
                <TouchableOpacity style={[appStyles.button, { backgroundColor: isDarkMode ? '#888' : '#ccc' }]} onPress={item.onPress}>
                    <Text style={appStyles.buttonText}>{item.title}</Text>
                </TouchableOpacity>
            </View>
        );
    };


    // Effect hook om de app-stijlen bij te werken wanneer de isDarkMode-waarde verandert
    useEffect(() => {
        updateAppStyles(isDarkMode);
    }, [isDarkMode]);

    return (
        <View style={appStyles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.key}
                style={appStyles.listContainer}
            />
        </View>
    );
}

// Functie om de app-stijlen bij te werken op basis van de kleurenschema-modus
const updateAppStyles = (isDarkMode) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDarkMode ? '#000' : '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
        listContainer: {
            flex: 1,
            width: '100%',
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
        button: {
            backgroundColor: isDarkMode ? '#000' : '#fff',
            padding: 10,
            marginTop: 10,
            borderRadius: 5,
            borderColor: isDarkMode ? '#ccc' : '#888',
            borderWidth: 1,
        },
        buttonText: {
            color: isDarkMode ? '#fff' : '#000',
            fontSize: 16,
            fontWeight: 'bold',
        },
    });

    setAppStyles(styles);
};

// Lege stijlen voor de app
let appStyles = StyleSheet.create({});

// Functie om de app-stijlen bij te werken
const setAppStyles = (styles) => {
    appStyles = styles;
};

export default SettingsScreen;
