// lib/patterns/structural/adapter.ts

// Target Interface
export interface IPaymentProcessor {
  pay(amount: number): string;
}

// Adaptee (3rd Party Lib yang tidak bisa diubah)
class ExternalStripeLib {
  makeCharge(cents: number, currency: string): string {
    return `Stripe charged ${cents} ${currency}`;
  }
}

// Adapter
export class StripeAdapter implements IPaymentProcessor {
  private stripe: ExternalStripeLib;

  constructor() {
    this.stripe = new ExternalStripeLib();
  }

  pay(amount: number): string {
    // Konversi logic: amount (dollars) -> cents
    const cents = amount * 100;
    return this.stripe.makeCharge(cents, "IDR");
  }
}
