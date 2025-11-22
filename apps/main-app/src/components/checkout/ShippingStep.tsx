'use client';

import { useState, useEffect } from 'react';
import {
  useCheckoutStore,
  ShippingAddress,
} from '../../lib/stores/checkoutStore';
import { MapPin, User, Phone, Mail } from 'lucide-react';

export function ShippingStep() {
  const setShippingAddress = useCheckoutStore(
    (state) => state.setShippingAddress
  );
  const setCurrentStep = useCheckoutStore((state) => state.setCurrentStep);
  const savedAddress = useCheckoutStore((state) => state.shippingAddress);

  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: savedAddress?.fullName || '',
    phone: savedAddress?.phone || '',
    street: savedAddress?.street || '',
    city: savedAddress?.city || '',
    state: savedAddress?.state || '',
    postalCode: savedAddress?.postalCode || '',
    country: savedAddress?.country || 'Kenya',
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ShippingAddress, string>>
  >({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ShippingAddress, string>> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.street.trim())
      newErrors.street = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State/County is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setShippingAddress(formData);
      setCurrentStep(2);
    }
  };

  const handleChange = (field: keyof ShippingAddress, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="bg-white rounded-xl p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-brand-navy mb-2">
          Shipping Address
        </h2>
        <p className="text-gray-600">
          Enter the address where you want your order delivered
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-brand-navy mb-2"
          >
            Full Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none ${
                errors.fullName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="John Doe"
            />
          </div>
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-brand-navy mb-2"
          >
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="+254 712 345 678"
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        {/* Street Address */}
        <div>
          <label
            htmlFor="street"
            className="block text-sm font-medium text-brand-navy mb-2"
          >
            Street Address *
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <textarea
              id="street"
              value={formData.street}
              onChange={(e) => handleChange('street', e.target.value)}
              rows={3}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none ${
                errors.street ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Building name, street name, apartment number"
            />
          </div>
          {errors.street && (
            <p className="mt-1 text-sm text-red-600">{errors.street}</p>
          )}
        </div>

        {/* City and State */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-brand-navy mb-2"
            >
              City *
            </label>
            <input
              id="city"
              type="text"
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none ${
                errors.city ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Nairobi"
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="state"
              className="block text-sm font-medium text-brand-navy mb-2"
            >
              State/County *
            </label>
            <input
              id="state"
              type="text"
              value={formData.state}
              onChange={(e) => handleChange('state', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none ${
                errors.state ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Nairobi County"
            />
            {errors.state && (
              <p className="mt-1 text-sm text-red-600">{errors.state}</p>
            )}
          </div>
        </div>

        {/* Postal Code and Country */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="postalCode"
              className="block text-sm font-medium text-brand-navy mb-2"
            >
              Postal Code
            </label>
            <input
              id="postalCode"
              type="text"
              value={formData.postalCode}
              onChange={(e) => handleChange('postalCode', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none"
              placeholder="00100"
            />
          </div>

          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-brand-navy mb-2"
            >
              Country *
            </label>
            <select
              id="country"
              value={formData.country}
              onChange={(e) => handleChange('country', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none ${
                errors.country ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="Kenya">Kenya</option>
              <option value="Uganda">Uganda</option>
              <option value="Tanzania">Tanzania</option>
              <option value="Rwanda">Rwanda</option>
              <option value="Other">Other</option>
            </select>
            {errors.country && (
              <p className="mt-1 text-sm text-red-600">{errors.country}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-brand-primary text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Continue to Shipping Method
          </button>
        </div>
      </form>
    </div>
  );
}
