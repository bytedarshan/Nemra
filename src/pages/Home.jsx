import React, { useState, useEffect } from 'react';
import SearchInputs from '../components/SearchInputs';
import ResultsDisplay from '../components/ResultsDisplay';
import rawCsvData from '../data/contacts.csv?raw'; 

const Home = () => {
  const [allData, setAllData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    try {
      const lines = rawCsvData.split('\n').filter(line => line.trim() !== '');
      if (lines.length < 2) return;

      const parseCsvRow = (rowStr) => {
        const result = [];
        let current = '';
        let inQuotes = false;
        for (let i = 0; i < rowStr.length; i++) {
          const char = rowStr[i];
          if (char === '"' && rowStr[i+1] === '"') {
            current += '"'; 
            i++; 
          } else if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
          } else {
            current += char;
          }
        }
        result.push(current.trim());
        return result;
      };

      const firstLine = lines[0].replace(/^\uFEFF/, '');
      const headers = parseCsvRow(firstLine).map(h => h.toLowerCase());
      
      const parsedData = [];
      const seenRecords = new Set(); 

      const normalizeForDedup = (str) => {
        if (!str || str === "N/A") return "na";
        return str.toString().toLowerCase().replace(/[^a-z0-9]/g, '');
      };

      for (let i = 1; i < lines.length; i++) {
        const row = parseCsvRow(lines[i]);
        if (row.length < 2) continue;

        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let val = row[j] ? row[j] : "N/A";
          if (!val || val === "NaN") val = "N/A";
          obj[headers[j]] = val;
        }

        const rawEmail = obj['email1'] || 'N/A';
        const rawPhone = obj['contact1'] || 'N/A';
        const cleanBusiness = normalizeForDedup(obj['business']);
        const cleanCity = normalizeForDedup(obj['city']);
        
        let uniqueKey = '';
        if (rawEmail !== 'N/A') {
          uniqueKey = normalizeForDedup(rawEmail); 
        } else if (rawPhone !== 'N/A') {
          uniqueKey = normalizeForDedup(rawPhone); 
        } else {
          uniqueKey = `${cleanBusiness}-${cleanCity}`; 
        }

        if (!seenRecords.has(uniqueKey) && cleanBusiness !== "na") {
          seenRecords.add(uniqueKey);
          
          parsedData.push({
            id: parsedData.length + 1,
            category: obj['category'] || 'N/A',
            companyName: obj['business'] || 'N/A',
            city: obj['city'] || 'N/A',
            state: obj['state'] || 'N/A',
            zipCode: obj['zip code'] || 'N/A',
            country: obj['country'] || 'N/A',
            contactName: obj['name'] || 'N/A',
            phone: obj['contact1'] || 'N/A',
            email: obj['email1'] || 'N/A'
          });
        }
      }
      
      setAllData(parsedData);
    } catch (error) {
      console.error("Failed to parse CSV:", error);
    }
  }, []);

  const safeIncludes = (sourceText, queryText) => {
    if (!queryText) return true; 
    if (!sourceText || sourceText === "N/A") return false;
    return sourceText.toString().toLowerCase().includes(queryText.toString().toLowerCase());
  };

  const handleSearch = (criteria) => {
    // 1. Check if every single dropdown is empty
    const isAllEmpty = Object.values(criteria).every(value => value.trim() === '');
    
    // 2. Block the search if no criteria are selected
    if (isAllEmpty) {
      alert("Search Denied: You must select at least one option from the dropdown menus.");
      setSearchResults([]);
      setHasSearched(false);
      return; 
    }

    // 3. Proceed with search if at least one option is selected
    const filtered = allData.filter(contact => {
      return safeIncludes(contact.category, criteria.category) &&
             safeIncludes(contact.city, criteria.city) &&
             safeIncludes(contact.state, criteria.state) &&
             safeIncludes(contact.zipCode, criteria.zipCode) &&
             safeIncludes(contact.country, criteria.country);
    });

    setSearchResults(filtered);
    setHasSearched(true);
  };

  return (
    <main className="min-h-screen bg-zinc-950 p-4 md:p-12 font-sans text-zinc-200">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-light tracking-widest text-white uppercase mb-2">
            The Elite Directory
          </h1>
          <div className="h-px w-24 bg-amber-600 mx-auto mb-4"></div>
          <p className="text-zinc-400 tracking-wide text-sm uppercase mb-4">
            Exclusive B2B Travel Network
          </p>
          
          <div className="inline-block px-4 py-1 rounded-full border border-amber-600/30 bg-amber-600/10 text-amber-500 text-xs tracking-widest">
            {allData.length > 0 ? `DATABASE SECURE: ${allData.length} UNIQUE RECORDS LOADED` : 'SCANNING DATABASE...'}
          </div>
        </header>
        
        <SearchInputs onSearch={handleSearch} data={allData} />
        <ResultsDisplay results={searchResults} hasSearched={hasSearched} />
        
      </div>
    </main>
  );
};

export default Home;