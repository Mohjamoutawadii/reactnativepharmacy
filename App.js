import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Modal,
    Button,
    Switch,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Linking } from 'react-native';

function App() {
    const [pharm, setPharmacies] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [zoneOptions, setZoneOptions] = useState([]);
    const [zone, setZone] = useState('');
    const [garde, setGarde] = useState('');
    const [selectedPharmacy, setSelectedPharmacy] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const baseURL = 'https://backend-ashy-beta.vercel.app';

    const handleButtonClick = (pharmacy) => {
        setSelectedPharmacy(pharmacy);
        setShowModal(true);
    };

    const handleCityChange = (value) => {
        setSelectedCity(value);
    };
    const CustomButton = ({ title, onPress }) => (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );

    useEffect(() => {
        axios
            .get(`${baseURL}/Villes`)
            .then((response) => {
                setCities(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (selectedCity) {
            axios
                .get(`${baseURL}/zones?ville=${selectedCity}`)
                .then((response) => {
                    setZoneOptions(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [selectedCity]);

    const handleSubmit = async () => {
        try {
            const response = await axios.get(`${baseURL}/pharmacies`, {
                params: {
                    ville: selectedCity,
                    zone,
                    garde,
                },
            });
            setPharmacies(response.data);
        } catch (error) {
            // Display a user-friendly error message
            alert('Please try again later.');
            console.error(error);
        }
    };

    const redirectToGoogleMaps = (pharmacy) => {
        const { latitude, longitude } = pharmacy;
        const url = `https://www.google.com/maps/place/${latitude},${longitude}`;
        Linking.openURL(url);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require('./logo.jpg')} style={styles.logo} />
                <Text style={styles.logoText}>Votre Assistant Pour</Text>
                <Text style={styles.logoText}>Trouver Des Pharmacies</Text>
            </View>

            <Text style={styles.title}>Rechercher Des Pharmacies</Text>
            <View style={styles.form}>
                <Text style={styles.label}>VILLE</Text>
                <Picker
                    style={styles.select}
                    selectedValue={selectedCity}
                    onValueChange={handleCityChange}
                    mode="dropdown"
                >
                    <Picker.Item label="Sélectionner une ville" value="" />
                    {cities.map((city) => (
                        <Picker.Item key={city._id} label={city.name} value={city.name} />
                    ))}
                </Picker>

                <Text style={styles.label}>ZONE</Text>
                <Picker
                    style={styles.select}
                    selectedValue={zone}
                    onValueChange={(value) => setZone(value)}
                    mode="dropdown"
                >
                    <Picker.Item label="Sélectionner une zone" value="" />
                    {zoneOptions.map((zone) => (
                        <Picker.Item key={zone._id} label={zone.name} value={zone.name} />
                    ))}
                </Picker>
                <Text style={styles.label}>GARDE</Text>
                <Picker
                    style={styles.select}
                    selectedValue={garde}
                    onValueChange={(value) => setGarde(value)}
                    mode="dropdown"
                >
                    <Picker.Item label="Sélectionner une garde" value="" />
                    <Picker.Item label="Jour" value="jour" />
                    <Picker.Item label="Nuit" value="nuit" />
                </Picker>

                {/* <Button

                    title="Rechercher"
                    backgroundColor="green"
                    onPress={handleSubmit} /> */}
                <CustomButton
                    title="Rechercher"
                    onPress={handleSubmit}
                />

                <ScrollView style={styles.results}>
                    {pharm.map((pharmacy) => (
                        <TouchableOpacity
                            key={pharmacy._id}
                            style={styles.pharmacyCard}
                            onPress={() => redirectToGoogleMaps(pharmacy)}

                        >
                            <Text style={styles.pharmacyName}>{pharmacy.name}</Text>
                            <Text style={styles.pharmacyZone}>{pharmacy.zone}</Text>
                            <Text style={styles.clique}>cliquez ici pour voir la localisation sur Google maps</Text>


                            <CustomButton
                                title="Détails"

                                onPress={() => handleButtonClick(pharmacy)}
                            />
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <Modal visible={showModal} animationType="slide">
                    <View style={styles.modalContent}>
                        {selectedPharmacy && (
                            <>
                                <Text style={styles.modalTitle}>
                                    Détails de la pharmacie
                                </Text>
                                <Image
                                    source={{ uri: selectedPharmacy.src }}
                                    style={styles.modalImage}
                                />
                                <Text style={styles.modalText}>
                                    Nom: {selectedPharmacy.name}
                                </Text>
                                <Text style={styles.modalText}>
                                    Zone: {selectedPharmacy.zone}
                                </Text>
                                <CustomButton
                                    title="Fermer"
                                    onPress={() => setShowModal(false)}
                                />
                            </>
                        )}
                    </View>
                </Modal>
            </View >
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    logoText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "green",
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: "red"
    },
    form: {
        width: '100%',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: 'green',
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
    select: {
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    results: {
        maxHeight: 300,
        marginBottom: 20,
    },
    pharmacyCard: {
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    pharmacyName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    pharmacyZone: {
        fontSize: 16,
        marginBottom: 15,
    },
    pharmacyGarde: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 10,
    },
    modalImage: {
        width: 200,
        height: 200,
        marginBottom: 10,
    },
    clique: {
        marginBottom: 15,
    },
    button: {
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },




});

export default App;
