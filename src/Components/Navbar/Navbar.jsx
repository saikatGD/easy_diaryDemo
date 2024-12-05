import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import i18n hook

const Navbar = () => {
  const { t, i18n } = useTranslation(); // Hook for translations
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [userData, setUserData] = useState({ name: 'Guest User', email: 'guest@example.com', profilePicture: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp' });
  
  const navigate = useNavigate();

  // Fetch user data from localStorage or sessionStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')) || {};
    setUserData({
      name: storedUser.name || 'Guest User',
      email: storedUser.email || 'guest@example.com',
      profilePicture: storedUser.profilePicture || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp' // Default image if no profile picture
    });
  }, []);

  // Handle search query change
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    console.log('Searching for:', query);
    // Implement your search logic here, like making an API call
  };

  // Handle language change
  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language === 'English' ? 'en' : 'bn'); // Change language dynamically
    setSelectedLanguage(language);
  };

  // Handle log out
  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data from localStorage
    sessionStorage.removeItem('user');
    navigate('/'); // Redirect to login page
  };

  return (
    <div className=" text-gray-900 border-b border-gray-300 p-4 flex items-end">
      <div className="flex items-end justify-end ">
        
        {/* User Profile */}
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src={userData.profilePicture} // Dynamically load the profile picture
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  {t('User')}: {userData.name}
                </a>
                <a className="text-gray-900">{userData.email}</a>
              </li>
              <li><a>{t('Settings')}</a></li>
              <li><a onClick={handleLogout}>{t('Logout')}</a></li> {/* Log Out button */}
            </ul>
          </div>
        </div>

        {/* Language Selector */}
        <div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1">
              {t('Language')}: {selectedLanguage}
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-gray-100 rounded-box z-[1] w-52 p-2 shadow-md">
              <li>
                <a onClick={() => handleLanguageChange('English')}>English</a>
              </li>
              <li>
                <a onClick={() => handleLanguageChange('Bangla')}>Bangla</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
