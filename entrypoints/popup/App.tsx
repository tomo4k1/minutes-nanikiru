import { useState, useEffect, useCallback } from 'react';
import { calculateHand, generateRandomHand, MahjongResult } from '@/utils/mahjong';
import { Hand } from '@/components/Hand';

function App() {
  const [hand, setHand] = useState<string[]>([]);
  const [result, setResult] = useState<MahjongResult | null>(null);
  const [selectedTile, setSelectedTile] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const dealNewHand = useCallback(() => {
    setLoading(true);
    setMessage('');
    setSelectedTile(null);

    // Generate random hand
    const newHand = generateRandomHand();
    setHand(newHand);

    // Calculate result for the new hand
    const handStr = newHand.join('');
    const res = calculateHand(handStr);
    setResult(res);

    setLoading(false);
  }, []);

  useEffect(() => {
    dealNewHand();
  }, [dealNewHand]);

  const handleTileClick = (tile: string, index: number) => {
    if (!result) return;

    setSelectedTile(tile);

    // Check if the clicked tile is one of the best discards
    // We need to handle potential duplicate tiles in hand. 
    // The logic checks if the *tile name* is in the best discards list.
    const isBest = result.bestDiscards.some(d => d.tile === tile);

    if (isBest) {
      setMessage('Correct! ✨ That is a valid discard.');
    } else {
      // Find the best discard to show as hint
      const best = result.bestDiscards[0];
      setMessage(`Oops! 🥺 Better discard might be ${best.tile} (Ukeire: ${best.ukeire})`);
    }
  };

  return (
    <div className="p-4 w-[350px] bg-gray-50 dark:bg-gray-900 min-h-[400px] text-gray-900 dark:text-white flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6 text-center text-indigo-600 dark:text-indigo-400">
        Minutes Nanikiru
      </h1>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <p>Loading...</p>
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
              <div className={`p-3 rounded ${message.includes('Correct') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {message}
              </div>
            )}
          </div>

          {result && (
            <div className="text-sm text-gray-500 mb-4">
              Shanten: {result.shanten}
            </div>
          )}

          <button
            onClick={dealNewHand}
            className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors shadow-lg font-medium"
          >
            Next Hand 🀄️
          </button>
        </>
      )}
    </div>
  );
}

export default App;
