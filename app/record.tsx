import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";

import * as Location from "expo-location";

const Record = () => {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("permission to access location was denied");
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            console.log(location);
            setLocation(location);
        })();
    }, []);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={{
                    latitude: location?.coords.latitude!,
                    longitude: location?.coords.longitude!,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: location?.coords.latitude!,
                        longitude: location?.coords.longitude!,
                    }}
                />
            </MapView>
            <Pressable style={styles.record} onPress={() => console.log("yeet")}>
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
        justifyContent: "space-between",
    },

    record: {
        backgroundColor: "red",
        width: 90,
        height: 90,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 45,
        marginBottom: 10,
    },

    map: {
        width: "100%",
        height: "80%",
    },
});

export default Record;
