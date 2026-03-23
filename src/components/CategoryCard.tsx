import Link from "next/link";
import { Category } from "@/data/categories";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/categoria/${category.slug}`}
      className="group relative flex h-40 overflow-hidden rounded-2xl sm:h-48"
    >
      <img
        src={category.image}
        alt={category.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="relative mt-auto p-4">
        <h3 className="text-lg font-bold text-white">{category.name}</h3>
        <p className="text-xs text-white/80">{category.productCount.toLocaleString("pt-BR")} produtos</p>
      </div>
    </Link>
  );
}
