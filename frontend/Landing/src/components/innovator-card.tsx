
import { cn } from "@/lib/utils";
import { useState } from "react";

interface InnovatorCardProps {
  imageSrc?: string;
  name?: string;
  role?: string;
  className?: string;
}

export function InnovatorCard({ 
  imageSrc = "/placeholder.svg", 
  name = "Team Member", 
  role = "Position", 
  className 
}: InnovatorCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={cn(
        "flex flex-col items-center transition-all duration-300",
        "hover:transform hover:-translate-y-2",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full aspect-square mb-3 overflow-hidden rounded-xl">
        <img 
          src={imageSrc} 
          alt={name}
          className={cn(
            "w-full h-full object-cover transition-transform duration-300",
            isHovered ? "scale-110" : "scale-100"
          )}
        />
      </div>
      <div className="text-center">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-gray-600 text-sm">{role}</p>
      </div>
    </div>
  );
}
