# Strategy Pattern

The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. Strategy lets the algorithm vary independently from clients that use it.

## Class Diagram

```mermaid
classDiagram
    class IPricingStrategy {
        <<interface>>
        +calculate(hours: number) number
    }
    
    class HourlyStrategy {
        +calculate(hours: number) number
    }
    
    class WeekendStrategy {
        +calculate(hours: number) number
    }
    
    class PricingContext {
        -strategy: IPricingStrategy
        +setStrategy(strategy: IPricingStrategy) void
        +executePricing(hours: number) number
    }
    
    IPricingStrategy <|.. HourlyStrategy
    IPricingStrategy <|.. WeekendStrategy
    PricingContext o-- IPricingStrategy : strategy
```

## Usage

```typescript
const pricing = new PricingContext(new HourlyStrategy());
pricing.executePricing(5); // 15000 (5 * 3000)

pricing.setStrategy(new WeekendStrategy());
pricing.executePricing(5); // 25000 (5 * 5000)
```
