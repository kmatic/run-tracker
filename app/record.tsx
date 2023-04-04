import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState } from "react";

import * as Location from "expo-location";

const Record = () => {
    const [location, setLocation] = useState<any>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            setErrorMsg("permission to access location was denied");
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
    };

    let text = "waiting...";
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    return (
        <View style={styles.container}>
            <Text>Run</Text>
            <Text>{text}</Text>
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
});

export default Record;
