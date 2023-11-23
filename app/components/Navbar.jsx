  "use client"

  import { useState, useRef, useEffect } from 'react';
  import Link from 'next/link';
  import Image from 'next/image';
  import Logo from './mautskebeli.png';

  export default function Navbar() {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);
    let closeDropdownTimeout;

    const handleDropdownEnter = () => {
      clearTimeout(closeDropdownTimeout); // Clear the timeout to prevent premature closing
      setDropdownVisible(true);
    };

    const handleDropdownLeave = () => {
      // Set a small delay before closing the dropdown
      closeDropdownTimeout = setTimeout(() => {
        setDropdownVisible(false);
      }, 200);
    };

    const handleDropdownMouseEnter = () => {
      clearTimeout(closeDropdownTimeout); // Clear the timeout to prevent premature closing
    };

    useEffect(() => {
      // Clear the timeout when the component unmounts
      return () => {
        clearTimeout(closeDropdownTimeout);
      };
    }, []);

    return (
      <nav className="flex justify-between">
        <Link href='/'>
          <Image
            src={Logo}
            alt="Mautskebeli Ticketing logo"
            width={150}
            placeholder="blur"
            quality={100}
          />
        </Link>
    
        <div className="flex gap-5">
          <div className="relative inline-block text-left">
            <Link href='#' className='flex text-gray-500'
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              ბეჭდური მედია
            </Link>
            <div
              ref={dropdownRef}
              className={`${
                dropdownVisible ? 'block' : 'hidden'
              } absolute z-50 bg-black  border border-gray-200 py-2 mt-2 hover:border-b-4 hover:rounded-md hover:border-[#9e8acf]` }
              onMouseEnter={handleDropdownMouseEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <Link
                href="/category1"
                className="block px-4 py-2 text-gray-500 ] hover:border-b-4 hover:rounded-md hover:border-[#9e8acf]"
              >
                თარგმანი
              </Link>
              <Link
                href="/category2"
                className="block px-4 py-2 text-gray-500 hover:border-b-4 hover:rounded-md hover:border-[#9e8acf]"
              >
                სტატია
              </Link>
            </div>
          </div>

          <Link href="/login" className='hover:border-b-4 hover:rounded-md hover:border-[#9e8acf]'>სიახლე</Link>
          <Link href="/login" className='hover:border-b-4 hover:rounded-md hover:border-[#9e8acf]'>პოდკასტი</Link>
        </div>
      </nav>
    );
  }
