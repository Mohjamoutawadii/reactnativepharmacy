import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ContactPage = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Contact Us</Text>
            <Text style={styles.subtitle}>Email: Mohjamutawadii1@gmail.com</Text>
            <Text style={styles.subtitle}>Email: Ayoub.mechkour2020@gmail.com</Text>
            <Text style={styles.subtitle}>Phone: +212 123-456-7890</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: 'green',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 8,
    },
});

export default ContactPage;
