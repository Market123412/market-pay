export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  productCount: number;
  image: string;
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Eletrônicos",
    slug: "eletronicos",
    icon: "Smartphone",
    description: "Celulares, notebooks, tablets e mais",
    productCount: 1250,
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80",
  },
  {
    id: "2",
    name: "Casa & Decoração",
    slug: "casa-decoracao",
    icon: "Home",
    description: "Móveis, decoração e utilidades domésticas",
    productCount: 890,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80",
  },
  {
    id: "3",
    name: "Moda",
    slug: "moda",
    icon: "Shirt",
    description: "Roupas, calçados e acessórios",
    productCount: 2100,
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80",
  },
  {
    id: "4",
    name: "Esportes",
    slug: "esportes",
    icon: "Dumbbell",
    description: "Equipamentos esportivos e fitness",
    productCount: 670,
    image: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=400&q=80",
  },
  {
    id: "5",
    name: "Livros",
    slug: "livros",
    icon: "BookOpen",
    description: "Livros, e-books e materiais educativos",
    productCount: 3400,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80",
  },
  {
    id: "6",
    name: "Beleza & Saúde",
    slug: "beleza-saude",
    icon: "Heart",
    description: "Cosméticos, perfumes e cuidados pessoais",
    productCount: 1560,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80",
  },
  {
    id: "7",
    name: "Automotivo",
    slug: "automotivo",
    icon: "Car",
    description: "Peças, acessórios e ferramentas automotivas",
    productCount: 450,
    image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=400&q=80",
  },
  {
    id: "8",
    name: "Games",
    slug: "games",
    icon: "Gamepad2",
    description: "Consoles, jogos e acessórios gamer",
    productCount: 780,
    image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&q=80",
  },
];
