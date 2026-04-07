import React from 'react';

const ResultsDisplay = ({ results, hasSearched }) => {
  return (
    <section className="bg-zinc-900 border border-zinc-800 p-8 shadow-2xl">
      <h2 className="text-lg font-light text-amber-500 tracking-widest uppercase mb-6">
        Verified Partners
      </h2>
      
      {!hasSearched ? (
        <p className="text-zinc-500 text-sm tracking-wide italic">Please enter criteria to initialize a search.</p>
      ) : results.length === 0 ? (
        <p className="text-zinc-500 text-sm tracking-wide italic">No partners found matching those exact criteria.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {results.map((contact) => (
            <div key={contact.id} className="border border-zinc-800 p-6 bg-zinc-950 hover:border-amber-500/50 transition-colors duration-300">
              <h3 className="font-light text-xl text-white tracking-wide uppercase mb-4">
                {contact.companyName}
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm text-zinc-400">
                <p><span className="text-amber-600 block text-xs uppercase tracking-widest mb-1">Category</span> {contact.category}</p>
                <p><span className="text-amber-600 block text-xs uppercase tracking-widest mb-1">Location</span> {contact.city}, {contact.state} {contact.zipCode}, {contact.country}</p>
                <p><span className="text-amber-600 block text-xs uppercase tracking-widest mb-1">Contact</span> {contact.contactName}</p>
                <p><span className="text-amber-600 block text-xs uppercase tracking-widest mb-1">Reach</span> {contact.phone} | {contact.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ResultsDisplay;