import { View, Text, Image, StyleSheet } from "react-native";

type GameInfoProps = {
    matchesLeft: number;
    playerMatches: number;
    computerMatches: number;
};

const GameInfo: React.FC<GameInfoProps> = ({ matchesLeft, playerMatches, computerMatches }) => {
    const renderMatches = (count: number) => {
        const matches = [];

        for (let i = 0; i < count; i++) {
            matches.push(
                <Image key={i} style={styles.image} source={require("../assets/matchImage.png")} />
            );
        }
        return matches;
    };

    return (
        <View style={styles.gameInfoContainer}>
            <Text style={styles.gameTitle}>MatchGame</Text>
            <View style={styles.matchesContainer}>
                <Text style={styles.matchestext}>Matches left: {matchesLeft}</Text>
                <View style={styles.matchesWrapper}>{renderMatches(matchesLeft)}</View>
                <Text style={styles.matchestext}>Your matches: {playerMatches}</Text>
                <View style={styles.matchesWrapper}>{renderMatches(playerMatches)}</View>
                <Text style={styles.matchestext}>Computer matches: {computerMatches}</Text>
                <View style={styles.matchesWrapper}>{renderMatches(computerMatches)}</View>
            </View>
        </View>
    );
};

export default GameInfo;

const styles = StyleSheet.create({
    gameInfoContainer: {
        alignItems: "center",
    },
    gameTitle: {
        fontSize: 60,
        textAlign: "center",
    },
    matchesContainer: {
        alignItems: "center",
        gap: 15,
    },
    matchestext: {
        fontSize: 20,
    },
    image: {
        width: 5,
        height: 42,
        margin: 2,
    },
    matchesWrapper: {
        flexDirection: "row",
    },
});
