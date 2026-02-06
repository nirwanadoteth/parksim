// lib/patterns/structural/decorator.ts

export interface IParkingService {
  getCost(): number;
  getDescription(): string;
}

export class BasicParking implements IParkingService {
  getCost = () => 5000; // Base cost
  getDescription = () => "Basic Parking";
}

// Base Decorator
abstract class ServiceDecorator implements IParkingService {
  constructor(protected service: IParkingService) {}
  abstract getCost(): number;
  abstract getDescription(): string;
}

// Concrete Decorator 1
export class CarWashDecorator extends ServiceDecorator {
  getCost() {
    return this.service.getCost() + 35000;
  }
  getDescription() {
    return `${this.service.getDescription()} + Car Wash`;
  }
}

// Concrete Decorator 2
export class ValetDecorator extends ServiceDecorator {
  getCost() {
    return this.service.getCost() + 20000;
  }
  getDescription() {
    return `${this.service.getDescription()} + Valet Service`;
  }
}
