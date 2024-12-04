import React from 'react'

const Navbar = () => {
  const handleSearch = (event) => {
    const query = event.target.value;
    console.log("Searching for:", query);
    // Implement search logic here (e.g., make an API call)
  };

  return (
    <div className='bg-gray-100 text-gray-900 border-b border-gray-300 p-4 flex items-center'>
        <div className='flex gap-[1400px] ml-16'>
            <div className="flex-none gap-2">
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                  <li>
                    <a className="justify-between">
                      User name: 
                    </a>
                    <a href="">Post: </a>
                  </li>
                  <li><a>Settings</a></li>
                  <li><a>Logout</a></li>
                </ul>
              </div>
            </div>
            <div>
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn m-1">Language</div>
                <ul tabIndex={0} className="dropdown-content menu bg-gray-100 rounded-box z-[1] w-52 p-2 shadow-md">
                  <li><a>English</a></li>
                  <li><a>Bangla </a></li>
                </ul>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar
