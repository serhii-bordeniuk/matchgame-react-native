import { StyleSheet, View, Button, Switch, Text } from "react-native";

type GameControlsProps = {
    isComputerFirst: boolean;
    setIsComputerFirst: (value: boolean) => void;
    onStartGame: () => void;
    onRestart: () => void;
    winner: string;
    gameStarted: boolean;
    handleMatchesDraw: (numMatches: number) => void;
    isPlayerTurn: boolean;
};

const GameControls: React.FC<GameControlsProps> = ({
    isComputerFirst,
    setIsComputerFirst,
    onStartGame,
    onRestart,
    winner,
    gameStarted,
    handleMatchesDraw,
    isPlayerTurn,
}) => {
    const handleToggleSwitch = () => {
        setIsComputerFirst(!isComputerFirst);
    };

    const winnerContent = (
        <View>
            <Text style={styles.winnerText}>{winner}</Text>
            <Button color="#f8b91c" title="Restart" onPress={onRestart} />
        </View>
    );

    const gameStartButtonsContent = (
        <View style={styles.gameStartButtonsContainer}>
            <Button color="#29d5ac" title="Start Game!" onPress={onStartGame} />
            <View style={styles.switcherContainer}>
                <Text style={styles.switcherText}>Computer first</Text>

                <Switch value={isComputerFirst} onValueChange={handleToggleSwitch} />
            </View>
        </View>
    );

    const drawButtonsContent = (
        <View style={styles.drawButtonsContainer}>
            {[1, 2, 3].map((drawCount) => (
                <Button
                    key={drawCount}
                    color="#f8b91c"
                    title={`Draw ${drawCount}`}
                    onPress={() => {
                        handleMatchesDraw(drawCount);
                    }}
                    disabled={!isPlayerTurn}
                />
            ))}
        </View>
    );

    return (
        <View style={styles.gameControlsContainer}>
            {winner ? winnerContent : gameStarted ? drawButtonsContent : gameStartButtonsContent}
        </View>
    );
};

export default GameControls;

const styles = StyleSheet.create({
    gameControlsContainer: {
        width: "40%",
        alignContent: "center",
        gap: 15,
        marginTop: 20,
    },
    gameStartButtonsContainer: {
        alignContent: "center",
    },
    drawButtonsContainer: {
        gap: 5,
    },
    switcherContainer: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    switcherText: {
        fontSize: 17,
    },
    winnerText: {
        fontSize: 15,
        textAlign: "center",
        marginBottom: 10,
    },
});
