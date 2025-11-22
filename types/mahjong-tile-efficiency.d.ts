declare module 'mahjong-tile-efficiency' {
    export interface Ukeire {
        shanten: number;
        ukeire: number;
        ukeireList: string[];
    }

    export interface DiscardInfo {
        discard: string;
        shanten: number;
        ukeire: number;
        ukeireList: string[];
    }

    export interface HandCalculationResult {
        shanten: number;
        ukeire: number;
        ukeireList: string[];
        bestDiscards?: DiscardInfo[];
    }

    export class RuleSet {
        constructor(ruleName: string);
        calShanten(hand: number[][]): number;
        calUkeire(hand: number[][]): HandCalculationResult;
    }

    export function tilesToHand(tiles: string[]): number[][];
}
