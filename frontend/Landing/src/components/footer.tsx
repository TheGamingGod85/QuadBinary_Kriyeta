
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const year = new Date().getFullYear();
  
  return (
    <footer className={cn(
      "bg-gray-50 pt-12 pb-8 border-t border-gray-200",
      className
    )}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
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
            </div>
            <p className="text-gray-500 mb-4">
              Transform your home with AI—smarter, efficient, always optimized.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-500 hover:text-primary transition-colors">About</Link></li>
              <li><Link to="#" className="text-gray-500 hover:text-primary transition-colors">Careers</Link></li>
              <li><Link to="#" className="text-gray-500 hover:text-primary transition-colors">Press</Link></li>
              <li><Link to="#" className="text-gray-500 hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-500 hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="#" className="text-gray-500 hover:text-primary transition-colors">Documentation</Link></li>
              <li><Link to="#" className="text-gray-500 hover:text-primary transition-colors">Partners</Link></li>
              <li><Link to="#" className="text-gray-500 hover:text-primary transition-colors">Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-500 hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="text-gray-500 hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="#" className="text-gray-500 hover:text-primary transition-colors">Cookie Policy</Link></li>
              <li><Link to="#" className="text-gray-500 hover:text-primary transition-colors">GDPR</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {year} SentinelAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
