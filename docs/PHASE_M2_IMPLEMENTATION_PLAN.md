# Phase M2 Implementation Plan - Discovery & Catalog

**Date:** November 22, 2025
**Phase:** M2 – Discovery & Catalog
**Portal:** Main App (Shopper Portal)

---

## Database Schema Analysis

### Key Tables for Phase M2

**Products Table:**
- `id`, `vendorId`, `categoryId`
- `name`, `slug`, `description`, `images` (JSON array)
- `price`, `compareAtPrice`, `currency`
- `sku`, `stock`, `lowStockThreshold`
- `hasVariants`, `variants` (JSON)
- `status` (DRAFT, ACTIVE, INACTIVE, PENDING_REVIEW, REJECTED)
- `isActive`, `isFeatured`
- `metaTitle`, `metaDescription`
- Relations: `vendor`, `category`, `orderItems`, `reviews`

**Categories Table:**
- `id`, `name`, `slug`, `description`, `icon`
- `parentId` (self-referencing for hierarchy)
- `order`, `isActive`
- Relations: `parent`, `children`, `products`

**Reviews Table:**
- `id`, `productId`, `userId`
- `rating` (1-5), `title`, `comment`, `images` (JSON)
- `isVerified`, `isHidden`

**Vendors Table:**
- `id`, `userId`, `businessName`, `logo`
- `kycStatus`
- Relations: `storefront`, `products`

---

## Implementation Strategy

### M2.1 - Homepage Hero, Featured, Promos, Search

**Components to Build:**
1. **HeroSection** - Main banner with CTA
2. **FeaturedProducts** - Grid of featured products from Supabase
3. **PromoBanners** - Promotional sections
4. **SearchBar** - Enhanced search with autocomplete

**Supabase Queries:**
```typescript
// Fetch featured products
const { data } = await supabase
  .from('products')
  .select('*, vendor:vendors(*), category:categories(*)')
  .eq('isActive', true)
  .eq('isFeatured', true)
  .eq('status', 'ACTIVE')
  .order('createdAt', { ascending: false })
  .limit(12);
```

**Features:**
- Real-time product data from Supabase
- Optimized images with Next.js Image component
- Responsive grid layout
- Loading states and error handling
- SEO optimization

---

### M2.2 - Search + Faceted Filters

**Components to Build:**
1. **SearchPage** - Main search results page
2. **FilterSidebar** - Category, price, rating, stock filters
3. **ProductGrid** - Responsive product grid
4. **SortDropdown** - Sort by price, popularity, newest
5. **Pagination** - Handle large result sets

**Supabase Queries:**
```typescript
// Advanced search with filters
let query = supabase
  .from('products')
  .select('*, vendor:vendors(*), category:categories(*), reviews(*)')
  .eq('isActive', true)
  .eq('status', 'ACTIVE');

// Text search
if (searchTerm) {
  query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
}

// Category filter
if (categoryId) {
  query = query.eq('categoryId', categoryId);
}

// Price range filter
if (minPrice) query = query.gte('price', minPrice);
if (maxPrice) query = query.lte('price', maxPrice);

// Stock filter
if (inStockOnly) {
  query = query.gt('stock', 0);
}

// Sorting
query = query.order(sortField, { ascending: sortOrder === 'asc' });

// Pagination
const from = (page - 1) * pageSize;
const to = from + pageSize - 1;
query = query.range(from, to);
```

**Features:**
- Full-text search across product names and descriptions
- Multi-select category filters
- Price range slider
- Vendor rating filter (calculated from reviews)
- Stock availability toggle
- Sort options: price (low-high, high-low), newest, popularity
- Pagination with page numbers
- URL query params for shareable filtered results
- Filter count badges
- Clear all filters option

---

### M2.3 - Product Detail Pages

**Components to Build:**
1. **ProductGallery** - Image carousel with thumbnails
2. **ProductInfo** - Name, price, description, vendor
3. **VariantSelector** - Size, color, etc. selection
4. **AddToCartButton** - Add to cart with quantity
5. **VendorCard** - Vendor information and link to storefront
6. **ReviewsSection** - Product reviews with ratings
7. **RelatedProducts** - Similar products recommendation

**Supabase Queries:**
```typescript
// Fetch single product with all relations
const { data: product } = await supabase
  .from('products')
  .select(`
    *,
    vendor:vendors(
      id,
      businessName,
      logo,
      storefront:storefronts(slug, name)
    ),
    category:categories(id, name, slug),
    reviews(
      id,
      rating,
      title,
      comment,
      images,
      isVerified,
      createdAt,
      user:users(firstName, lastName, avatar)
    )
  `)
  .eq('slug', productSlug)
  .eq('isActive', true)
  .single();

// Calculate average rating
const avgRating = product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length;

// Fetch related products (same category)
const { data: related } = await supabase
  .from('products')
  .select('*, vendor:vendors(*)')
  .eq('categoryId', product.categoryId)
  .eq('isActive', true)
  .eq('status', 'ACTIVE')
  .neq('id', product.id)
  .limit(6);
```

**Features:**
- Dynamic product pages using `[slug]` route
- Image gallery with zoom functionality
- Variant selection (if `hasVariants` is true)
- Stock availability indicator
- Add to cart with quantity selector
- Vendor information card with link to storefront
- Reviews section with:
  - Average rating display
  - Individual reviews with user info
  - Verified purchase badges
  - Review images
  - Sort by: Most recent, highest rating, lowest rating
- Related products carousel
- Breadcrumb navigation
- Social sharing buttons
- Wishlist functionality (future: save to user profile)
- SEO: Dynamic meta tags from product data

---

## Technical Requirements

### Performance
- Server-side rendering for SEO
- Image optimization with Next.js Image
- Lazy loading for images and components
- Debounced search input
- Optimistic UI updates for cart actions

### Security
- Input sanitization for search queries
- RLS policies verification
- XSS prevention

### Accessibility
- ARIA labels for all interactive elements
- Keyboard navigation support
- Screen reader friendly
- Color contrast compliance (WCAG 2.1 AA)

### Mobile Responsiveness
- Mobile-first design
- Touch-friendly UI elements
- Responsive images
- Optimized for 3G networks

---

## Data Requirements

### Supabase Setup Needed
1. Verify RLS policies on products, categories, vendors, reviews tables
2. Create database indexes for performance:
   - `products(slug)`
   - `products(categoryId, isActive, status)`
   - `products(isFeatured, isActive)`
   - Full-text search indexes on `name` and `description`

### Sample Data (For Testing Only)
- Will create a few test products, categories, and vendors in Supabase
- Will be clearly marked as test data
- Production will use real vendor data

---

## Success Criteria

**M2.1:**
- [ ] Homepage loads featured products from Supabase
- [ ] Hero section displays with proper branding
- [ ] Search bar navigates to search page
- [ ] All components responsive

**M2.2:**
- [ ] Search returns accurate results
- [ ] All filters work correctly
- [ ] Sorting functions properly
- [ ] Pagination handles large datasets
- [ ] URL reflects current filter state

**M2.3:**
- [ ] Product pages load with all data
- [ ] Image gallery functional
- [ ] Variant selection works
- [ ] Add to cart updates cart state
- [ ] Reviews display correctly
- [ ] Related products show
- [ ] SEO meta tags populated

---

## Timeline Estimate

- **M2.1:** 3-4 hours
- **M2.2:** 4-5 hours
- **M2.3:** 5-6 hours
- **Testing & Polish:** 2-3 hours
- **Total:** 14-18 hours of focused development

---

## Next Steps

1. Set up test data in Supabase (minimal, clearly marked)
2. Implement M2.1 components
3. Implement M2.2 search and filters
4. Implement M2.3 product detail pages
5. Test all features with real Supabase data
6. Update documentation
7. Commit to main branch
