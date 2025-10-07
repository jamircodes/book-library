import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Home from "./pages/Home";
import About from "./components/About";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <div className="font-sans bg-slate-100 text-slate-800">
      <Header />
      <Hero />
      <Home />
      <About />
      <Footer />
    </div>
  );
};

export default App;
