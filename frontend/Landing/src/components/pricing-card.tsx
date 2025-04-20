
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  className?: string;
}

export function PricingCard({ 
  title, 
  price, 
  description, 
  features, 
  isPopular = false,
  className 
}: PricingCardProps) {
  return (
    <div className={cn(
      "flex flex-col p-6 rounded-2xl shadow-md bg-white border",
      isPopular 
        ? "border-primary scale-105 shadow-lg relative z-10" 
        : "border-gray-200",
      className
    )}>
      {isPopular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
          Most Popular
        </div>
      )}
      <div className="mb-5">
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="mt-3 flex items-baseline">
          <span className="text-3xl font-bold tracking-tight">{price}</span>
          {price !== "Free" && <span className="ml-1 text-gray-500">/month</span>}
        </div>
        <p className="mt-2 text-gray-600">{description}</p>
      </div>
      
      <ul className="mb-6 space-y-2 flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button 
        variant={isPopular ? "default" : "outline"}
        className="mt-auto w-full"
      >
        Get Started
      </Button>
    </div>
  );
}
