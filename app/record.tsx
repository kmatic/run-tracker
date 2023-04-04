import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useEffect, useState } from "react";
import MapView from "react-native-maps";

import * as Location from "expo-location";

const Record = () => {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const getCurrentLocation = async () => {};

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("permission to access location was denied");
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            console.log(location);
            console.log(location.coords.latitude);
            setLocation(location);
        })();
    }, []);

    return (
        <View style={styles.container}>
            <Text>Run</Text>
            <MapView
                style={styles.map}
                region={{
                    latitude: location?.coords.latitude!,
                    longitude: location?.coords.longitude!,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            ></MapView>
            <Pressable style={styles.record} onPress={() => getCurrentLocation()}>
                <Text style={{ color: "white", fontSize: 18 }}>Start</Text>
            </Pressable>
            <StatusBar style="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "space-around",
    },

    record: {
        backgroundColor: "red",
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
    },

    map: {
        width: "100%",
        height: "75%",
    },
});

export default Record;
