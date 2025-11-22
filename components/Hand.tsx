import React from 'react';
import { Tile } from './Tile';

interface HandProps {
    tiles: string[]; // Array of tile strings, e.g., ["1m", "2m", "3m"]
    onTileClick?: (tile: string, index: number) => void;
    selectedTileIndex?: number | null;
}

export const Hand: React.FC<HandProps> = ({ tiles, onTileClick, selectedTileIndex }) => {
    return (
        <div className="flex flex-wrap justify-center gap-1">
            {tiles.map((tile, index) => (
                <Tile
                    key={`${tile}-${index}`}
                    tile={tile}
                    onClick={() => onTileClick?.(tile, index)}
                    selected={selectedTileIndex === index}
                />
            ))}
        </div>
    );
};
