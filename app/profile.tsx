import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Tabs } from "expo-router";

export default function Profile() {
    return (
        <View style={styles.container}>
            <Tabs.Screen options={{ title: "Profile" }} />
            <Text>Open up App.tsx to start working on your afsdfpp!</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
