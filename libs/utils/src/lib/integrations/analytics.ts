/**
 * Analytics Integration (GA4 & PostHog)
 * Handles event tracking and user analytics
 */

export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, unknown>;
}

export class AnalyticsService {
  private ga4Id?: string;
  private posthogKey?: string;

  constructor(config: { ga4Id?: string; posthogKey?: string }) {
    this.ga4Id = config.ga4Id;
    this.posthogKey = config.posthogKey;
  }

  /**
   * Track event
   */
  track(event: AnalyticsEvent) {
    // TODO: Implement GA4 and PostHog event tracking
    console.log('Tracking event:', event);
  }

  /**
   * Track page view
   */
  trackPageView(url: string, title?: string) {
    this.track({
      name: 'page_view',
      properties: { url, title },
    });
  }

  /**
   * Track e-commerce events
   */
  trackProductView(productId: string, productName: string, price: number) {
    this.track({
      name: 'view_item',
      properties: {
        item_id: productId,
        item_name: productName,
        price,
      },
    });
  }

  trackAddToCart(productId: string, quantity: number, price: number) {
    this.track({
      name: 'add_to_cart',
      properties: {
        item_id: productId,
        quantity,
        value: price * quantity,
      },
    });
  }

  trackPurchase(orderId: string, total: number, items: unknown[]) {
    this.track({
      name: 'purchase',
      properties: {
        transaction_id: orderId,
        value: total,
        items,
      },
    });
  }

  /**
   * Identify user
   */
  identify(userId: string, traits?: Record<string, unknown>) {
    // TODO: Implement user identification
    console.log('Identifying user:', userId, traits);
  }
}

export function createAnalyticsService(): AnalyticsService {
  return new AnalyticsService({
    ga4Id: process.env.NEXT_PUBLIC_GA4_ID,
    posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY,
  });
}
