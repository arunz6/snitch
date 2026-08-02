import React, { use, useState } from "react";
import { Search, User, ShoppingBag } from "lucide-react";
import useCart from "../../cart/hook/use.cart";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const { totalQuantity } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  //thi is static nebar come on every page
  const { handlegetcart } = useCart();

  const user = useSelector((state) => state.auth.user);
  async function handelprofiledata() {
    console.log(user, "user");

    if (!user) {
      navigate("/login");
      return;
    }

    navigate("/cart");
  }

  return (
    <div className="w-full bg-black px-6 md:px-10 py-4 flex items-center justify-between border-b border-neutral-800">
      {/* Left: Logo */}
      <div className="flex items-center gap-8">
        <h1
          className="text-2xl md:text-3xl font-serif tracking-wide text-amber-400 select-none"
          onClick={() => navigate(-1)}
        >
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
        {user ? (
          <h1 className="text-amber-400 uppercase font-medium">
            {user?.fullname.slice(0, 2)}
          </h1>
        ) : (
          <button
             className="h-10 px-5 md:px-6 bg-amber-400 text-black text-[11px] font-medium tracking-[0.18em] uppercase whitespace-nowrap transition-all duration-300 hover:bg-amber-300 hover:tracking-[0.22em] active:scale-95 cursor-pointer"
  style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            onClick={() => {
              navigate("/login");
            }}
          >
            Login / Resister
          </button>
        )}


        <button
          className="flex items-center gap-2 text-neutral-300 hover:text-amber-400 transition-colors"
          aria-label="Cart"
          onClick={() => {
            handelprofiledata();
          }}
        >
          <ShoppingBag size={20} strokeWidth={1.5} />
          <span className="text-sm"></span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
