"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AiFillHeart, AiFillHome, AiFillLike, AiFillSecurityScan, AiOutlineSearch } from 'react-icons/ai';
import Player from './Player';


const Sidebar = ({ children }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    // Call handleResize initially
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <aside
        className={`fixed w-full overflow-hidden ${
          isSmallScreen ? 'bottom-0' : 'h-screen'
        } ${
          isSmallScreen ? 'md:h-auto' : 'md:h-screen'
        } ${isSmallScreen ? 'md:bg-transparent' : 'md:bg-white-200'}`}
      >
        {isSmallScreen && (
          <div>
            <nav className="bg-black fixed top-0 w-full h-16 flex justify-center items-center">
              <div className="Logo p-5">
                <img
                  src="/images/Logo.png"
                  className="h-8"
                  alt="spotify"
                />
              </div>
            </nav>

            <div className='fixed top-16 overflow-hidden' style={{width:"100vw",height:"100vh"}}>
            <div style={{width:"100vw",height:"71vh",overflowX:"hidden"}}>
                {children}
              </div>
              <div style={{width:"100vw",height:"15vh",overflow:"hidden"}}>
                  <Player type="mobile"/>
              </div>
            </div>

            <nav className="bg-black fixed bottom-0 left-0 w-full h-16 pl-5 pr-5 flex items-center justify-between">
              <Link href="/home" className="text-white hover:text-green-500 font-bold">
                <AiFillHome className="m-5" size={20} />
              </Link>
              <Link href="/Search" className="text-white hover:text-green-500 font-bold">
                  <AiOutlineSearch className="mr-2" size={20} />
                </Link>
            </nav>
          </div>
        )}

        {!isSmallScreen && (
          <div className="flex">
            <div className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[20vw] text-center bg-black h-[88vh]">
              <div className="Logo p-5 items-center">
                <img
                  src="/images/Logo.png"
                  alt="spotify"
                />
              </div>
              <div className="m-5">
                <Link href="/home" className="text-white hover:text-green-500 font-bold flex items-center gap-10 p-[1vw]">
                  <AiFillHome className="mr-2" size={20} />
                  Home
                </Link>
                <Link href="/Search" className="text-white hover:text-green-500 font-bold flex items-center gap-10 p-[1vw]">
                  <AiOutlineSearch className="mr-2" size={20} />
                  Search
                </Link>
              </div>
            </div>

            <div style={{overflow:"hidden"}}>
              <div style={{marginLeft:"20vw",width:"80vw",height:"88vh",overflowX:"hidden"}}>
                {children}
              </div>
              <div style={{width:"100vw",height:"12vh",overflowX:"hidden"}}>
                  <Player/>
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};

export default Sidebar;
