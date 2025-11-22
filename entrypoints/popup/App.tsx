import { useState, useEffect, useCallback } from 'react';
import { calculateHand, generateRandomHand, MahjongResult, formatTile } from '@/utils/mahjong';
import { Hand } from '@/components/Hand';

function App() {
  const [hand, setHand] = useState<string[]>([]);
  const [result, setResult] = useState<MahjongResult | null>(null);
  const [selectedTile, setSelectedTile] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const dealNewHand = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      const newHand = generateRandomHand();
      setHand(newHand);
      const res = calculateHand(newHand.join(''));
      setResult(res);
      setLoading(false);
      setMessage('');
      setSelectedTile(null);
    }, 100);
  }, []);

  useEffect(() => {
    dealNewHand();
  }, [dealNewHand]);

  const handleTileClick = (tile: string, index: number) => {
    if (!result) return;

    setSelectedTile(tile);

    // Find the stats for the selected tile
    // result.bestDiscards contains all valid discards sorted by ukeire
    const selectedDiscardStats = result.bestDiscards.find(d => d.tile === tile);
    const bestDiscardStats = result.bestDiscards[0];

    if (!selectedDiscardStats) {
      // Should not happen if logic is correct and tile is in hand
      return;
    }

    const isBest = selectedDiscardStats.shanten === bestDiscardStats.shanten &&
      selectedDiscardStats.ukeire === bestDiscardStats.ukeire;

    const formatList = (list: string[]) => list.map(formatTile).join(', ');

    if (isBest) {
      setMessage(`正解！✨\n受け入れ: ${selectedDiscardStats.ukeire}枚\n待ち: ${formatList(selectedDiscardStats.ukeireList)}`);
    } else {
      const shantenDiff = selectedDiscardStats.shanten - bestDiscardStats.shanten;
      const shantenMsg = shantenDiff > 0 ? ` (シャンテン数 +${shantenDiff} 😱)` : '';

      setMessage(
        `残念！🥺\n` +
        `選んだ牌 (${formatTile(tile)}): ${selectedDiscardStats.ukeire}枚${shantenMsg} (待ち: ${formatList(selectedDiscardStats.ukeireList)})\n` +
        `こっちの方がいいよ (${formatTile(bestDiscardStats.tile)}): ${bestDiscardStats.ukeire}枚 (待ち: ${formatList(bestDiscardStats.ukeireList)})`
      );
    }
  };

  return (
    <div className="p-4 w-[350px] bg-gray-50 dark:bg-gray-900 min-h-[400px] text-gray-900 dark:text-white flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6 text-center text-indigo-600 dark:text-indigo-400">
        Minutes Nanikiru
      </h1>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <p>読み込み中...</p>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <Hand
              tiles={hand}
              onTileClick={handleTileClick}
              selectedTileIndex={selectedTile ? hand.indexOf(selectedTile) : null} // Simple selection logic (might highlight first occurrence)
            />
          </div>

          <div className="min-h-[80px] text-center mb-4">
            {message && (
              <div className={`p-3 rounded whitespace-pre-wrap ${message.includes('正解') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {message}
              </div>
            )}
          </div>

          {result && (
            <div className="text-sm text-gray-500 mb-4">
              シャンテン数: {result.shanten}
            </div>
          )}

          <button
            onClick={dealNewHand}
            className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors shadow-lg font-medium"
          >
            次の問題へ 🀄️
          </button>
        </>
      )}
    </div>
  );
}

export default App;
