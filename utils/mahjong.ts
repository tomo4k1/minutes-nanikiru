import { RuleSet, tilesToHand } from 'mahjong-tile-efficiency';

export interface MahjongResult {
    shanten: number;
    ukeire: number;
    bestDiscards: {
        tile: string;
        shanten: number;
        ukeire: number;
    }[];
}

// Initialize RuleSet for Standard Mahjong (Riichi)
const ruleSet = new RuleSet('Riichi');

/**
 * Parse hand string (e.g. "123m456p") into array of tiles (e.g. ["1m", "2m", "3m", "4p", ...])
 */
const parseHandString = (handStr: string): string[] => {
    const tiles: string[] = [];
    let currentNumberBuffer: string[] = [];

    for (const char of handStr) {
        if (/[0-9]/.test(char)) {
            currentNumberBuffer.push(char);
        } else if (/[mpsz]/.test(char)) {
            // Apply suit to all buffered numbers
            for (const num of currentNumberBuffer) {
                tiles.push(num + char);
            }
            currentNumberBuffer = [];
        }
    }
    return tiles;
};

/**
 * Calculate shanten and ukeire for a given hand.
 * Handles Aka-dora (0m, 0p, 0s) by converting them to normal 5.
 * @param handStr Hand string (e.g., "123m456p789s11z")
 * @returns Calculation result
 */
export const calculateHand = (handStr: string): MahjongResult => {
    // Convert Aka-dora (0) to 5
    const normalizedHandStr = handStr
        .replace(/0m/g, '5m')
        .replace(/0p/g, '5p')
        .replace(/0s/g, '5s');

    try {
        const tiles = parseHandString(normalizedHandStr);
        const hand = tilesToHand(tiles);
        const result = ruleSet.calUkeire(hand);

        // If result has normalDiscard, it's a 3n+2 hand (discard phase)
        // The library returns { shanten, normalDiscard, recedingDiscard } for 3n+2
        // We want to find the best discards (lowest shanten, highest ukeire)
        if ('normalDiscard' in result) {
            const bestDiscards = [];
            const normalDiscard = (result as any).normalDiscard;

            for (const [discardTile, ukeireObj] of Object.entries(normalDiscard)) {
                let totalUkeire = 0;
                for (const count of Object.values(ukeireObj as Record<string, number>)) {
                    totalUkeire += count as number;
                }

                bestDiscards.push({
                    tile: discardTile,
                    shanten: result.shanten,
                    ukeire: totalUkeire
                });
            }

            // Sort by ukeire descending
            bestDiscards.sort((a, b) => b.ukeire - a.ukeire);

            return {
                shanten: result.shanten,
                ukeire: bestDiscards.length > 0 ? bestDiscards[0].ukeire : 0, // Max ukeire
                bestDiscards: bestDiscards
            };
        }

        // If no normalDiscard, it's a 3n+1 hand (draw phase)
        // Result is { shanten, ukeire: { tile: count }, totalUkeire }
        return {
            shanten: result.shanten,
            ukeire: (result as any).totalUkeire || 0,
            bestDiscards: []
        };
    } catch (e) {
        console.error("Mahjong calculation error:", e);
        return {
            shanten: -1,
            ukeire: 0,
            bestDiscards: []
        };
    }
};

/**
 * Generate a random 14-tile hand (for discard phase).
 * @returns Array of tile strings (e.g. ["1m", "2m", ...])
 */
export const generateRandomHand = (): string[] => {
    const suits = ['m', 'p', 's', 'z'];
    const tiles: string[] = [];

    // Create full deck
    for (const suit of suits) {
        const maxNum = suit === 'z' ? 7 : 9;
        for (let i = 1; i <= maxNum; i++) {
            for (let j = 0; j < 4; j++) {
                tiles.push(`${i}${suit}`);
            }
        }
    }

    // Shuffle (Fisher-Yates)
    for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }

    // Return first 14 tiles and sort them
    const hand = tiles.slice(0, 14);
    return sortHand(hand);
};

/**
 * Sort hand tiles in standard order (m -> p -> s -> z)
 */
const sortHand = (tiles: string[]): string[] => {
    const suitOrder: Record<string, number> = { 'm': 0, 'p': 1, 's': 2, 'z': 3 };
    return [...tiles].sort((a, b) => {
        const suitA = a.slice(-1);
        const suitB = b.slice(-1);
        const numA = parseInt(a.slice(0, -1));
        const numB = parseInt(b.slice(0, -1));

        if (suitOrder[suitA] !== suitOrder[suitB]) {
            return suitOrder[suitA] - suitOrder[suitB];
        }
        return numA - numB;
    });
};
