import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

function HomeScreen({ data, navigation, setFavorites, favorites, darkMode }) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        setIsDarkMode(darkMode);
    }, [darkMode]);

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

    const handleItemPress = async (item) => {
        console.log(item);
        const favorites = await AsyncStorage.getItem('favorites');
        let favoritesArray = favorites ? JSON.parse(favorites) : [];

        const index = favoritesArray.findIndex((favorite) => favorite.id === item.id);
        if (index === -1) {
            favoritesArray.push(item);
        } else {
            favoritesArray.splice(index, 1);
        }

        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
        setFavorites(favoritesArray);
    };

    const renderButtonTitle = (item) => {
        const isFavorite = favorites.findIndex((favorite) => favorite.id === item.id) !== -1;
        return isFavorite ? 'Remove' : 'Add';
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={appStyles.item}
            onPress={() => navigation.navigate('Detail', { item })}
        >
            <Text style={appStyles.itemText}>{item.name}</Text>
            <Text style={appStyles.itemText}>{item.address}</Text>
            <Text style={appStyles.itemText}>{item.number}</Text>
            <TouchableOpacity
                style={[appStyles.button, { backgroundColor: isDarkMode ? '#888' : '#ccc' }]}
                onPress={() => handleItemPress(item)}
            >
                <Text style={appStyles.buttonText}>{renderButtonTitle(item)}</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={appStyles.container}>
            <FlatList
                style={appStyles.listContainer}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={<Text>Loading...</Text>}
            />
        </View>
    );
}

export default HomeScreen;
