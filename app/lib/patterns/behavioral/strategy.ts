export interface IPricingStrategy {
  calculate(hours: number): number;
}

export class HourlyStrategy implements IPricingStrategy {
  calculate(hours: number): number {
    return hours * 3000;
  }
}

export class WeekendStrategy implements IPricingStrategy {
  calculate(hours: number): number {
    return hours * 5000;
  }
}

export class PricingContext {
  constructor(private strategy: IPricingStrategy) {}

  setStrategy(strategy: IPricingStrategy) {
    this.strategy = strategy;
  }

  executePricing(hours: number): number {
    return this.strategy.calculate(hours);
  }
}
