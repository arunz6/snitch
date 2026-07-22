import React, { useState } from 'react'
import { Search, User, ShoppingBag } from 'lucide-react'

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <div className="w-full bg-black px-6 md:px-10 py-4 flex items-center justify-between border-b border-neutral-800">
      
      {/* Left: Logo */}
      <div className="flex items-center gap-8">
        <h1 className="text-2xl md:text-3xl font-serif tracking-wide text-amber-400 select-none">
          SNITCH
        </h1>

        {/* Second-left: Search */}
        <div className="hidden sm:flex items-center">
          {searchOpen ? (
            <input
              type="text"
              autoFocus
              onBlur={() => setSearchOpen(false)}
              placeholder="Search products..."
              className="bg-transparent border-b border-neutral-600 text-neutral-200 text-sm 
                         placeholder-neutral-500 focus:outline-none focus:border-amber-400 
                         py-1 w-40 md:w-56 transition-all duration-300"
            />
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 text-neutral-300 hover:text-amber-400 transition-colors"
              aria-label="Open search"
            >
              <Search size={18} strokeWidth={1.5} />
              <span className="text-xs tracking-widest uppercase">Search</span>
            </button>
          )}
        </div>
      </div>

      {/* Right: Profile + Cart */}
      <div className="flex items-center gap-5 md:gap-6">
        <button
          className="text-neutral-300 hover:text-amber-400 transition-colors"
          aria-label="Profile"
        >
          <User size={20} strokeWidth={1.5} />
        </button>

        <button
          className="flex items-center gap-2 text-neutral-300 hover:text-amber-400 transition-colors"
          aria-label="Cart"
        >
          <ShoppingBag size={20} strokeWidth={1.5} />
          <span className="text-sm">(0)</span>
        </button>
      </div>
    </div>
  )
}

export default Navbar