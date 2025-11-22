import React from 'react';

interface TileProps {
    tile: string; // e.g., "1m", "5p", "1z"
    className?: string;
    onClick?: () => void;
    selected?: boolean;
}

export const Tile: React.FC<TileProps> = ({ tile, className = '', onClick, selected }) => {
    // Convert 0m/0p/0s (Aka-dora) to 5m/5p/5s for display if needed, 
    // OR check if the library supports 0m. 
    // Looking at the CSS output, I didn't see 0m. 
    // Usually 0 is treated as 5 with a red dot, but this library might not support it directly or use a separate class.
    // For now, let's map 0 to 5.
    const displayTile = tile.replace('0', '5');

    // Determine if it's Aka-dora (red 5)
    // The library might not have specific red 5 icons based on the grep output (only saw 5s).
    // Let's just render the normal tile for now.

    return (
        <div
            className={`riichi-tile riichi-tile--small ${selected ? 'transform -translate-y-2' : ''} ${className}`}
            onClick={onClick}
            style={{ cursor: onClick ? 'pointer' : 'default' }}
        >
            <div className={`riichi-tile-icon riichi-tile-icon--${displayTile}`} />
        </div>
    );
};
