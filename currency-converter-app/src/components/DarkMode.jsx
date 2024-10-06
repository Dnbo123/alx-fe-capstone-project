import React from 'react'

const DarkMode =({ isDarkMode, onToggle}) => {
  return (
    <div className="flex items-center justify-end mb-2">
      <label htmlFor="darkModeToggle" className="mr-2 text-xs">
        Dark Mode
      </label>
      <div className="relative inline-block w-8 mr-1 align-middle select-none">
        <input 
        type="checkBox"
        name="darkModeToggle"
        id="darkModeToggle"
        className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-2 appearance-none cursor-pointer"
        checked={isDarkMode}
        onChange={onToggle}
        />
        <label
        htmlFor="darkModeToggle"
        className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"
        ></label>
      </div>
    </div>
  );
};

export default DarkMode