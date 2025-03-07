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

const AgePredictionScreen = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState(null);
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);

    const ageCategories = {
        young: {
            label: "Joven",
            image: require("../assets/Images/Young.png"),
        },
        adult: {
            label: "Adulto",
            image: require("../assets/Images/Adult.png"),
        },
        elderly: {
            label: "Anciano",
            image: require("../assets/Images/Elderly.png"),
        },
    };

    const determineAge = async () => {
        try {
            const response = await axios.get(`https://api.agify.io/?name=${name}`);
            const predictedAge = response.data.age;
            setAge(predictedAge);

            if (predictedAge == null || predictedAge <= 0) {
                Alert.alert('El nombre no puede ser nulo ni un numero.');
            } else if (predictedAge < 18) {
                setCategory(ageCategories.young.label);
                setImage(ageCategories.young.image);
            } else if (predictedAge >= 18 && predictedAge < 60) {
                setCategory(ageCategories.adult.label);
                setImage(ageCategories.adult.image);
            } else {
                setCategory(ageCategories.elderly.label);
                setImage(ageCategories.elderly.image);
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Text style={styles.title}>Predecir edad segun el nombre</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Introduce tu nombre"
                    value={name}
                    onChangeText={setName}
                />
                <Button title="Ver mi edad" onPress={determineAge}/>

                {age !== null && (
                    <View style={styles.resultContainer}>
                        <Text style={styles.result}>Edad estimada: {age}</Text>
                        <Text style={styles.result}>Eres un: {category}</Text>
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
    resultContainer: {
        marginTop: 20,
        alignItems: "center",
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

export default AgePredictionScreen;