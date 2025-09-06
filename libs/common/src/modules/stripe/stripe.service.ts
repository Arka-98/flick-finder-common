import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private readonly loggerService = new Logger(StripeService.name);
  public instance: Stripe;

  constructor(private readonly configService: ConfigService) {
    this.instance = new Stripe(this.configService.get('STRIPE_API_KEY'));
  }

  async createProduct(productDetails: Stripe.ProductCreateParams) {
    const product = await this.instance.products.create(productDetails);

    this.loggerService.debug(
      `Product created with name ${product.name} and ID ${product.id}`,
    );

    return product;
  }

  async createPrice(priceDetails: Stripe.PriceCreateParams) {
    const price = await this.instance.prices.create(priceDetails);

    this.loggerService.debug(
      `Price created for product ID ${priceDetails.product}`,
    );

    return price;
  }

  async createProductAndPrice(
    productDetails: Stripe.ProductCreateParams,
    priceDetails: Stripe.PriceCreateParams,
  ) {
    const product = await this.createProduct(productDetails);
    const price = await this.createPrice({
      ...priceDetails,
      product: product.id,
    });

    return { product, price };
  }

  async createCheckoutSession(
    lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
    successUrl: string,
    cancelUrl: string,
  ) {
    const checkout = await this.instance.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    this.loggerService.debug(
      `Checkout session created for price IDs ${lineItems.map(({ price }) => price).join(', ')}`,
    );

    return checkout;
  }

  async verifyAndConstructEvent(
    payload: Buffer,
    stripeSignature: string,
    endpointSecret: string,
  ) {
    const event = await this.instance.webhooks.constructEventAsync(
      payload,
      stripeSignature,
      endpointSecret,
    );

    this.loggerService.debug(
      `Stripe event ${event.type} verified with ID ${event.id}`,
    );

    return event;
  }
}
