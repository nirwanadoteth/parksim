import { PricingContext, HourlyStrategy, WeekendStrategy, IPricingStrategy } from './strategy';

describe('Strategy Pattern - Test', () => {
  describe('HourlyStrategy - Weekday Pricing', () => {
    let strategy: IPricingStrategy;

    beforeEach(() => {
      strategy = new HourlyStrategy();
    });

    test('harus calculate dengan rate 3000/jam', () => {
      expect(strategy.calculate(1)).toBe(3000);
      expect(strategy.calculate(2)).toBe(6000);
      expect(strategy.calculate(5)).toBe(15000);
    });

    test('harus handle 0 jam', () => {
      expect(strategy.calculate(0)).toBe(0);
    });

    test('harus handle parkir lama (24 jam)', () => {
      expect(strategy.calculate(24)).toBe(72000); // 24 * 3000
    });
  });

  describe('WeekendStrategy - Weekend Pricing', () => {
    let strategy: IPricingStrategy;

    beforeEach(() => {
      strategy = new WeekendStrategy();
    });

    test('harus calculate dengan rate 5000/jam', () => {
      expect(strategy.calculate(1)).toBe(5000);
      expect(strategy.calculate(2)).toBe(10000);
      expect(strategy.calculate(5)).toBe(25000);
    });

    test('harus handle 0 jam', () => {
      expect(strategy.calculate(0)).toBe(0);
    });

    test('harus handle parkir lama (24 jam)', () => {
      expect(strategy.calculate(24)).toBe(120000); // 24 * 5000
    });
  });

  describe('Strategy Comparison', () => {
    test('weekend harus lebih mahal dari hourly', () => {
      const hourly = new HourlyStrategy();
      const weekend = new WeekendStrategy();
      
      const hours = 5;
      const hourlyPrice = hourly.calculate(hours);
      const weekendPrice = weekend.calculate(hours);
      
      expect(weekendPrice).toBeGreaterThan(hourlyPrice);
      expect(weekendPrice).toBe(25000);
      expect(hourlyPrice).toBe(15000);
    });

    test('selisih harga harus konsisten untuk berbagai durasi', () => {
      const hourly = new HourlyStrategy();
      const weekend = new WeekendStrategy();
      
      // Selisih = 2000/jam (5000 - 3000)
      expect(weekend.calculate(1) - hourly.calculate(1)).toBe(2000);
      expect(weekend.calculate(5) - hourly.calculate(5)).toBe(10000);
      expect(weekend.calculate(10) - hourly.calculate(10)).toBe(20000);
    });
  });

  describe('PricingContext - Strategy Switching', () => {
    let context: PricingContext;

    beforeEach(() => {
      context = new PricingContext(new HourlyStrategy());
    });

    test('harus bisa execute pricing dengan initial strategy', () => {
      const price = context.executePricing(3);
      expect(price).toBe(9000); // 3 * 3000
    });

    test('harus bisa switch strategy saat runtime', () => {
      // Mulai dengan HourlyStrategy
      let price = context.executePricing(5);
      expect(price).toBe(15000);
      
      // Switch ke WeekendStrategy
      context.setStrategy(new WeekendStrategy());
      price = context.executePricing(5);
      expect(price).toBe(25000);
    });

    test('harus bisa switch strategy berkali-kali', () => {
      context.executePricing(1); // Hourly: 3000
      
      context.setStrategy(new WeekendStrategy());
      expect(context.executePricing(1)).toBe(5000);
      
      context.setStrategy(new HourlyStrategy());
      expect(context.executePricing(1)).toBe(3000);
      
      context.setStrategy(new WeekendStrategy());
      expect(context.executePricing(1)).toBe(5000);
    });
  });

  describe('PricingContext - Real-world Scenarios', () => {
    test('scenario: parkir weekday 2 jam', () => {
      const context = new PricingContext(new HourlyStrategy());
      const price = context.executePricing(2);
      
      expect(price).toBe(6000); // 2 * 3000
    });

    test('scenario: parkir weekend 3 jam', () => {
      const context = new PricingContext(new WeekendStrategy());
      const price = context.executePricing(3);
      
      expect(price).toBe(15000); // 3 * 5000
    });

    test('scenario: parkir dari weekday ke weekend (rate berubah)', () => {
      const context = new PricingContext(new HourlyStrategy());
      
      // Parkir 5 jam di weekday
      let price = context.executePricing(5);
      expect(price).toBe(15000);
      
      // Waktu berubah ke weekend, rate berubah
      context.setStrategy(new WeekendStrategy());
      price = context.executePricing(5);
      expect(price).toBe(25000);
    });

    test('scenario: parkir lama (overnight)', () => {
      const context = new PricingContext(new HourlyStrategy());
      
      // Parkir 12 jam
      const price = context.executePricing(12);
      expect(price).toBe(36000); // 12 * 3000
    });

    test('scenario: parkir sebentar (30 menit = 1 jam)', () => {
      const context = new PricingContext(new HourlyStrategy());
      
      // Sistem pakai hitungan jam (minimal 1 jam)
      const price = context.executePricing(1);
      expect(price).toBe(3000);
    });
  });

  describe('Strategy Pattern - Flexibility', () => {
    test('bisa start dengan strategy apa saja', () => {
      const context1 = new PricingContext(new HourlyStrategy());
      const context2 = new PricingContext(new WeekendStrategy());
      
      expect(context1.executePricing(1)).toBe(3000);
      expect(context2.executePricing(1)).toBe(5000);
    });

    test('context tidak terikat pada strategy tertentu', () => {
      const context = new PricingContext(new HourlyStrategy());
      
      // Bisa ganti-ganti strategy kapan saja
      expect(context.executePricing(2)).toBe(6000);
      
      context.setStrategy(new WeekendStrategy());
      expect(context.executePricing(2)).toBe(10000);
      
      context.setStrategy(new HourlyStrategy());
      expect(context.executePricing(2)).toBe(6000);
    });
  });

  describe('Strategy Pattern - Edge Cases', () => {
    test('harus handle 0 jam di semua strategy', () => {
      const hourly = new PricingContext(new HourlyStrategy());
      const weekend = new PricingContext(new WeekendStrategy());
      
      expect(hourly.executePricing(0)).toBe(0);
      expect(weekend.executePricing(0)).toBe(0);
    });

    test('harus handle parkir sangat lama', () => {
      const context = new PricingContext(new HourlyStrategy());
      
      // Parkir seminggu (168 jam)
      const price = context.executePricing(168);
      expect(price).toBe(504000); // 168 * 3000
    });

    test('harus handle angka jam desimal (dibulatkan atau tidak)', () => {
      const context = new PricingContext(new HourlyStrategy());
      
      // Misalnya 2.5 jam
      // Tergantung implementasi: bisa 2.5 * 3000 = 7500
      // Atau dibulatkan ke atas jadi 3 jam
      const price = context.executePricing(2.5);
      expect(price).toBe(7500); // Asumsi: support desimal
    });
  });

  describe('Strategy Pattern - Extensibility', () => {
    test('bisa add strategy baru tanpa ubah context', () => {
      // Custom strategy: Member discount (2000/jam)
      class MemberStrategy implements IPricingStrategy {
        calculate(hours: number): number {
          return hours * 2000;
        }
      }

      const context = new PricingContext(new MemberStrategy());
      const price = context.executePricing(5);
      
      expect(price).toBe(10000); // 5 * 2000
    });

    test('bisa add strategy kompleks tanpa ubah existing code', () => {
      // Custom strategy: Progressive pricing (makin lama makin murah)
      class ProgressiveStrategy implements IPricingStrategy {
        calculate(hours: number): number {
          if (hours <= 2) return hours * 5000;
          if (hours <= 5) return 10000 + (hours - 2) * 4000;
          return 22000 + (hours - 5) * 3000;
        }
      }

      const context = new PricingContext(new ProgressiveStrategy());
      
      expect(context.executePricing(1)).toBe(5000);
      expect(context.executePricing(2)).toBe(10000);
      expect(context.executePricing(3)).toBe(14000);
      expect(context.executePricing(5)).toBe(22000);
      expect(context.executePricing(6)).toBe(25000);
    });
  });
});
