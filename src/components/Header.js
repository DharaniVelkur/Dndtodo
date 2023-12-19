import React from "react";

const Header = ({ text, bg, count }) => {
  return (
    <div className={`${bg} flex items-center h-12 p-6 rounded uppercase text-sm text-white`}>
      {text}
      <div className="ml-2 bg-white  text-black rounded-full w-5 h-5 flex items-center justify-center">{count}</div>
    </div>
  );
};

export default Header;