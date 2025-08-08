import { useState, useCallback, useEffect } from 'react';

// Define interfaces for type safety
interface Bill {
  id: number;
  filename: string;
  originalName: string;
  title: string;
  summary: string;
  score?: number;
}

interface BillSearchButtonProps {
  billFilenames?: string[];
  onBillSelected?: (bill: Bill, content: string | null) => void;
}

// Extend Window interface to include fs
declare global {
  interface Window {
    fs: {
      readFile: (path: string, options?: { encoding?: string }) => Promise<string | Uint8Array>;
    };
  }
}

const BillSearchButton = ({ billFilenames = [], onBillSelected }: BillSearchButtonProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Bill[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [availableBills, setAvailableBills] = useState<Bill[]>([]);
  const [billsLoaded, setBillsLoaded] = useState<boolean>(false);
  const [loadingBills, setLoadingBills] = useState<boolean>(false);

  // Load bills from the actual folder
  const loadBillsFromFolder = useCallback(async () => {
    if (billsLoaded || loadingBills) return;

    setLoadingBills(true);
    const bills: Bill[] = [];
    const basePath = 'react-app/src/assets/docs/_89_1_house_senate_bills/';

    try {
      // If specific filenames are provided, use those
      if (billFilenames.length > 0) {
        for (const filename of billFilenames) {
          try {
            const fullPath = `${basePath}${filename}`;
            await window.fs.readFile(fullPath);

            const billName = filename.replace(/\.[^/.]+$/, ''); // Remove extension
            const title = billName.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim();

            bills.push({
              id: bills.length + 1,
              filename: fullPath,
              originalName: filename,
              title: title,
              summary: `Bill document: ${billName}`
            });
          } catch (error) {
            console.warn(`Could not load bill: ${filename}`, error);
          }
        }
      } else {
        // Try common bill naming patterns
        const commonPatterns = [
          // House bills
          'HR_1', 'HR_2', 'HR_3', 'HR_4', 'HR_5',
          'HB_1', 'HB_2', 'HB_3', 'HB_4', 'HB_5',
          // Senate bills
          'S_1', 'S_2', 'S_3', 'S_4', 'S_5',
          'SB_1', 'SB_2', 'SB_3', 'SB_4', 'SB_5'
        ];

        const extensions = ['.pdf', '.txt', '.doc', '.docx'];

        for (const pattern of commonPatterns) {
          for (const ext of extensions) {
            for (let num = 1; num <= 999; num++) {
              try {
                const filename = `${pattern}${num.toString().padStart(3, '0')}${ext}`;
                const fullPath = `${basePath}${filename}`;

                await window.fs.readFile(fullPath);

                const billName = filename.replace(/\.[^/.]+$/, '');
                const title = billName.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim();

                bills.push({
                  id: bills.length + 1,
                  filename: fullPath,
                  originalName: filename,
                  title: title,
                  summary: `Bill document: ${billName}`
                });

                if (bills.length >= 50) break; // Limit to prevent too many requests
              } catch (error) {
                // File doesn't exist, continue
                continue;
              }
            }
            if (bills.length >= 50) break;
          }
          if (bills.length >= 50) break;
        }
      }

      setAvailableBills(bills);
      setBillsLoaded(true);
    } catch (error) {
      console.error('Error loading bills:', error);
    } finally {
      setLoadingBills(false);
    }
  }, [billFilenames, billsLoaded, loadingBills]);

  // Function to search bills using regex
  const searchBills = useCallback(async (query: string) => {
    if (!query || query.trim().length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsLoading(true);

    try {
      // Create regex pattern for fuzzy matching
      const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const fuzzyPattern = escapedQuery.split('').join('.*?');
      const regex = new RegExp(fuzzyPattern, 'gi');

      // Score and filter bills
      const scoredBills = availableBills
        .map(bill => {
          let score = 0;
          const titleMatch = bill.title.match(regex);
          const filenameMatch = bill.originalName.match(regex);
          const summaryMatch = bill.summary.match(regex);

          if (titleMatch) score += 10;
          if (filenameMatch) score += 5;
          if (summaryMatch) score += 3;

          // Exact word matches get higher scores
          const exactTitleMatch = bill.title.toLowerCase().includes(query.toLowerCase());
          const exactFilenameMatch = bill.originalName.toLowerCase().includes(query.toLowerCase());

          if (exactTitleMatch) score += 20;
          if (exactFilenameMatch) score += 15;

          return score > 0 ? { ...bill, score } : null;
        })
        .filter((bill): bill is Bill & { score: number } => bill !== null)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);

      setSearchResults(scoredBills);
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [availableBills]);

  // Load bills when component mounts
  useEffect(() => {
    loadBillsFromFolder();
  }, [loadBillsFromFolder]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    searchBills(value);
  };

  const handleBillSelect = async (bill: Bill) => {
    setSelectedBill(bill);
    setSearchTerm(bill.title);
    setShowResults(false);

    try {
      // Read the actual bill content
      const content = await window.fs.readFile(bill.filename, { encoding: 'utf8' }) as string;
      console.log('Selected bill content:', content);

      // Call the callback if provided
      if (onBillSelected) {
        onBillSelected(bill, content);
      }

    } catch (error) {
      console.error('Error reading bill content:', error);

      // Still call the callback even if content reading fails
      if (onBillSelected) {
        onBillSelected(bill, null);
      }
    }
  };

  const highlightMatch = (text: string, query: string): React.ReactNode => {
    if (!query || query.length < 2) return text;

    try {
      const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(${escapedQuery})`, 'gi');
      const parts = text.split(regex);

      return parts.map((part: string, index: number) =>
        regex.test(part) ? (
          <span key={index} className="bg-yellow-200 text-yellow-900 px-1 rounded">
            {part}
          </span>
        ) : part
      );
    } catch (error) {
      return text;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="relative">
        {/* Search Input */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">🔍</span>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search for bills by name..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            disabled={loadingBills}
          />
          {(isLoading || loadingBills) && (
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg animate-spin">⟳</span>
          )}
        </div>

        {/* Loading Bills Status */}
        {loadingBills && (
          <div className="mt-2 text-sm text-gray-600 flex items-center">
            <span className="text-lg animate-spin mr-2">⟳</span>
            Loading bills from folder...
          </div>
        )}

        {/* Bills Count */}
        {billsLoaded && (
          <div className="mt-2 text-sm text-gray-600">
            {availableBills.length} bills loaded from folder
          </div>
        )}

        {/* Search Results */}
        {showResults && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-y-auto">
            {searchResults.length === 0 ? (
              <div className="p-4 text-gray-500 text-center">
                No bills found matching "{searchTerm}"
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {searchResults.map((bill) => (
                  <button
                    key={bill.id}
                    onClick={() => handleBillSelect(bill)}
                    className="w-full p-4 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <span className="text-blue-600 mr-2 text-lg">📄</span>
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {highlightMatch(bill.title, searchTerm)}
                          </h3>
                          <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            Match: {bill.score}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 truncate">
                          {highlightMatch(bill.originalName, searchTerm)}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {bill.summary}
                        </p>
                      </div>
                      <span className="text-gray-400 text-lg">›</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Selected Bill Display */}
      {selectedBill && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <span className="text-green-600 mr-2 text-lg">📄</span>
            <div>
              <h3 className="text-sm font-medium text-green-900">
                Selected: {selectedBill.title}
              </h3>
              <p className="text-xs text-green-700">
                File: {selectedBill.originalName}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillSearchButton;