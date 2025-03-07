import React from 'react';
import {Button, Image, Linking, ScrollView, StyleSheet, Text, View} from 'react-native';

const wiredNews = [
    {
        id: 1,
        title: "Want to Live Longer, Healthier, and Happier? Cultivate Your Social Connections",
        excerpt: "Social connections are essential for a long and fulfilling life. Here’s what science says about their impact on health.",
        link: "https://www.wired.com/story/want-to-live-longer-healthier-and-happier-cultivate-your-social-connections-wired-health-kasley-killam/"
    },
    {
        id: 2,
        title: "The US Army Is Using ‘CamoGPT’ to Purge DEI From Training Materials",
        excerpt: "A new AI tool is helping the US Army remove diversity, equity, and inclusion (DEI) content from its training programs.",
        link: "https://www.wired.com/story/the-us-army-is-using-camogpt-to-purge-dei-from-training-materials/"
    },
    {
        id: 3,
        title: "Tulsi Gabbard Wants to Declassify Details of a Secret Surveillance Program",
        excerpt: "The former congresswoman has introduced a bill to expose classified government surveillance programs.",
        link: "https://www.wired.com/story/tulsi-gabbard-declassify-details-of-secret-surveillance-program/"
    }
];

const NewsScreen = () => {
    return (
        <ScrollView style={styles.container}>

            <Image
                style={styles.logo}
                source={{uri: 'https://www.caristo.com/wp-content/uploads/2021/12/Wired_logo.svg_.png'}}
            />

            <Text style={styles.title}>Ultimas noticias de Wired</Text>

            {wiredNews.map((item) => (
                <View key={item.id} style={styles.newsItem}>
                    <Text style={styles.newsTitle}>{item.title}</Text>
                    <Text style={styles.newsExcerpt}>{item.excerpt}</Text>
                    <Button
                        title="Ver noticia"
                        onPress={() => Linking.openURL(item.link)}
                    />
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    logo: {
        width: 150,
        height: 50,
        alignSelf: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    newsItem: {
        marginBottom: 20,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    newsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    newsExcerpt: {
        fontSize: 16,
        color: '#555',
        marginVertical: 10,
    },
});

export default NewsScreen;
