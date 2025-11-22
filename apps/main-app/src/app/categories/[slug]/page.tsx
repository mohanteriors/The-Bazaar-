export default function CategoryPage({ params }: { params: { slug: string } }) {
  const categoryName = params.slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold font-display mb-6">{categoryName}</h1>
      <p className="text-gray-600">
        Product catalog for {categoryName} will be implemented in Phase M2.
      </p>
    </div>
  );
}
