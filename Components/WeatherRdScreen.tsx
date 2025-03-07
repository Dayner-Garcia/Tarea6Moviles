import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import axios from 'axios';

const WeatherScreen = () => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
                    params: {
                        latitude: 18.4861,
                        longitude: -69.9312,
                        daily: 'temperature_2m_max,temperature_2m_min',
                        units: 'metric',
                        lang: 'es',
                    },
                });
                setWeatherData(response.data);
            } catch (error) {
                console.error('Error al obtener datos del clima:', error);
            }
        };

        fetchWeather();
    }, []);

    if (!weatherData) {
        return (
            <View style={styles.container}>
                <Text>Cargando datos del clima...</Text>
            </View>
        );
    }

    // @ts-ignore
    const dailyData = weatherData.daily;
    return (
        <View style={styles.container}>
            <Text style={styles.cityName}>Santo Domingo</Text>
            <Text style={styles.temperature}>Max: {dailyData.temperature_2m_max[0]}°C</Text>
            <Text style={styles.temperature}>Min: {dailyData.temperature_2m_min[0]}°C</Text>
            <Text style={styles.description}>Pronostico para hoy</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    cityName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    temperature: {
        fontSize: 48,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 18,
        color: '#555',
    },
});

export default WeatherScreen;
