import React from "react";

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-slate-900 text-white py-6 text-center">
      <p>© {new Date().getFullYear()} Online Library — All Rights Reserved.</p>
      <p className="text-sm text-slate-400 mt-1">
        Made with ❤️ for knowledge seekers
      </p>
    </footer>
  );
};

export default Footer;
