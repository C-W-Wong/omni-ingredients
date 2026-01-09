export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  date: string;
  readTime: number;
  featured: boolean;
  author: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}
