import { Tabs } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const Layout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: () => {
                        return <Ionicons name="ios-home-outline" size={24} color="black" />;
                    },
                }}
            />
            <Tabs.Screen
                name="record"
                options={{
                    title: "Record",
                    tabBarIcon: () => {
                        return <FontAwesome5 name="running" size={24} color="black" />;
                    },
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: () => {
                        return <Ionicons name="ios-person-outline" size={24} color="black" />;
                    },
                }}
            />
        </Tabs>
    );
};

export default Layout;
