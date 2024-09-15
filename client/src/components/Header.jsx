import { React, useState } from 'react';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Header() {
  const [showBenefitsDropdown, setShowBenefitsDropdown] = useState(false);
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);

  return (
    <header className='bg-[#fb8500] shadow-md'>
      <div className='flex flex-row justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to="/">
          <h1 className='font-bold text-sm sm:text-2xl flex flex-wrap'>
            <span className='text-slate-200 text-2xl'>Hom</span>
            <span className='text-slate-700 text-2xl'>Assist</span>
          </h1>
        </Link>

        <div className='sm:hidden'>
          <button onClick={() => setShowHamburgerMenu(!showHamburgerMenu)}>
            {showHamburgerMenu ? <FaTimes className='text-white' /> : <FaBars className='text-white' />}
          </button>
        </div>

        <ul className='hidden sm:flex gap-4 text-white'>
          <Link to="/"><li className='hover:text-black'>Home</li></Link>
          <Link to="/about"><li className='hover:text-black'>About Us</li></Link>
          <li className='relative'
              onMouseEnter={() => setShowBenefitsDropdown(true)}
              onMouseLeave={() => setShowBenefitsDropdown(false)}>
            <ul className='hover:text-black'>Benefits ▼</ul>
            {showBenefitsDropdown && (
              <ul className='absolute bg-gray-600 shadow-md rounded-lg w-56 whitespace-nowrap z-50'
                  onMouseEnter={() => setShowBenefitsDropdown(true)}
                  onMouseLeave={() => setShowBenefitsDropdown(false)}>
                <li className='px-4 py-2 hover:bg-gray-700 flex items-center justify-center'><Link to="/freeConsultation">Free Consultation</Link></li>
                <li className='px-4 py-2 hover:bg-gray-700 flex items-center justify-center'><Link to="/group">Group Booking Discount</Link></li>
                <li className='px-4 py-2 hover:bg-gray-700 flex items-center justify-center'><Link to="/referral">Referral</Link></li>
              </ul>
            )}
          </li>
          <Link to="/residential"><li className='hover:text-black'>Properties</li></Link>
          <Link to="/contact"><li className='hover:text-black'>Contact Us</li></Link>
        </ul>
      </div>

      {showHamburgerMenu && (
        <div className='sm:hidden bg-[#fb8500] p-3'>
          <ul className='flex flex-col gap-4 text-white'>
            <Link to="/" onClick={() => setShowHamburgerMenu(false)}><li className='hover:text-black'>Home</li></Link>
            <Link to="/about" onClick={() => setShowHamburgerMenu(false)}><li className='hover:text-black'>About Us</li></Link>
            <li className='relative'
                onMouseEnter={() => setShowBenefitsDropdown(true)}
                onMouseLeave={() => setShowBenefitsDropdown(false)}>
              <ul className='hover:text-black'>Benefits ▼</ul>
              {showBenefitsDropdown && (
                <ul className='bg-gray-600 shadow-md rounded-lg w-56 whitespace-nowrap z-50'>
                  <li className='px-4 py-2 hover:bg-gray-700 flex items-center justify-center'><Link to="/freeConsultation" onClick={() => setShowHamburgerMenu(false)}>Free Consultation</Link></li>
                  <li className='px-4 py-2 hover:bg-gray-700 flex items-center justify-center'><Link to="/group" onClick={() => setShowHamburgerMenu(false)}>Group Booking Discount</Link></li>
                  <li className='px-4 py-2 hover:bg-gray-700 flex items-center justify-center'><Link to="/referral" onClick={() => setShowHamburgerMenu(false)}>Referral</Link></li>
                </ul>
              )}
            </li>
            <Link to="/residential" onClick={() => setShowHamburgerMenu(false)}><li className='hover:text-black'>Properties</li></Link>
            <Link to="/contact" onClick={() => setShowHamburgerMenu(false)}><li className='hover:text-black'>Contact Us</li></Link>
          </ul>
        </div>
      )}
    </header>
  );
}
