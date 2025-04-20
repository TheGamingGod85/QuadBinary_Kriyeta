
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface AnchorLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function AnchorLink({ href, children, className, onClick }: AnchorLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Extract the ID from the href
    const targetId = href.replace(/#/g, "");
    const element = document.getElementById(targetId);
    
    if (element) {
      // Scroll to the element
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      
      // Update the URL without reloading the page
      window.history.pushState(null, "", href);
    }
    
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link
      to={href}
      onClick={handleClick}
      className={cn(className)}
    >
      {children}
    </Link>
  );
}
