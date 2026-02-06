export interface IPaymentProcessor {
  pay(amount: number): string;
}

class ExternalStripeLib {
  makeCharge(cents: number, currency: string): string {
    return `Stripe charged ${cents} ${currency}`;
  }
}

export class StripeAdapter implements IPaymentProcessor {
  private stripe: ExternalStripeLib;

  constructor() {
    this.stripe = new ExternalStripeLib();
  }

  pay(amount: number): string {
    const cents = amount * 100;
    return this.stripe.makeCharge(cents, "IDR");
  }
}
