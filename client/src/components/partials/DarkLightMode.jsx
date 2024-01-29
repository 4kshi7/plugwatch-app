// DarkLightMode.js
import { useState } from "react";
import "../../"

const DarkLightMode = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };
  return (
    <div>
      <button
        className="flex items-center justify-center p-2 rounded-full bg-gray-200 dark:bg-gray-800"
        onClick={toggleDarkMode}
      >
        {darkMode ? (
          <i className="ri-sun-line h-6 w-6 text-yellow-500"></i>
        ) : (
          <i className="ri-moon-line h-6 w-6 text-gray-800"></i>
        )}
      </button>
    </div>
  );
};

export default DarkLightMode;
