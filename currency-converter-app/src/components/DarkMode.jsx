import React from 'react'

const DarkMode =({ isDarkMode, onToggle}) => {
  return (
    <div className="flex items-center justify-end mb-4">
      <label htmlFor="darkModeToggle" className="mr-2 text-sm">
        Dark Mode
      </label>
      <div className="relative inline-block w-10 mr-2 align-middle select-none">
        <input 
        type="checkBox"
        name="darkModeToggle"
        id="darkModeToggle"
        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
        checked={isDarkMode}
        onChange={onToggle}
        />
        <label
        htmlFor="darkModeToggle"
        className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
        ></label>
      </div>
    </div>
  );
};

export default DarkMode