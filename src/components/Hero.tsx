import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-slate-100 py-20 text-center">
      <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
        Discover the World of Knowledge
      </h2>
      <p className="text-slate-600 text-lg max-w-2xl mx-auto">
        Read, learn, and grow from thousands of books across every language and
        culture.
      </p>
    </section>
  );
};

export default Hero;
