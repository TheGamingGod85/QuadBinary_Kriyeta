
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({ 
  title, 
  subtitle, 
  className,
  align = "center" 
}: SectionHeaderProps) {
  return (
    <div className={cn(
      "mb-12",
      align === "center" ? "text-center" : "text-left",
      className
    )}>
      <h2 className="text-3xl font-bold mb-4 md:text-4xl">
        {title}
      </h2>
      <p className="max-w-2xl text-gray-600 md:text-lg mx-auto">
        {subtitle}
      </p>
    </div>
  );
}
