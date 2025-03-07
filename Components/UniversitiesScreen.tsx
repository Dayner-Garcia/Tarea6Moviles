import React, {useState} from 'react';
import {
    Alert,
    Button,
    FlatList,
    Keyboard,
    Linking,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import axios from 'axios';

const UniversitiesScreen = () => {
    const [country, setCountry] = useState('');
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchUniversities = async () => {
        if (!country) return;

        setLoading(true);
        try {
            const response = await axios.get(`http://universities.hipolabs.com/search?country=${country}`);
            setUniversities(response.data);

            if (response.data.length === 0) {
                Alert.alert('No se encontraron universidades', 'Por favor, verifica el nombre del país ingresado.');
                setUniversities([]);
            } else {
                setUniversities(response.data);
            }

        } catch (error) {
            console.error('Error:', error);
        }
        setLoading(false);
    };

    // @ts-ignore
    const renderUniversity = ({item}) => (
        <View style={styles.universityItem}>
            <Text style={styles.universityName}>{item.name}</Text>
            <Text style={styles.universityDomain}>Dominio: {item.domains[0]}</Text>
            <Button title="Ir a la pagina" onPress={() => Linking.openURL(item.web_pages[0])}/>
        </View>
    );

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Text style={styles.title}>Introduce el nombre de tu pais </Text>
                <TextInput
                    style={styles.input}
                    value={country}
                    onChangeText={setCountry}
                    placeholder="Ejemplo: Dominican Republic"
                />
                <Button title="Buscar universidades" onPress={fetchUniversities}/>

                {loading ? (
                    <Text>Loading...</Text>
                ) : (
                    <FlatList
                        data={universities}
                        renderItem={renderUniversity}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 12,
        borderRadius: 5,
    },
    universityItem: {
        marginBottom: 20,
        borderBottomWidth: 1,
        paddingBottom: 10,
    },
    universityName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    universityDomain: {
        fontSize: 14,
        color: '#555',
    },
});

export default UniversitiesScreen;
