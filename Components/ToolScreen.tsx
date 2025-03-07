import React from "react";
import {Image, StyleSheet, View} from "react-native";

const ToolboxScreen = () => {
    return (
        <View style={styles.container}>
            <Image source={require("../assets/Images/toolbox.png")} style={styles.toolboxImage}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    toolboxImage: {
        width: 150,
        height: 150,
    },
});

export default ToolboxScreen;