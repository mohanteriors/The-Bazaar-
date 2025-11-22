import Link from 'next/link';
import Image from 'next/image';
import { Store, MapPin, Calendar } from 'lucide-react';

interface VendorCardProps {
  vendor: any;
}

export function VendorCard({ vendor }: VendorCardProps) {
  if (!vendor) return null;

  const storefront = vendor.storefront;
  const joinDate = new Date(vendor.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-brand-navy mb-4 flex items-center gap-2">
        <Store className="h-5 w-5" />
        Sold By
      </h3>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Vendor Logo */}
        {vendor.logo && (
          <div className="flex-shrink-0">
            <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
              <Image
                src={vendor.logo}
                alt={vendor.businessName}
                fill
                className="object-contain p-2"
                sizes="96px"
              />
            </div>
          </div>
        )}

        {/* Vendor Info */}
        <div className="flex-1">
          <h4 className="text-xl font-bold text-brand-navy mb-2">
            {vendor.businessName}
          </h4>

          {vendor.description && (
            <p className="text-gray-700 mb-4 line-clamp-2">
              {vendor.description}
            </p>
          )}

          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Joined {joinDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Kenya</span>
            </div>
          </div>

          {/* View Storefront Button */}
          {storefront && (
            <Link
              href={`/vendors/${storefront.slug}`}
              className="inline-flex items-center gap-2 px-6 py-2 bg-brand-primary text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <Store className="h-4 w-4" />
              Visit Storefront
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
