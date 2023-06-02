import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import welcome from './WelcomePage';
import pharmacy from './pharmacy';
import contact from './ContactPage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <View style={styles.container}>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === 'About us') {
                                iconName = focused
                                    ? 'ios-information-circle'
                                    : 'ios-information-circle-outline';
                            } else if (route.name === 'Home') {
                                iconName = 'ios-list';
                            } else if (route.name === 'Contact') {
                                iconName = focused ? 'ios-call' : 'ios-call-outline';
                            }

                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                        tabBarActiveTintColor: 'tomato',
                        tabBarInactiveTintColor: 'gray',
                    })}
                >
                    <Tab.Screen name="Home" component={pharmacy} />
                    <Tab.Screen name="About us" component={welcome} />
                    <Tab.Screen name="Contact" component={contact} />
                </Tab.Navigator>
            </View>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
