/**
 * Notification Service
 * Handles in-app notifications and external notifications (email, SMS, push)
 */

import { logger } from '../logging/logger';

export type NotificationType =
  | 'ORDER_UPDATE'
  | 'PAYMENT_UPDATE'
  | 'VENDOR_UPDATE'
  | 'SYSTEM_ALERT'
  | 'CHAT_MESSAGE';

export interface NotificationPayload {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  orderId?: string;
  link?: string;
}

export interface NotificationChannel {
  inApp?: boolean;
  email?: boolean;
  sms?: boolean;
  push?: boolean;
}

export class NotificationService {
  /**
   * Send notification through specified channels
   */
  async send(
    payload: NotificationPayload,
    channels: NotificationChannel = { inApp: true }
  ): Promise<void> {
    logger.info('Sending notification', {
      userId: payload.userId,
      type: payload.type,
      channels,
    });

    const promises: Promise<void>[] = [];

    if (channels.inApp) {
      promises.push(this.sendInApp(payload));
    }

    if (channels.email) {
      promises.push(this.sendEmail(payload));
    }

    if (channels.sms) {
      promises.push(this.sendSMS(payload));
    }

    if (channels.push) {
      promises.push(this.sendPush(payload));
    }

    await Promise.allSettled(promises);
  }

  /**
   * Send in-app notification
   */
  private async sendInApp(payload: NotificationPayload): Promise<void> {
    // TODO: Implement database insert for in-app notification
    logger.debug('Sending in-app notification', { payload });
  }

  /**
   * Send email notification
   */
  private async sendEmail(payload: NotificationPayload): Promise<void> {
    // TODO: Implement email sending via Resend
    logger.debug('Sending email notification', { payload });
  }

  /**
   * Send SMS notification
   */
  private async sendSMS(payload: NotificationPayload): Promise<void> {
    // TODO: Implement SMS sending
    logger.debug('Sending SMS notification', { payload });
  }

  /**
   * Send push notification
   */
  private async sendPush(payload: NotificationPayload): Promise<void> {
    // TODO: Implement push notification via Firebase/OneSignal
    logger.debug('Sending push notification', { payload });
  }

  /**
   * Send order update notification
   */
  async notifyOrderUpdate(
    userId: string,
    orderId: string,
    status: string,
    channels?: NotificationChannel
  ): Promise<void> {
    await this.send(
      {
        userId,
        type: 'ORDER_UPDATE',
        title: 'Order Update',
        message: `Your order status has been updated to: ${status}`,
        orderId,
        link: `/orders/${orderId}`,
      },
      channels
    );
  }

  /**
   * Send payment confirmation notification
   */
  async notifyPaymentConfirmed(
    userId: string,
    orderId: string,
    amount: number,
    channels?: NotificationChannel
  ): Promise<void> {
    await this.send(
      {
        userId,
        type: 'PAYMENT_UPDATE',
        title: 'Payment Confirmed',
        message: `Your payment of KES ${amount} has been confirmed`,
        orderId,
        link: `/orders/${orderId}`,
      },
      channels
    );
  }

  /**
   * Send vendor approval notification
   */
  async notifyVendorApproved(
    userId: string,
    businessName: string,
    channels?: NotificationChannel
  ): Promise<void> {
    await this.send(
      {
        userId,
        type: 'VENDOR_UPDATE',
        title: 'Vendor Account Approved',
        message: `Your vendor account for ${businessName} has been approved`,
        link: '/vendor/dashboard',
      },
      channels
    );
  }
}

// Export singleton instance
export const notificationService = new NotificationService();
