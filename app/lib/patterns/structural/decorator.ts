export interface IParkingService {
  getCost(): number;
  getDescription(): string;
}

export class BasicParking implements IParkingService {
  getCost = () => 5000;
  getDescription = () => "Basic Parking";
}

abstract class ServiceDecorator implements IParkingService {
  constructor(protected service: IParkingService) {}
  abstract getCost(): number;
  abstract getDescription(): string;
}

export class CarWashDecorator extends ServiceDecorator {
  getCost() {
    return this.service.getCost() + 35000;
  }
  getDescription() {
    return `${this.service.getDescription()} + Car Wash`;
  }
}

export class ValetDecorator extends ServiceDecorator {
  getCost() {
    return this.service.getCost() + 20000;
  }
  getDescription() {
    return `${this.service.getDescription()} + Valet Service`;
  }
}
