import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Mail, MessageCircle, Heart } from 'lucide-react';
import { Logo } from '../ui/Logo';

export function Footer() {
  return (
    <footer className="relative mt-20 z-10 w-full overflow-hidden bg-white/40 backdrop-blur-xl border-t border-white/60">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Logo size="small" className="mb-4" />
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Bridging the gap between waste and want through real-time food redistribution.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary-green hover:text-white transition-colors">
                <Globe size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary-green hover:text-white transition-colors">
                <Mail size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary-green hover:text-white transition-colors">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4">Platform</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link to="/about" className="hover:text-primary-green transition-colors">About Us</Link></li>
              <li><Link to="/impact" className="hover:text-primary-green transition-colors">Our Impact</Link></li>
              <li><Link to="/involved" className="hover:text-primary-green transition-colors">Get Involved</Link></li>
              <li><Link to="/available-food" className="hover:text-primary-green transition-colors">Available Food</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary-green transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary-green transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary-green transition-colors">Food Safety Guidelines</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold mb-4">Stay Updated</h4>
            <p className="text-sm text-gray-600 mb-4">Subscribe to our newsletter for impact reports and updates.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-white/50 border border-border-color rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary-green"
              />
              <button className="bg-text-dark text-white rounded-xl px-4 py-2 text-sm font-bold hover:bg-primary-green transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-border-color/50 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} FoodFlux. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart size={14} className="text-red-500" /> for a better planet.
          </p>
        </div>
      </div>
    </footer>
  );
}
