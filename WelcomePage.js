import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutPage = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>À propos de nous</Text>
            <Text style={styles.description}>
                Notre application a pour objectif d'aider les utilisateurs à trouver facilement les pharmacies de garde les plus proches de leur emplacement. Nous comprenons que trouver une pharmacie ouverte en dehors des heures normales peut être une tâche difficile, c'est pourquoi nous avons développé cette application pratique.
            </Text>
            <Text style={styles.description}>
                Notre base de données est constamment mise à jour pour garantir que les informations sur les pharmacies de garde sont précises et fiables. Vous pouvez rechercher les pharmacies ouvertes à proximité de vous, consulter leurs horaires et obtenir des indications pour vous y rendre.
            </Text>
            <Text style={styles.description}>
                Notre mission est de faciliter l'accès aux soins de santé, même en dehors des heures d'ouverture habituelles des pharmacies. Nous espérons que notre application vous sera utile et qu'elle contribuera à améliorer votre expérience dans la recherche de pharmacies de garde.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: 'green',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 16,
    },
});

export default AboutPage;
