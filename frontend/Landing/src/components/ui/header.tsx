import { Button } from "./button";
import { Link } from "react-router-dom";
import { AnchorLink } from "@/components/anchor-link";

export function Header() {
  const handleLoginClick = () => {
    window.location.href = 'https://sentinel-login-forge-3x7h.vercel.app/';
  };

  const handleSignupClick = () => {
    window.location.href = 'https://sentinel-login-forge-3x7h.vercel.app/';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-8">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 text-primary"
            >
              <path d="M12 2 2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <span className="font-bold text-xl text-gray-900">SentinelAI</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <AnchorLink href="#features" className="text-gray-600 hover:text-primary transition-colors">Features</AnchorLink>
          <AnchorLink href="#how-it-works" className="text-gray-600 hover:text-primary transition-colors">How It Works</AnchorLink>
          <AnchorLink href="#faq" className="text-gray-600 hover:text-primary transition-colors">FAQ</AnchorLink>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" className="hidden md:flex" onClick={handleLoginClick}>
            Login
          </Button>
          
          <Button size="sm" onClick={handleSignupClick}>
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
}
