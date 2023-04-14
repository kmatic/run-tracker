import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";

import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";

type TaskType = {
    error: TaskManager.TaskManagerError | null;
    data: {
        location: Location.LocationObject[];
    };
};

const TASK_GET_LOCATION = "TASK_GET_LOCATION";

const TASK_GET_LOCATION_OPTIONS = {
    distanceInterval: 2,
};

const Record = () => {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [recording, setRecording] = useState<boolean>(false);

    TaskManager.defineTask(TASK_GET_LOCATION, ({ data, error }: any) => {
        //fix this type !!!!!!
        if (error) {
            console.error(error);
            return;
        }
        if (data) {
            const [location] = data.locations;
            console.log("received new location", location);

            setLocation(location);
        }
    });

    const startRecording = async () => {
        await Location.startLocationUpdatesAsync(TASK_GET_LOCATION, TASK_GET_LOCATION_OPTIONS);
        console.log("started recording");
    };

    const stopRecording = async () => {
        await Location.stopLocationUpdatesAsync(TASK_GET_LOCATION);
        console.log("stopped recording");
    };

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("permission to access location was denied");
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            console.log("initial", location);
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
            <View style={styles.buttonView}>
                {recording ? (
                    <>
                        <Pressable
                            style={styles.record}
                            onPress={() => {
                                setRecording(false);
                                stopRecording();
                            }}
                        >
                            <Text style={{ color: "white", fontSize: 18 }}>Stop</Text>
                        </Pressable>
                    </>
                ) : (
                    <Pressable
                        style={styles.record}
                        onPress={() => {
                            setRecording(true);
                            startRecording();
                        }}
                    >
                        <Text style={{ color: "white", fontSize: 18 }}>Start</Text>
                    </Pressable>
                )}
            </View>
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

    buttonView: {
        flexDirection: "row",
        gap: 15,
    },
});

export default Record;
