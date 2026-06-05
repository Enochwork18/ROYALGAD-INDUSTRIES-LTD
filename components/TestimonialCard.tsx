import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role?: string;
  quote: string;
  rating: number;
}

export default function TestimonialCard({ name, role, quote, rating }: TestimonialCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
      <div className="flex gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-slate-600"}`}
          />
        ))}
      </div>
      <p className="text-gray-600 dark:text-slate-400 text-sm italic leading-relaxed">&ldquo;{quote}&rdquo;</p>
      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-slate-700">
        <p className="font-semibold text-gray-900 dark:text-slate-100 text-sm">{name}</p>
        {role && <p className="text-gray-500 dark:text-slate-400 text-xs">{role}</p>}
      </div>
    </div>
  );
}
