'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  const { data: session } = useSession();

  const [ providers, setProviders ] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  // this will allow us to sign in using next providers and google
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }
    setUpProviders();
  }, [])
  

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image 
          src="assets/images/logo.svg" 
          alt="prompt-island-logo" 
          width={30} 
          height={30} 
        />

        <pc className="logo_text">
          Prompt Island
        </pc>
      </Link>

      {/* Desktop Navigation  */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-3">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
           
            <Link href="/profile" >
               <Image 
                  src={session?.user?.image}
                  alt="profile" 
                  width={37} 
                  height={37} 
                  className="rounded-full"
                />
            </Link>
          </div>
        ) : (
          <>
          {
            providers && 
            Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                className="black_btn"
              
              >
                    Sign in with {provider.name}
              </button>
               // TODO this is gonna be full implemented once we full integrated next-auth later on
          ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image 
              src={session?.user?.image}
              alt="profile" 
              width={37} 
              height={37} 
              className="rounded-full"
              onClick={()=> setToggleDropDown((prev) => !prev)}
            />
            {toggleDropDown && (
              <div className="dropdown">
                <Link 
                  href="/profile"
                  className="dropdown_link"
                  onClick={()=> setToggleDropDown(false)}
                  >
                    My Profile
                </Link>

                <Link 
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={()=> setToggleDropDown(false)}
                  >
                    Create Prompt
                </Link>
                <button 
                  type="button"
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) 
        : (
            <>
            {
              providers && 
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                  className="black_btn"
                
                >
                      Sign in with {provider.name}
                </button>
                // TODO this is gonna be full implemented once we full integrated next-auth later on
              ))}
            </>
          )}
      </div>


    </nav>
  )
}

export default Nav