import * as React from 'react';
import { StyleSheet,Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import SettingsScreen from "./SettingsScreen";
import MapScreen from "./MapScreen";
import AddScreen from "./AddScreen";
import FeedScreen from "./FeedScreen";
import { WebView } from 'react-native-webview';
const Tab = createBottomTabNavigator();
import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase('db.testDb') // returns
function getReports() {
    fetch(BACKEND_URL + "/reports/")
        .then((res) => res.json())
        .then((json) => setReports(json));
}
export default function App() {

    return (

        <NavigationContainer style={{backgroundColor: 'blue'}}>
            <Tab.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;

                        if (route.name === 'Карта') {
                            iconName = focused
                                ? 'map'
                                : 'map-outline';
                        } else if (route.name === 'Настройки') {
                            iconName = focused ? 'settings' : 'settings-outline';
                        } else if (route.name === 'Добавить') {
                            iconName = focused ? 'add-circle' : 'add-circle-outline';
                        } else if (route.name === 'Лента') {
                            iconName = focused ? 'reorder-four' : 'reorder-four-outline';

                        }


                        return <Ionicons name={iconName} size={size} color={color}/>;
                    },
                    tabBarActiveTintColor: 'green',
                    tabBarInactiveTintColor: 'gray',
                })}>
                <Tab.Screen name="Карта" component={MapScreen}/>
                <Tab.Screen name="Лента" component={FeedScreen}
                            onPress={() => {
                                getReports();
                            }}/>
                <Tab.Screen name="Добавить" component={AddScreen} />
                <Tab.Screen name="Настройки" component={SettingsScreen}/>
            </Tab.Navigator>
        </NavigationContainer>

    );

}
const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor:'#ad3030',
            paddingLeft: 10,
        }
    }
)
