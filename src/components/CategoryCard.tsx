import Link from "next/link";
import Image from "next/image";
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
      <Image
        src={category.image}
        alt={category.name}
        fill
        className="object-cover transition-transform group-hover:scale-110"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="relative mt-auto p-4">
        <h3 className="text-lg font-bold text-white">{category.name}</h3>
        <p className="text-xs text-white/80">{category.productCount.toLocaleString("pt-BR")} produtos</p>
      </div>
    </Link>
  );
}
