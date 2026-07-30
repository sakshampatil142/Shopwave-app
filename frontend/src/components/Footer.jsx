import React from "react";

export default function Footer() {
  return (
    <footer className="bg-navy-700 text-gray-300 mt-16">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-full bg-navy-600 hover:bg-[#3f4b5c] text-white text-sm py-3 text-center transition-colors"
      >
        Back to top
      </button>
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
        <div>
          <h4 className="text-white font-semibold mb-3">Get to Know Us</h4>
          <ul className="space-y-2">
            <li className="hover:underline cursor-pointer">About ShopWave</li>
            <li className="hover:underline cursor-pointer">Careers</li>
            <li className="hover:underline cursor-pointer">Press Releases</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Connect with Us</h4>
          <ul className="space-y-2">
            <li className="hover:underline cursor-pointer">Facebook</li>
            <li className="hover:underline cursor-pointer">Twitter</li>
            <li className="hover:underline cursor-pointer">Instagram</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Make Money with Us</h4>
          <ul className="space-y-2">
            <li className="hover:underline cursor-pointer">Sell on ShopWave</li>
            <li className="hover:underline cursor-pointer">Become an Affiliate</li>
            <li className="hover:underline cursor-pointer">Advertise Your Products</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Let Us Help You</h4>
          <ul className="space-y-2">
            <li className="hover:underline cursor-pointer">Your Account</li>
            <li className="hover:underline cursor-pointer">Returns Centre</li>
            <li className="hover:underline cursor-pointer">Help</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Stay in the loop</h4>
          <p className="mb-3 text-xs">Get deals and new arrivals in your inbox.</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex">
            <input
              type="email"
              placeholder="you@email.com"
              className="min-w-0 flex-1 rounded-l-md px-3 py-2 text-xs bg-navy-600 border border-white/10 text-white placeholder:text-gray-400 focus:outline-none"
            />
            <button className="bg-accent-500 hover:bg-accent-400 text-ink text-xs font-semibold px-3 rounded-r-md">
              Join
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-400 mr-1">We accept:</span>
            {["Visa", "Mastercard", "UPI", "Rupay", "COD"].map((m) => (
              <span key={m} className="bg-navy-600 border border-white/10 rounded px-2 py-1 text-white">
                {m}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="bg-navy-600 border border-white/10 rounded-lg px-3 py-1.5 text-white">📱 App Store</span>
            <span className="bg-navy-600 border border-white/10 rounded-lg px-3 py-1.5 text-white">▶️ Google Play</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-500">
        This is a demo storefront built for learning purposes — not affiliated with Amazon, Flipkart or Ajio.
        Product photos via the{" "}
        <a href="https://www.pexels.com" target="_blank" rel="noreferrer" className="underline hover:text-gray-300">
          Pexels
        </a>{" "}
        API.
      </div>
    </footer>
  );
}
