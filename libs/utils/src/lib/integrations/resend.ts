/**
 * Resend Email Integration
 * Handles transactional emails
 */

export interface EmailParams {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
  replyTo?: string;
}

export class ResendService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Send email
   */
  async sendEmail(params: EmailParams) {
    // TODO: Implement Resend email sending
    console.log('Sending email via Resend:', params);
    return {
      id: 'email_placeholder',
      success: true,
    };
  }

  /**
   * Send order confirmation email
   */
  async sendOrderConfirmation(params: {
    to: string;
    orderNumber: string;
    total: number;
    items: Array<{ name: string; quantity: number; price: number }>;
  }) {
    return this.sendEmail({
      to: params.to,
      subject: `Order Confirmation - ${params.orderNumber}`,
      html: `
        <h1>Thank you for your order!</h1>
        <p>Order Number: ${params.orderNumber}</p>
        <p>Total: KES ${params.total}</p>
      `,
    });
  }

  /**
   * Send vendor approval email
   */
  async sendVendorApproval(params: { to: string; businessName: string }) {
    return this.sendEmail({
      to: params.to,
      subject: 'Your vendor account has been approved',
      html: `
        <h1>Congratulations!</h1>
        <p>Your vendor account for ${params.businessName} has been approved.</p>
      `,
    });
  }
}

export function createResendService(): ResendService {
  return new ResendService(process.env.RESEND_API_KEY || '');
}
