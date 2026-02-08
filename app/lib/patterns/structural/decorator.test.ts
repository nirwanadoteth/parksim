import { BasicParking, CarWashDecorator, ValetDecorator, IParkingService } from './decorator';

describe('Decorator Pattern - Test', () => {
  describe('BasicParking - Base Service', () => {
    let basicService: IParkingService;

    beforeEach(() => {
      basicService = new BasicParking();
    });

    test('harus punya description "Basic Parking"', () => {
      expect(basicService.getDescription()).toBe('Basic Parking');
    });

    test('harus punya cost 5000', () => {
      expect(basicService.getCost()).toBe(5000);
    });
  });

  describe('CarWashDecorator - Single Decorator', () => {
    test('harus nambah "Car Wash" ke description', () => {
      const basic = new BasicParking();
      const withCarWash = new CarWashDecorator(basic);

      expect(withCarWash.getDescription()).toContain('Basic Parking');
      expect(withCarWash.getDescription()).toContain('Car Wash');
    });

    test('harus nambah 35000 ke cost', () => {
      const basic = new BasicParking();
      const withCarWash = new CarWashDecorator(basic);

      // Basic (5000) + Car Wash (35000) = 40000
      expect(withCarWash.getCost()).toBe(40000);
    });
  });

  describe('ValetDecorator - Single Decorator', () => {
    test('harus nambah "Valet Service" ke description', () => {
      const basic = new BasicParking();
      const withValet = new ValetDecorator(basic);

      expect(withValet.getDescription()).toContain('Basic Parking');
      expect(withValet.getDescription()).toContain('Valet Service');
    });

    test('harus nambah 20000 ke cost', () => {
      const basic = new BasicParking();
      const withValet = new ValetDecorator(basic);

      // Basic (5000) + Valet (20000) = 25000
      expect(withValet.getCost()).toBe(25000);
    });
  });

  describe('Multiple Decorators - Stacking', () => {
    test('harus bisa stack Car Wash + Valet', () => {
      const basic = new BasicParking();
      const withCarWash = new CarWashDecorator(basic);
      const withBoth = new ValetDecorator(withCarWash);

      expect(withBoth.getDescription()).toContain('Basic Parking');
      expect(withBoth.getDescription()).toContain('Car Wash');
      expect(withBoth.getDescription()).toContain('Valet Service');

      // Basic (5000) + Car Wash (35000) + Valet (20000) = 60000
      expect(withBoth.getCost()).toBe(60000);
    });

    test('harus bisa stack Valet + Car Wash (order berbeda)', () => {
      const basic = new BasicParking();
      const withValet = new ValetDecorator(basic);
      const withBoth = new CarWashDecorator(withValet);

      // Order tidak mempengaruhi total cost
      expect(withBoth.getCost()).toBe(60000);
      expect(withBoth.getDescription()).toContain('Basic Parking');
      expect(withBoth.getDescription()).toContain('Car Wash');
      expect(withBoth.getDescription()).toContain('Valet Service');
    });

    test('harus bisa double Car Wash (edge case)', () => {
      const basic = new BasicParking();
      const withCarWash1 = new CarWashDecorator(basic);
      const withCarWash2 = new CarWashDecorator(withCarWash1);

      // Basic (5000) + Car Wash (35000) + Car Wash (35000) = 75000
      expect(withCarWash2.getCost()).toBe(75000);
    });

    test('harus bisa triple decorators', () => {
      const basic = new BasicParking();
      const withValet = new ValetDecorator(basic);
      const withCarWash = new CarWashDecorator(withValet);
      const withMoreValet = new ValetDecorator(withCarWash);

      // Basic (5000) + Valet (20000) + CarWash (35000) + Valet (20000) = 80000
      expect(withMoreValet.getCost()).toBe(80000);
    });
  });

  describe('Decorator - Real-world Scenarios', () => {
    test('scenario: customer mau parkir aja (no extras)', () => {
      const service = new BasicParking();

      expect(service.getDescription()).toBe('Basic Parking');
      expect(service.getCost()).toBe(5000);
    });

    test('scenario: customer mau parkir + cuci mobil', () => {
      const service = new CarWashDecorator(new BasicParking());

      expect(service.getDescription()).toContain('Car Wash');
      expect(service.getCost()).toBe(40000);
    });

    test('scenario: customer VIP mau full service', () => {
      const fullService = new ValetDecorator(
        new CarWashDecorator(
          new BasicParking()
        )
      );

      expect(fullService.getDescription()).toContain('Basic Parking');
      expect(fullService.getDescription()).toContain('Car Wash');
      expect(fullService.getDescription()).toContain('Valet Service');
      expect(fullService.getCost()).toBe(60000);
    });

    test('scenario: customer buru-buru, mau valet aja', () => {
      const service = new ValetDecorator(new BasicParking());

      expect(service.getDescription()).toContain('Valet Service');
      expect(service.getCost()).toBe(25000);
    });
  });

  describe('Decorator - Dynamic Behavior', () => {
    test('decorator tidak mengubah object original', () => {
      const basic = new BasicParking();
      const decorated = new CarWashDecorator(basic);

      // Original tetap sama
      expect(basic.getCost()).toBe(5000);
      expect(basic.getDescription()).toBe('Basic Parking');

      // Decorated punya tambahan
      expect(decorated.getCost()).toBe(40000);
      expect(decorated.getDescription()).toContain('Car Wash');
    });

    test('bisa buat berbagai kombinasi dari base yang sama', () => {
      const basic = new BasicParking();

      const option1 = new CarWashDecorator(basic);
      const option2 = new ValetDecorator(basic);
      const option3 = new ValetDecorator(new CarWashDecorator(basic));

      // Base tetap 5000
      expect(basic.getCost()).toBe(5000);

      // Berbagai option
      expect(option1.getCost()).toBe(40000); // 5000 + 35000
      expect(option2.getCost()).toBe(25000); // 5000 + 20000
      expect(option3.getCost()).toBe(60000); // 5000 + 35000 + 20000
    });
  });

  describe('Decorator - Cost Calculation', () => {
    test('cost harus akumulasi dari semua decorators', () => {
      const basic = new BasicParking();
      expect(basic.getCost()).toBe(5000);

      const step1 = new CarWashDecorator(basic);
      expect(step1.getCost()).toBe(40000); // +35000

      const step2 = new ValetDecorator(step1);
      expect(step2.getCost()).toBe(60000); // +20000
    });

    test('order decorator tidak mempengaruhi total cost', () => {
      const option1 = new ValetDecorator(
        new CarWashDecorator(new BasicParking())
      );

      const option2 = new CarWashDecorator(
        new ValetDecorator(new BasicParking())
      );

      expect(option1.getCost()).toBe(option2.getCost());
      expect(option1.getCost()).toBe(60000);
    });
  });

  describe('Decorator - Description Formatting', () => {
    test('description harus readable dengan separator " + "', () => {
      const service = new CarWashDecorator(new BasicParking());
      
      expect(service.getDescription()).toBe('Basic Parking + Car Wash');
    });

    test('multiple decorators harus chain description dengan benar', () => {
      const service = new ValetDecorator(
        new CarWashDecorator(new BasicParking())
      );
      
      expect(service.getDescription()).toBe('Basic Parking + Car Wash + Valet Service');
    });
  });

  describe('Decorator - Extensibility', () => {
    test('bisa add decorator baru tanpa ubah existing code', () => {
      // Custom decorator: Insurance
      class InsuranceDecorator extends class {
        constructor(protected service: IParkingService) {}
        getCost() { return 0; }
        getDescription() { return ''; }
      } {
        getCost() {
          return this.service.getCost() + 15000;
        }
        getDescription() {
          return `${this.service.getDescription()} + Insurance`;
        }
      }

      const service = new InsuranceDecorator(new BasicParking());
      
      expect(service.getCost()).toBe(20000); // 5000 + 15000
      expect(service.getDescription()).toContain('Insurance');
    });
  });
});
