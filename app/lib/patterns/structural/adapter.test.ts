import { StripeAdapter } from './adapter';

describe('Adapter Pattern - Test', () => {
  let adapter: StripeAdapter;

  beforeEach(() => {
    adapter = new StripeAdapter();
  });

  describe('StripeAdapter - Basic Payment', () => {
    test('harus bisa process payment', () => {
      const result = adapter.pay(50000);
      
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });

    test('harus return message dari Stripe', () => {
      const result = adapter.pay(100000);
      
      expect(result).toContain('Stripe');
      expect(result).toContain('charged');
    });

    test('harus convert amount ke format Stripe (x100)', () => {
      const result = adapter.pay(50000);
      
      // 50000 * 100 = 5000000
      expect(result).toContain('5000000');
      expect(result).toContain('IDR');
    });
  });

  describe('StripeAdapter - Different Amounts', () => {
    test('payment 10000 IDR', () => {
      const result = adapter.pay(10000);
      
      // 10000 * 100 = 1000000
      expect(result).toContain('1000000');
      expect(result).toContain('IDR');
    });

    test('payment 100000 IDR', () => {
      const result = adapter.pay(100000);
      
      // 100000 * 100 = 10000000
      expect(result).toContain('10000000');
      expect(result).toContain('IDR');
    });

    test('payment 250000 IDR', () => {
      const result = adapter.pay(250000);
      
      // 250000 * 100 = 25000000
      expect(result).toContain('25000000');
      expect(result).toContain('IDR');
    });

    test('payment 1000000 IDR (1 juta)', () => {
      const result = adapter.pay(1000000);
      
      // 1000000 * 100 = 100000000
      expect(result).toContain('100000000');
      expect(result).toContain('IDR');
    });
  });

  describe('StripeAdapter - Edge Cases', () => {
    test('payment dengan amount minimal', () => {
      const result = adapter.pay(1000);
      
      expect(result).toBeDefined();
      expect(result).toContain('Stripe');
      expect(result).toContain('100000'); // 1000 * 100
    });

    test('payment dengan amount besar', () => {
      const result = adapter.pay(10000000);
      
      expect(result).toBeDefined();
      expect(result).toContain('Stripe');
      expect(result).toContain('1000000000'); // 10000000 * 100
    });

    test('harus handle angka tidak bulat dengan benar', () => {
      // Misalnya hasil perhitungan tarif parkir
      const result = adapter.pay(47500);
      
      expect(result).toBeDefined();
      expect(result).toContain('Stripe');
      expect(result).toContain('4750000'); // 47500 * 100
    });
  });

  describe('StripeAdapter - Interface Adaptation', () => {
    test('harus implement IPaymentProcessor interface', () => {
      // Check if pay method exists
      expect(typeof adapter.pay).toBe('function');
    });

    test('pay method harus accept number dan return string', () => {
      const result = adapter.pay(50000);
      
      expect(typeof result).toBe('string');
    });

    test('adapter harus menyembunyikan detail Stripe dari client', () => {
      const result = adapter.pay(50000);
      
      // Client hanya perlu call pay() dengan amount IDR
      // Adapter yang handle konversi ke format Stripe
      expect(result).toBeDefined();
      expect(result).toContain('Stripe');
    });
  });

  describe('StripeAdapter - Real-world Scenarios', () => {
    test('scenario: bayar parkir 2 jam', () => {
      const parkingFee = 2 * 3000; // 6000 IDR
      const result = adapter.pay(parkingFee);
      
      expect(result).toContain('Stripe');
      expect(result).toContain('600000'); // 6000 * 100
    });

    test('scenario: bayar parkir + car wash', () => {
      const parkingFee = 10000;
      const carWashFee = 25000;
      const total = parkingFee + carWashFee; // 35000
      
      const result = adapter.pay(total);
      
      expect(result).toContain('Stripe');
      expect(result).toContain('3500000'); // 35000 * 100
    });

    test('scenario: bayar parkir VIP weekend 5 jam', () => {
      const hours = 5;
      const weekendRate = 5000;
      const total = hours * weekendRate; // 25000 IDR
      
      const result = adapter.pay(total);
      
      expect(result).toContain('Stripe');
      expect(result).toContain('2500000'); // 25000 * 100
    });
  });
});
