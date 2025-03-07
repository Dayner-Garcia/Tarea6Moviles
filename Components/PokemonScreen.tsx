import React, {useState} from 'react';
import {
    Alert,
    Button,
    Image,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import axios from 'axios';

const PokemonScreen = () => {
    const [pokemonName, setPokemonName] = useState('');
    const [pokemonData, setPokemonData] = useState(null);
    const [error, setError] = useState('');

    const fetchPokemonData = async () => {

        if (!pokemonName) {
            Alert.alert("Por favor, ingresa un nombre de Pokemon.");
            return;
        }
        // @ts-ignore
        if (!isNaN(pokemonName)) {
            Alert.alert("Por favor, ingresa un numero de pokemon valido.");
            return;
        }

        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
            setPokemonData(response.data);
            setError('');
        } catch (error) {
            // @ts-ignore
            if (error.response && error.response.status === 404) {
                setError('No se pudo encontrar el Pokemon. Verifica su nombre.');
            } else {
                setError('Hubo un problema al obtener los datos del Pokémon.');
            }
            setPokemonData(null);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Text style={styles.header}>Busca tu Pokemon</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ingresa el nombre de un Pokemon"
                    value={pokemonName}
                    onChangeText={setPokemonName}
                />
                <Button title="Buscar" onPress={fetchPokemonData}/>

                {error ? (
                    <Text style={styles.error}>{error}</Text>
                ) : pokemonData ? (
                    <View style={styles.pokemonContainer}>
                        <Image
                            source={{uri: pokemonData.sprites.front_default}}
                            style={styles.pokemonImage}
                        />
                        <Text style={styles.pokemonName}>
                            {pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}
                        </Text>

                        <Text style={styles.pokemonDetail}>Experiencia base: {pokemonData.base_experience}</Text>

                        <Text style={styles.pokemonDetail}>Habilidades:</Text>

                        {pokemonData.abilities.map((ability, index) => (
                            <Text key={index} style={styles.pokemonAbility}>{ability.ability.name}</Text>
                        ))}
                    </View>
                ) : null}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f8f8f8',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        padding: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    pokemonContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    pokemonImage: {
        width: 150,
        height: 150,
    },
    pokemonName: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
    },
    pokemonDetail: {
        fontSize: 18,
        marginVertical: 5,
    },
    pokemonAbility: {
        fontSize: 16,
        color: '#555',
    },
    error: {
        color: 'red',
        fontSize: 18,
        marginTop: 10,
    },
});

export default PokemonScreen;
