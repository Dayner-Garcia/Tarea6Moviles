import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";

const AboutMe = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/Images/me.jpg")}
                style={styles.image}
            />
            <Text style={styles.name}>Dayner Alejandro Garcia Tamares</Text>
            <Text style={styles.info}>Matrícula: 2023 - 1203</Text>
            <Text style={styles.info}>Telefono: 829 - 574 - 0431</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 20,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    info: {
        fontSize: 16,
        color: "#555",
        marginBottom: 5,
    },
});

export default AboutMe;
