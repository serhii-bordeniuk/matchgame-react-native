import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import GameControls from "./components/GameControls";
import GameInfo from "./components/GameInfo";
import Main from "./screens/Main";

export default function App() {
    return (
        <View style={style.appContainer}>
            <StatusBar style="auto" />
            <Main />
        </View>
    );
}

const style = StyleSheet.create({
    appContainer: {
        paddingTop: 60,
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: "#faebd7",
    },
});
