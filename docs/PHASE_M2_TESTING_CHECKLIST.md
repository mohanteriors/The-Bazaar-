# Phase M2 Testing Checklist

**Date:** November 22, 2025
**Phase:** M2 – Discovery & Catalog
**Status:** Ready for Testing

---

## Pre-Testing Requirements

### Supabase Data Setup
Before testing, ensure the following data exists in Supabase:

- [ ] **Categories**: At least 5-8 top-level categories with icons/emojis
- [ ] **Vendors**: At least 3-5 approved vendors with:
  - Business name, logo, description
  - Storefront created with slug
- [ ] **Products**: At least 20-30 products with:
  - All required fields (name, slug, description, price)
  - Images array (at least 1 image per product)
  - Category assignment
  - Vendor assignment
  - Stock levels
  - Some marked as `isFeatured = true`
  - Variety of price ranges
  - Some with `compareAtPrice` for sale pricing
  - Some with variants (optional)
- [ ] **Reviews**: At least 10-15 reviews across products with:
  - Ratings (1-5 stars)
  - Comments
  - User associations
  - Some marked as `isVerified = true`

---

## M2.1 - Homepage Testing

### Hero Section
- [ ] Hero section displays with gradient background
- [ ] Search bar is visible and functional
- [ ] Search bar navigates to `/search?q=<query>` on submit
- [ ] CTA buttons link to correct pages
- [ ] Trust indicators show correct numbers
- [ ] Wave divider renders properly
- [ ] Responsive on mobile, tablet, desktop

### Featured Products
- [ ] Featured products load from Supabase
- [ ] Only products with `isFeatured = true` and `status = ACTIVE` show
- [ ] Loading spinner displays while fetching
- [ ] Error state shows if fetch fails
- [ ] Empty state shows if no featured products
- [ ] Product cards display correctly
- [ ] "View All Featured Products" link appears if 12+ products
- [ ] Responsive grid layout works on all screens

### Category Grid
- [ ] Categories load from Supabase
- [ ] Only top-level categories (no parent) display
- [ ] Category icons/emojis render if available
- [ ] Hover effects work
- [ ] Links navigate to `/categories/<slug>`
- [ ] "View All Categories" shows if 8+ categories
- [ ] Responsive grid layout

### Promo Banners
- [ ] Trust indicators (Free Shipping, Secure Payment, etc.) display
- [ ] Vendor CTA banner shows
- [ ] Links work correctly
- [ ] Icons render properly

---

## M2.2 - Search & Filters Testing

### Search Functionality
- [ ] Search page loads at `/search`
- [ ] URL query parameter `?q=<term>` works
- [ ] Search input auto-focuses on page load
- [ ] Search preserves existing filters
- [ ] Full-text search works on product names
- [ ] Full-text search works on product descriptions
- [ ] Case-insensitive search
- [ ] Empty search shows all products

### Category Filter
- [ ] All categories display in filter sidebar
- [ ] "All Categories" option works
- [ ] Selecting a category filters products
- [ ] URL updates with `?category=<id>`
- [ ] Filter persists on page reload

### Price Range Filter
- [ ] Min price input works
- [ ] Max price input works
- [ ] Products filter correctly by price range
- [ ] URL updates with `?minPrice=<n>&maxPrice=<n>`
- [ ] Clearing price inputs removes filter

### Rating Filter
- [ ] Rating options (1-5 stars) display
- [ ] Selecting a rating filters products
- [ ] URL updates with `?minRating=<n>`
- [ ] "Clear rating filter" button works
- [ ] Products with average rating >= selected value show

### Stock Filter
- [ ] "In Stock Only" checkbox works
- [ ] Only products with `stock > 0` show when checked
- [ ] URL updates with `?inStock=true`
- [ ] Unchecking shows all products again

### Sort Options
- [ ] "Newest First" sorts by `createdAt DESC`
- [ ] "Price: Low to High" sorts by `price ASC`
- [ ] "Price: High to Low" sorts by `price DESC`
- [ ] "Most Popular" sorts correctly (placeholder: newest)
- [ ] "Highest Rated" sorts correctly (placeholder: newest)
- [ ] URL updates with `?sort=<option>`

### Pagination
- [ ] Pagination shows when > 24 products
- [ ] "Previous" button disabled on page 1
- [ ] "Next" button disabled on last page
- [ ] Page numbers display correctly
- [ ] Clicking page number navigates correctly
- [ ] URL updates with `?page=<n>`
- [ ] Page scrolls to top on navigation

### Mobile Filters
- [ ] Filter button shows on mobile
- [ ] Filter modal opens on button click
- [ ] Active filter indicator (!) shows when filters applied
- [ ] Modal closes on "Apply Filters" or backdrop click
- [ ] Filters work same as desktop

### Clear All Filters
- [ ] "Clear All" button shows when filters active
- [ ] Clicking clears all filters except search query
- [ ] URL resets to `/search?q=<query>` (if query exists)

### Empty State
- [ ] Shows when no products match filters
- [ ] "Clear Filters" button works
- [ ] Helpful message displays

---

## M2.3 - Product Detail Page Testing

### Page Loading
- [ ] Product page loads at `/products/<slug>`
- [ ] 404 page shows for invalid slug
- [ ] Page loads for inactive products (should 404)
- [ ] SEO metadata populates correctly
- [ ] OpenGraph tags set for social sharing

### Breadcrumbs
- [ ] Home link works
- [ ] Category link works (if category exists)
- [ ] Product name displays (truncated if long)
- [ ] Responsive on mobile

### Product Gallery
- [ ] First image displays by default
- [ ] Thumbnail grid shows all images
- [ ] Clicking thumbnail changes main image
- [ ] Previous/Next arrows work
- [ ] Arrows only show if multiple images
- [ ] Image counter shows current/total
- [ ] Zoom button opens full-screen modal
- [ ] Zoom modal closes on click or close button
- [ ] Fallback image shows if no images

### Product Info
- [ ] Product name displays
- [ ] SKU displays (if exists)
- [ ] Star rating shows (if reviews exist)
- [ ] Review count shows
- [ ] Current price displays
- [ ] Compare-at price shows (if exists)
- [ ] Discount percentage calculates correctly
- [ ] Stock status shows correctly:
  - "In Stock" if stock > lowStockThreshold
  - "Only X left in stock" if stock <= lowStockThreshold
  - "Out of Stock" if stock = 0
- [ ] Description displays with line breaks

### Variant Selection
- [ ] Variants only show if `hasVariants = true`
- [ ] All variant types display (e.g., Size, Color)
- [ ] Clicking variant option selects it
- [ ] Selected variant highlights
- [ ] Multiple variant types can be selected

### Quantity Selector
- [ ] Default quantity is 1
- [ ] Plus button increases quantity
- [ ] Minus button decreases quantity (min 1)
- [ ] Input allows manual entry
- [ ] Quantity limited to available stock
- [ ] Disabled when out of stock

### Add to Cart
- [ ] "Add to Cart" button works
- [ ] Cart store updates with correct data
- [ ] Success message shows briefly
- [ ] Button disabled when out of stock
- [ ] Selected variant included in cart item
- [ ] Quantity added matches selector

### Wishlist & Share
- [ ] Wishlist button present (placeholder)
- [ ] Share button present (placeholder)

### Trust Badges
- [ ] Secure payment badge shows
- [ ] Free shipping badge shows

### Vendor Card
- [ ] Vendor logo displays (if exists)
- [ ] Business name shows
- [ ] Description shows (truncated to 2 lines)
- [ ] Join date formats correctly
- [ ] Location shows "Kenya"
- [ ] "Visit Storefront" link works (if storefront exists)

### Product Reviews
- [ ] Average rating calculates correctly
- [ ] Total review count shows
- [ ] Rating distribution bars show correctly
- [ ] Percentages calculate accurately

#### Individual Reviews
- [ ] User avatar shows (or initials)
- [ ] User name displays
- [ ] Verified purchase badge shows (if `isVerified = true`)
- [ ] Star rating displays
- [ ] Review date formats correctly
- [ ] Review title shows (if exists)
- [ ] Review comment displays
- [ ] Review images show (up to 4)
- [ ] Helpful button present
- [ ] Report button present

#### Sort Reviews
- [ ] "Most Recent" sorts by date DESC
- [ ] "Highest Rating" sorts by rating DESC
- [ ] "Lowest Rating" sorts by rating ASC

#### Empty State
- [ ] Shows when no reviews
- [ ] "Write a Review" button present

### Related Products
- [ ] Related products load from same category
- [ ] Current product excluded from results
- [ ] Horizontal scroll works
- [ ] Scroll buttons work on desktop
- [ ] Product cards display correctly
- [ ] Section hidden if no related products

---

## Cross-Component Testing

### Navigation
- [ ] Header search navigates to search page
- [ ] Cart icon shows item count
- [ ] All navigation links work
- [ ] Footer links work

### Cart Integration
- [ ] Adding product from homepage updates cart
- [ ] Adding product from search updates cart
- [ ] Adding product from detail page updates cart
- [ ] Cart count updates in header
- [ ] Cart persists in localStorage

### Loading States
- [ ] All components show loading spinners
- [ ] No layout shift during loading
- [ ] Skeleton screens (if implemented)

### Error Handling
- [ ] Network errors show retry buttons
- [ ] Invalid data handled gracefully
- [ ] Console errors logged appropriately

---

## Performance Testing

- [ ] Homepage loads in < 2 seconds
- [ ] Search results load in < 1 second
- [ ] Product detail page loads in < 2 seconds
- [ ] Images lazy load
- [ ] No unnecessary re-renders
- [ ] React Query caching works

---

## Responsive Design Testing

### Mobile (320px - 767px)
- [ ] All pages render correctly
- [ ] Touch targets are adequate (44x44px min)
- [ ] Text is readable
- [ ] Images scale properly
- [ ] Mobile filters work
- [ ] Hamburger menu works (if applicable)

### Tablet (768px - 1023px)
- [ ] Grid layouts adjust appropriately
- [ ] Sidebar filters visible
- [ ] Images scale properly

### Desktop (1024px+)
- [ ] Full layout displays
- [ ] Hover states work
- [ ] Multi-column grids show

---

## Accessibility Testing

- [ ] All images have alt text
- [ ] Buttons have aria-labels
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG 2.1 AA
- [ ] Screen reader friendly

---

## SEO Testing

- [ ] Homepage has proper meta tags
- [ ] Product pages have dynamic meta tags
- [ ] OpenGraph tags set
- [ ] Structured data (future enhancement)

---

## Browser Compatibility

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## Post-Testing Actions

- [ ] Document any bugs found
- [ ] Create GitHub issues for bugs
- [ ] Update Phase M2 Audit Report
- [ ] Commit all changes to main branch
- [ ] Tag commit as `phase-m2-complete`
- [ ] Update Build Scratchpad

---

## Notes

- Testing should be done with real Supabase data
- If data doesn't exist, create sample data first
- Test with different user roles (shopper, vendor, admin)
- Test with slow network (throttle to 3G)
- Test with disabled JavaScript (for SSR verification)
