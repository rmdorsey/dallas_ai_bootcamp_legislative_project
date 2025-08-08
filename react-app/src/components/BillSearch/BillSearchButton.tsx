import React, { useState, useCallback, useEffect } from 'react';
import { Search, FileText, ChevronRight, Loader2 } from 'lucide-react';

const BillSearchButton = ({ billFilenames = [], onBillSelected }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [availableBills, setAvailableBills] = useState([]);
  const [billsLoaded, setBillsLoaded] = useState(false);
  const [loadingBills, setLoadingBills] = useState(false);

  // Load bills from the actual folder
  const loadBillsFromFolder = useCallback(async () => {
    if (billsLoaded || loadingBills) return;

    setLoadingBills(true);
    const bills = [];
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
  const searchBills = useCallback(async (query) => {
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
        .filter(Boolean)
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

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    searchBills(value);
  };

  const handleBillSelect = async (bill) => {
    setSelectedBill(bill);
    setSearchTerm(bill.title);
    setShowResults(false);

    try {
      // Read the actual bill content
      const content = await window.fs.readFile(bill.filename, { encoding: 'utf8' });
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

  const highlightMatch = (text, query) => {
    if (!query || query.length < 2) return text;
    
    try {
      const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(${escapedQuery})`, 'gi');
      const parts = text.split(regex);
      
      return parts.map((part, index) => 
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
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search for bills by name..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            disabled={loadingBills}
          />
          {(isLoading || loadingBills) && (
            <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 animate-spin" />
          )}
        </div>

        {/* Loading Bills Status */}
        {loadingBills && (
          <div className="mt-2 text-sm text-gray-600 flex items-center">
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
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
                {searchResults.map((bill, index) => (
                  <button
                    key={bill.id}
                    onClick={() => handleBillSelect(bill)}
                    className="w-full p-4 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <FileText className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
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
                      <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
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
            <FileText className="h-5 w-5 text-green-600 mr-2" />
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