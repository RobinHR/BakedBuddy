import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


function FavoritesScreen({ navigation, isDarkMode }) {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        getFavorites();
    }, [favorites]);

    const getFavorites = async () => {
        try {
            const favoritesData = await AsyncStorage.getItem('favorites');
            if (favoritesData) {
                const favoritesArray = JSON.parse(favoritesData);
                setFavorites(favoritesArray);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const renderFavoriteItem = ({ item }) => (
        <View style={appStyles.item}>
            <Text style={appStyles.itemText}>{item.name}</Text>
            <Text style={appStyles.itemText}>{item.address}</Text>
            <Text style={appStyles.itemText}>{item.number}</Text>
        </View>
    );

    // Effect hook om de app-stijlen bij te werken wanneer de isDarkMode-waarde verandert
    useEffect(() => {
        updateAppStyles(isDarkMode);
    }, [isDarkMode]);

    return (
        <View style={appStyles.container}>
            <Text style={appStyles.itemText}>Hallo! Dit zijn je favoriete Coffeeshops!</Text>
            <FlatList
                data={favorites}
                renderItem={renderFavoriteItem}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={<Text style={appStyles.itemText}>Geen favorieten gevonden</Text>}
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
    });

    setAppStyles(styles);
};

// Lege stijlen voor de app
let appStyles = StyleSheet.create({});

// Functie om de app-stijlen bij te werken
const setAppStyles = (styles) => {
    appStyles = styles;
};

export default FavoritesScreen;
