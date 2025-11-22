import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  category?: {
    name: string;
    slug: string;
  };
  productName: string;
}

export function Breadcrumbs({ category, productName }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-sm mb-6 overflow-x-auto whitespace-nowrap pb-2" aria-label="Breadcrumb">
      <Link
        href="/"
        className="flex items-center gap-1 text-gray-600 hover:text-brand-primary transition-colors"
      >
        <Home className="h-4 w-4" />
        Home
      </Link>

      {category && (
        <>
          <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
          <Link
            href={`/categories/${category.slug}`}
            className="text-gray-600 hover:text-brand-primary transition-colors"
          >
            {category.name}
          </Link>
        </>
      )}

      <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
      <span className="text-brand-navy font-medium truncate max-w-xs">
        {productName}
      </span>
    </nav>
  );
}
