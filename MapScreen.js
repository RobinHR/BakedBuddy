import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

function MapScreen({ data }) {
    const [currentLocation, setCurrentLocation] = useState(null);

    useEffect(() => {
        getCurrentLocation();
    }, []);

    const getCurrentLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Location permission denied');
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            setCurrentLocation(location.coords);
        } catch (error) {
            console.log('Error getting current location:', error);
        }
    };

    const CustomMarker = () => {
        return (
            <View style={styles.currentLocationMarker}>
                <Text style={styles.currentLocationText}>Current Location</Text>
            </View>
        );
    };

    return (
        <View style={styles.mapsContainer}>
            <MapView
                style={styles.map}
                region={{
                    latitude: 51.92481195950367,
                    longitude: 4.473828507584491,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {currentLocation && (
                    <Marker
                        coordinate={{
                            latitude: currentLocation.latitude,
                            longitude: currentLocation.longitude,
                        }}
                        title="Current Location"
                        customMarker={<CustomMarker />}
                    />
                )}

                {data.map((item) => (
                    <Marker
                        key={item.id}
                        coordinate={{
                            latitude: item.coordinate.latitude,
                            longitude: item.coordinate.longitude,
                        }}
                        title={item.name}
                    />
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    mapsContainer: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    currentLocationMarker: {
        backgroundColor: 'green',
        borderRadius: 5,
        padding: 5,
    },
    currentLocationText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default MapScreen;
