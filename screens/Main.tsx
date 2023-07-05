import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

import GameControls from "../components/GameControls";
import GameInfo from "../components/GameInfo";

const Main: React.FC = () => {
    const [matchesLeft, setMatchesLeft] = useState<number>(25);
    const [playerMatches, setPlayerMatches] = useState<number>(0);
    const [computerMatches, setComputerMatches] = useState<number>(0);
    const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
    const [winner, setWinner] = useState<string>("");
    const [isComputerFirst, setIsComputerFirst] = useState<boolean>(false);
    const [gameStarted, setGameStarted] = useState<boolean>(false);

    useEffect(() => {
        if (gameStarted && !isPlayerTurn && matchesLeft > 0) {
            const computerDraw = strategicMove(matchesLeft);
            const delay = Math.floor(Math.random() * 1000) + 500; // Random delay between 500ms and 1500ms

            const timeoutId = setTimeout(() => {
                handleMatchesDraw(computerDraw);
            }, delay);

            return () => clearTimeout(timeoutId);
        }
    }, [isPlayerTurn, matchesLeft, gameStarted]);

    useEffect(() => {
        if (matchesLeft === 0) {
            getWinner();
        } else if (isComputerFirst && !isPlayerTurn) {
            handleComputerTurn();
        }
    }, [isPlayerTurn, matchesLeft, isComputerFirst]);

    const handleStartGame = (): void => {
        setGameStarted(true);
        setIsPlayerTurn(!isComputerFirst);
        if (isComputerFirst) {
            handleComputerTurn();
        }
    };

    const handleMatchesDraw = (numMatches: number): void => {
        const remainingMatches = matchesLeft - numMatches;

        if (!gameStarted) {
            return; //The game hasn't started yet, the player cannot make a move
        }

        if (remainingMatches < 0) {
            return;
        }

        setMatchesLeft(remainingMatches);

        if (isPlayerTurn) {
            setPlayerMatches((playerMatches) => playerMatches + numMatches);
            setIsPlayerTurn(false);
        } else {
            setComputerMatches((computerMatches) => computerMatches + numMatches);
            setIsPlayerTurn(true);
        }
    };

    const handleComputerTurn = (): void => {
        const computerDraw = strategicMove(matchesLeft);
        const delay = Math.floor(Math.random() * 1000) + 500; //Random delay for imitation of the processing

        setTimeout(() => {
            handleMatchesDraw(computerDraw);
        }, delay);
    };

    const strategicMove = (matchesLeft: number): number => {
        if (matchesLeft % 4 === 0) {
            return 3;
        } else if (matchesLeft % 4 === 3) {
            return 2;
        } else {
            return 1;
        }
    };

    const getWinner = (): void => {
        let result: string = "";

        const playerRemainingMatches = playerMatches + matchesLeft;
        const computerRemainigngMatches = computerMatches + matchesLeft;

        if (playerRemainingMatches % 2 === 0 && computerRemainigngMatches % 2 === 0) {
            result = "It`s a tie!";
        } else if (playerRemainingMatches % 2 === 0) {
            result = "You win!";
        } else {
            result = "You lost...";
        }

        setWinner(result);
    };

    const handleRestart = (): void => {
        setMatchesLeft(25);
        setPlayerMatches(0);
        setComputerMatches(0);
        setIsPlayerTurn(true);
        setWinner("");
        setGameStarted(false);
    };

    return (
        <View style={styles.mainContainer}>
            <GameInfo
                matchesLeft={matchesLeft}
                playerMatches={playerMatches}
                computerMatches={computerMatches}
            />
            <GameControls
                gameStarted={gameStarted}
                winner={winner}
                isComputerFirst={isComputerFirst}
                setIsComputerFirst={setIsComputerFirst}
                onStartGame={handleStartGame}
                onRestart={handleRestart}
                handleMatchesDraw={handleMatchesDraw}
                isPlayerTurn={isPlayerTurn}
            />
        </View>
    );
};

export default Main;

const styles = StyleSheet.create({
    mainContainer: {
        alignItems: "center",
    },
});
