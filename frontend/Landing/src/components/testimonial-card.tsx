
import { cn } from "@/lib/utils";
import { QuoteIcon } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
  className?: string;
}

export function TestimonialCard({ quote, author, role, className }: TestimonialCardProps) {
  return (
    <div className={cn(
      "bg-white p-6 rounded-xl shadow-md border border-gray-100",
      "flex flex-col",
      className
    )}>
      <div className="mb-4 text-primary opacity-50">
        <QuoteIcon size={24} />
      </div>
      <p className="text-gray-700 mb-4 italic">"{quote}"</p>
      <div className="mt-auto">
        <p className="font-semibold">{author}</p>
        {role && <p className="text-sm text-gray-500">{role}</p>}
      </div>
    </div>
  );
}
