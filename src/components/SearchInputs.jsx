import React, { useState } from 'react';

const SearchInputs = ({ onSearch, data }) => {
  const [formData, setFormData] = useState({
    category: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSearch(formData);
  };

  // Helper function to extract unique, sorted values from the data, ignoring "N/A"
  const getUniqueOptions = (field) => {
    if (!data || data.length === 0) return [];
    const uniqueValues = new Set(data.map(item => item[field]));
    uniqueValues.delete('N/A');
    uniqueValues.delete('');
    return Array.from(uniqueValues).sort();
  };

  const categories = getUniqueOptions('category');
  const cities = getUniqueOptions('city');
  const states = getUniqueOptions('state');
  const zipCodes = getUniqueOptions('zipCode');
  const countries = getUniqueOptions('country');

  // Reusable styling for the dropdown menus
  const selectStyle = "bg-zinc-950 border border-zinc-800 text-white p-3 focus:outline-none focus:border-amber-500 transition-colors text-sm tracking-wide cursor-pointer appearance-none";

  return (
    <section className="bg-zinc-900 border border-zinc-800 p-8 shadow-2xl mb-8">
      <h2 className="text-lg font-light text-amber-500 tracking-widest uppercase mb-6">
        Search Criteria
      </h2>
      <form className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
        
        <div className="relative flex flex-col">
          <select name="category" value={formData.category} onChange={handleChange} className={selectStyle}>
            <option value="">ANY CATEGORY</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="relative flex flex-col">
          <select name="city" value={formData.city} onChange={handleChange} className={selectStyle}>
            <option value="">ANY CITY</option>
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="relative flex flex-col">
          <select name="state" value={formData.state} onChange={handleChange} className={selectStyle}>
            <option value="">ANY STATE</option>
            {states.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="relative flex flex-col">
          <select name="zipCode" value={formData.zipCode} onChange={handleChange} className={selectStyle}>
            <option value="">ANY ZIP CODE</option>
            {zipCodes.map(z => <option key={z} value={z}>{z}</option>)}
          </select>
        </div>

        <div className="relative flex flex-col">
          <select name="country" value={formData.country} onChange={handleChange} className={selectStyle}>
            <option value="">ANY COUNTRY</option>
            {countries.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <button 
          type="button" 
          onClick={handleSubmit} 
          className="md:col-span-5 bg-amber-600 text-zinc-950 font-semibold text-sm tracking-widest uppercase py-4 mt-2 hover:bg-amber-500 transition-colors"
        >
          Initialize Search
        </button>
      </form>
    </section>
  );
};

export default SearchInputs;