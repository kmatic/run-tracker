import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

const Record = () => {
    return (
        <View style={styles.container}>
            <Text>Run</Text>
            <StatusBar style="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default Record;
