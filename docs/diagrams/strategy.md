# Strategy Pattern

Strategy pattern mendefinisikan keluarga algoritma, mengenkapsulasi masing-masing, dan membuatnya dapat dipertukarkan. Strategy memungkinkan algoritma bervariasi secara independen dari klien yang menggunakannya.

## Diagram Kelas

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

## Penggunaan

```typescript
const pricing = new PricingContext(new HourlyStrategy());
pricing.executePricing(5); // 15000 (5 * 3000)

pricing.setStrategy(new WeekendStrategy());
pricing.executePricing(5); // 25000 (5 * 5000)
```
