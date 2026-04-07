import React, { useState } from 'react';

const SearchInputs = ({ onSearch }) => {
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

  return (
    <section className="bg-zinc-900 border border-zinc-800 p-8 shadow-2xl mb-8">
      <h2 className="text-lg font-light text-amber-500 tracking-widest uppercase mb-6">
        Search Criteria
      </h2>
      <form className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <input name="category" value={formData.category} onChange={handleChange} type="text" placeholder="CATEGORY" className="bg-zinc-950 border border-zinc-800 text-white p-3 focus:outline-none focus:border-amber-500 transition-colors placeholder-zinc-600 text-sm tracking-wide" />
        <input name="city" value={formData.city} onChange={handleChange} type="text" placeholder="CITY" className="bg-zinc-950 border border-zinc-800 text-white p-3 focus:outline-none focus:border-amber-500 transition-colors placeholder-zinc-600 text-sm tracking-wide" />
        <input name="state" value={formData.state} onChange={handleChange} type="text" placeholder="STATE" className="bg-zinc-950 border border-zinc-800 text-white p-3 focus:outline-none focus:border-amber-500 transition-colors placeholder-zinc-600 text-sm tracking-wide" />
        <input name="zipCode" value={formData.zipCode} onChange={handleChange} type="text" placeholder="ZIP CODE" className="bg-zinc-950 border border-zinc-800 text-white p-3 focus:outline-none focus:border-amber-500 transition-colors placeholder-zinc-600 text-sm tracking-wide" />
        <input name="country" value={formData.country} onChange={handleChange} type="text" placeholder="COUNTRY" className="bg-zinc-950 border border-zinc-800 text-white p-3 focus:outline-none focus:border-amber-500 transition-colors placeholder-zinc-600 text-sm tracking-wide" />
        <button type="button" onClick={handleSubmit} className="md:col-span-5 bg-amber-600 text-zinc-950 font-semibold text-sm tracking-widest uppercase py-4 mt-2 hover:bg-amber-500 transition-colors">
          Initialize Search
        </button>
      </form>
    </section>
  );
};

export default SearchInputs;