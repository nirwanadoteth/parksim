# Adapter Pattern

The Adapter pattern converts the interface of a class into another interface clients expect. Adapter lets classes work together that couldn't otherwise because of incompatible interfaces.

## Class Diagram

```mermaid
classDiagram
    class IPaymentProcessor {
        <<interface>>
        +pay(amount: number) string
    }
    
    class ExternalStripeLib {
        +makeCharge(cents: number, currency: string) string
    }
    
    class StripeAdapter {
        -stripe: ExternalStripeLib
        +pay(amount: number) string
    }
    
    IPaymentProcessor <|.. StripeAdapter
    StripeAdapter o-- ExternalStripeLib : stripe
```

## Usage

```typescript
const paymentProcessor: IPaymentProcessor = new StripeAdapter();
paymentProcessor.pay(50000); // "Stripe charged 5000000 IDR"
```
