import React, {useState} from "react";
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
} from "react-native";
import axios from "axios";

const GenderPredictionScreen = () => {
    const [name, setName] = useState("");
    const [gender, setGender] = useState(null);
    const [image, setImage] = useState(null);

    const genderImages = {
        male: require("../assets/Images/blue.png"),
        female: require("../assets/Images/Rose.png"),
    };

    const determineGender = async () => {
        if (!name) {
            Alert.alert('El nombre no puede estar vacio.');
            return;
        }

        if (/\d/.test(name)) {
            Alert.alert('El nombre no puede contener numeros.');
            return;
        }

        try {
            const response = await axios.get(`https://api.genderize.io/?name=${name}`);
            const detectedGender = response.data.gender;
            setGender(detectedGender);

            if (detectedGender === "male" || detectedGender === "female") {
                // @ts-ignore
                setImage(genderImages[detectedGender]);
            } else {
                setImage(null);
            }
        } catch (error) {
            console.error("Error", error);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Text style={styles.title}>Predecir generos por nombre</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Introduce tu nombre"
                    value={name}
                    onChangeText={setName}
                />
                <Button title="Ver mi genero" onPress={determineGender}/>

                {gender && (
                    <View>
                        <Text style={styles.result}>Tuu genero es: {gender}</Text>
                        {image && <Image source={image} style={styles.image}/>}
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    input: {
        width: "80%",
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    result: {
        fontSize: 18,
        marginTop: 10,
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 10,
    },
});

export default GenderPredictionScreen;
