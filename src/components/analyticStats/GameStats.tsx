// components/GameStats.tsx
import React from 'react';

interface Game {
  id: string;
  topic: string;
  timeStarted: Date;
  timeEnded: Date | null;
}

interface GameStatsProps {
  games: Game[];
}

const GameStats: React.FC<GameStatsProps> = ({ games }) => {
return (
    <div>
        <h2>Game Statistics</h2>
        <ul>
            {games.map((game) => (
                <li key={game.id}>
                    <span>Topic: {game.topic}</span>
                    <span>Started: {game.timeStarted.toString()}</span>
                    <span>Ended: {game.timeEnded ? game.timeEnded.toString() : 'In progress'}</span>
                </li>
            ))}
        </ul>
    </div>
);
};

export default GameStats;
