import React, { useState } from 'react';
import {View, StyleSheet, Button} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
const BACKEND_URL = "http://192.168.3.29:5000";
import { For } from 'react-loops'
const Map = () => {
    const [mapRegion, setmapRegion] = useState({
        latitude: 61.26,
        longitude: 73.40,
        latitudeDelta: 0.0930,
        longitudeDelta: 0.0430,
    });
    const [markers, setMarkers] = useState([]);

    function getMarkers() {
        fetch(BACKEND_URL + "/markers/")
            .then((res) => res.json())
            .then((json) => setMarkers(json));
    }

    // function create_marker(lat,long) {
    //     <Marker draggable
    //             coordinate={{ latitude : lat , longitude : long}}
    //             title={"title3"}
    //             description={"description3"}
    //     />
    //
    // }
    return (

        <View style={styles.container}>
            <Button title={"Обновить"} onPress={() => {
                getMarkers();
            }}/>

            <MapView
                style={{ alignSelf: 'stretch', height: '100%' }}
                region={mapRegion}
            >
                <For of={markers}
                     as={item =>
                         <Marker coordinate={{ latitude: item.latitude, longitude: item.longitude }}
                                 title={item.title}
                                 description={item.description}
                            />}/>
            {/*<Marker*/}
            {/*        coordinate={{ latitude : 61.26 , longitude : 73.40 }}*/}
            {/*        title={"title"}*/}
            {/*        description={"description"}*/}

            {/*/>*/}
            {/*    <Marker*/}
            {/*            coordinate={{ latitude : 61.30 , longitude : 73.40 }}*/}
            {/*            title={"title2"}*/}
            {/*            description={"description2"}*/}
            {/*    />*/}
            </MapView>
        </View>
    );
};
export default Map
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
