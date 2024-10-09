import React from 'react'

//a functional component using two props
const DarkMode =({ isDarkMode, onToggle}) => {
   // The component returns a JSX element that represents the dark mode toggle
  return (
    <div className="flex items-center justify-end mb-3">
      {/* A label element to provide text description for the toggle*/ }
      <label htmlFor="darkModeToggle" className="mr-2 text-xs">
        Dark Mode
      </label>
      <div className="relative inline-block w-8 mr-1 align-middle select-none">
        {/*Checkbox input for the darkmode toggle */}
        <input 
        type="checkBox"
        name="darkModeToggle"
        id="darkModeToggle"
        className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-2 appearance-none cursor-pointer"
        checked={isDarkMode}
        onChange={onToggle}
        />
        {/* The toggle switch */}
       
        <label
        htmlFor="darkModeToggle"
        className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"
        ></label>
      </div>
    </div>
  );
};

export default DarkMode