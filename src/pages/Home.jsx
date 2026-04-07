import React, { useState } from 'react';
import SearchInputs from '../components/SearchInputs';
import ResultsDisplay from '../components/ResultsDisplay';
import { contactsData } from '../data/contactsData';

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (criteria) => {
    // Filter the data based on user input (ignoring empty fields, strictly matching filled fields)
    const filtered = contactsData.filter(contact => {
      const matchCategory = !criteria.category || contact.category.toLowerCase().includes(criteria.category.toLowerCase());
      const matchCity = !criteria.city || contact.city.toLowerCase().includes(criteria.city.toLowerCase());
      const matchState = !criteria.state || contact.state.toLowerCase().includes(criteria.state.toLowerCase());
      const matchZipCode = !criteria.zipCode || contact.zipCode.includes(criteria.zipCode);
      const matchCountry = !criteria.country || contact.country.toLowerCase().includes(criteria.country.toLowerCase());

      return matchCategory && matchCity && matchState && matchZipCode && matchCountry;
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
          <p className="text-zinc-400 tracking-wide text-sm uppercase">
            Exclusive B2B Travel Network
          </p>
        </header>
        
        <SearchInputs onSearch={handleSearch} />
        <ResultsDisplay results={searchResults} hasSearched={hasSearched} />
        
      </div>
    </main>
  );
};

export default Home;