import { StandardHardwareFactory, VIPHardwareFactory, IParkingHardwareFactory } from './abstract-factory';

describe('Abstract Factory Pattern - Test', () => {
  describe('StandardHardwareFactory', () => {
    let factory: IParkingHardwareFactory;

    beforeEach(() => {
      factory = new StandardHardwareFactory();
    });

    test('harus bisa create StandardGate', () => {
      const gate = factory.createGate();
      expect(gate).toBeDefined();
      expect(gate.open()).toContain('standard');
      expect(gate.close()).toContain('standard');
    });

    test('harus bisa create StandardDisplay', () => {
      const display = factory.createDisplay();
      expect(display).toBeDefined();
      expect(display.showMessage('Test')).toContain('[LCD Panel]');
      expect(display.showMessage('Test')).toContain('Test');
    });

    test('gate open harus return message dengan delay 5s', () => {
      const gate = factory.createGate();
      expect(gate.open()).toContain('delay 5s');
    });

    test('gate close harus return message dengan delay 5s', () => {
      const gate = factory.createGate();
      expect(gate.close()).toContain('delay 5s');
    });
  });

  describe('VIPHardwareFactory', () => {
    let factory: IParkingHardwareFactory;

    beforeEach(() => {
      factory = new VIPHardwareFactory();
    });

    test('harus bisa create VIPGate', () => {
      const gate = factory.createGate();
      expect(gate).toBeDefined();
      expect(gate.open()).toContain('VIP');
      expect(gate.close()).toContain('VIP');
    });

    test('harus bisa create VIPDisplay', () => {
      const display = factory.createDisplay();
      expect(display).toBeDefined();
      expect(display.showMessage('VIP User')).toContain('[OLED Display]');
      expect(display.showMessage('VIP User')).toContain('VIP User');
    });

    test('gate open harus return message dengan delay 2s (lebih cepat)', () => {
      const gate = factory.createGate();
      expect(gate.open()).toContain('delay 2s');
    });

    test('gate close harus return message dengan delay 2s (lebih cepat)', () => {
      const gate = factory.createGate();
      expect(gate.close()).toContain('delay 2s');
    });
  });

  describe('Factory Comparison', () => {
    test('Standard dan VIP factory harus produce hardware yang berbeda', () => {
      const standardFactory = new StandardHardwareFactory();
      const vipFactory = new VIPHardwareFactory();

      const standardGate = standardFactory.createGate();
      const vipGate = vipFactory.createGate();

      // Output harus beda
      expect(standardGate.open()).not.toBe(vipGate.open());
      
      // Standard lebih lambat dari VIP
      expect(standardGate.open()).toContain('5s');
      expect(vipGate.open()).toContain('2s');
    });

    test('Display dari kedua factory harus punya format berbeda', () => {
      const standardFactory = new StandardHardwareFactory();
      const vipFactory = new VIPHardwareFactory();

      const standardDisplay = standardFactory.createDisplay();
      const vipDisplay = vipFactory.createDisplay();

      expect(standardDisplay.showMessage('Hello')).toContain('LCD Panel');
      expect(vipDisplay.showMessage('Hello')).toContain('OLED Display');
    });
  });
});
