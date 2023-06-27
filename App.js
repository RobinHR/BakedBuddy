import {StatusBar} from 'expo-status-bar';
import {Button, StyleSheet, Text, View, FlatList, TouchableOpacity, useColorScheme, Pressable} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FavoritesScreen from "./FavoritesScreen";
import MapScreen from "./MapScreen";
import SettingsScreen from "./SettingsScreen";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {createStackNavigator} from "@react-navigation/stack";
import DetailsScreen from "./DetailsScreen";
import {useNavigation} from '@react-navigation/native';
import HomeScreen from "./HomeScreen";


export {appStyles};

// Maak een Tab Navigator
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Hoofdcomponent van de app
export default function App() {
    // State voor de data van coffeeshops en de kleurenschema-modus
    const [data, setData] = useState([]);
    const colorScheme = useColorScheme();
    const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');
    const [favorites, setFavorites] = useState([]);


    // Gebruik de useEffect-hook om de data op te halen bij het laden van de app
    useEffect(() => {
        fetch('https://stud.hosted.hr.nl/0926222/coffeeshops2.json')
            .then(response => response.json())
            .then(jsonData => setData(jsonData.coffeeshops))
            .catch(error => console.error(error));

        loadFavorites();
    }, []);

    // Gebruik de useEffect-hook om de app-stijlen bij te werken wanneer de kleurenschema-modus verandert
    useEffect(() => {
        updateAppStyles();
    }, [isDarkMode]);

    // Functie om de app-stijlen bij te werken op basis van de kleurenschema-modus
    const updateAppStyles = () => {
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
                backgroundColor: '#ccc', // Pas de gewenste achtergrondkleur aan
                padding: 10,
                marginTop: 10,
                borderRadius: 5,
            },
            buttonText: {
                color: '#ffffff', // Pas de gewenste tekstkleur aan
                fontSize: 16,
                fontWeight: 'bold',
            },
        });

        setAppStyles(appStyles);
    };

    // Functie om de kleurenschema-modus om te schakelen wanneer er op de knop wordt geklikt
    const toggleColorScheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };


    const loadFavorites = async () => {
        const lsFavorites = await AsyncStorage.getItem('favorites');
        let favoritesArray = favorites ? JSON.parse(lsFavorites) : [];
        setFavorites(favoritesArray);
    }


    // Render de app-component
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: ({color, size}) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = 'home';
                        } else if (route.name === 'Favorites') {
                            iconName = 'star';
                        } else if (route.name === 'Settings') {
                            iconName = 'cog';
                        } else if (route.name === 'Map') {
                            iconName = 'map';
                        }

                        return <MaterialCommunityIcons name={iconName} size={size} color={color}/>;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}
            >
                <Tab.Screen name="Home" options={{title: 'Home'}}>
                    {() => (
                        <Stack.Navigator>
                            <Stack.Screen name="Home" options={{headerShown: false}}>
                                {(props) => (
                                    <HomeScreen
                                        {...props}
                                        data={data}
                                        setFavorites={setFavorites}
                                        favorites={favorites}
                                        darkMode={isDarkMode}
                                    />
                                )}
                            </Stack.Screen>
                            <Stack.Screen name="Detail" options={{headerShown: false}}>
                                {(props) => (
                                    <DetailsScreen
                                        {...props}
                                        darkMode={isDarkMode}
                                        toggleColorScheme={toggleColorScheme}
                                    />
                                )}
                            </Stack.Screen>

                        </Stack.Navigator>
                    )}
                </Tab.Screen>

                <Tab.Screen name="Favorites" options={{title: 'Favorites'}}>
                    {() => (
                        <FavoritesScreen
                            isDarkMode={isDarkMode}
                            toggleColorScheme={toggleColorScheme}
                        />
                    )}
                </Tab.Screen>
                <Tab.Screen name="Settings" options={{title: 'Settings'}}>
                    {() => (
                        <SettingsScreen
                            isDarkMode={isDarkMode}
                            toggleColorScheme={toggleColorScheme}
                        />
                    )}
                </Tab.Screen>
                <Tab.Screen name="Map" options={{title: 'Map'}}>
                    {() => <MapScreen data={data} appStyles={appStyles}/>}
                </Tab.Screen>
            </Tab.Navigator>
            <StatusBar style="auto"/>
        </NavigationContainer>
    );
}

// Lege stijlen voor de app
let appStyles = StyleSheet.create({});

// Functie om de app-stijlen bij te werken
const setAppStyles = (styles) => {
    appStyles = styles;
};
