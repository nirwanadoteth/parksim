import { ParkingLevel } from './prototype';

describe('Prototype Pattern - Test', () => {
  describe('ParkingLevel - Clone Functionality', () => {
    test('harus bisa clone ParkingLevel', () => {
      const original = new ParkingLevel('Level A', 3);
      const cloned = original.clone();

      expect(cloned).toBeDefined();
      expect(cloned).toBeInstanceOf(ParkingLevel);
    });

    test('cloned object harus punya data yang mirip dengan original', () => {
      const original = new ParkingLevel('Level B', 5);
      const cloned = original.clone();

      // Clone menambahkan prefix "Copy of"
      expect(cloned.levelName).toContain('Copy of');
      expect(cloned.levelName).toContain('Level B');
      expect(cloned.spots.length).toBe(original.spots.length);
    });

    test('cloned object harus independent dari original (deep copy)', () => {
      const original = new ParkingLevel('Level C', 4);
      const cloned = original.clone();

      // Ubah cloned, original tidak berubah
      cloned.levelName = 'Level D';
      cloned.spots = [];

      expect(original.levelName).toBe('Level C');
      expect(original.spots.length).toBe(4);
      expect(cloned.levelName).toBe('Level D');
      expect(cloned.spots.length).toBe(0);
    });

    test('harus bisa clone berkali-kali', () => {
      const original = new ParkingLevel('Ground Floor', 2);
      const clone1 = original.clone();
      const clone2 = original.clone();
      const clone3 = clone1.clone();

      expect(clone1.levelName).toContain('Copy of Ground Floor');
      expect(clone2.levelName).toContain('Copy of Ground Floor');
      expect(clone3.levelName).toContain('Copy of Copy of Ground Floor');

      // Semuanya independent
      clone1.levelName = 'Clone 1';
      clone2.levelName = 'Clone 2';
      clone3.levelName = 'Clone 3';

      expect(original.levelName).toBe('Ground Floor');
      expect(clone1.levelName).toBe('Clone 1');
      expect(clone2.levelName).toBe('Clone 2');
      expect(clone3.levelName).toBe('Clone 3');
    });
  });

  describe('ParkingLevel - Spots Array', () => {
    test('harus generate spots array saat create', () => {
      const level = new ParkingLevel('Level A', 5);
      
      expect(level.spots).toBeInstanceOf(Array);
      expect(level.spots.length).toBe(5);
    });

    test('spots harus punya format "Spot-{number}"', () => {
      const level = new ParkingLevel('Level B', 3);
      
      expect(level.spots[0]).toBe('Spot-1');
      expect(level.spots[1]).toBe('Spot-2');
      expect(level.spots[2]).toBe('Spot-3');
    });

    test('clone harus copy spots array', () => {
      const original = new ParkingLevel('Level C', 4);
      const cloned = original.clone();
      
      expect(cloned.spots.length).toBe(4);
      expect(cloned.spots[0]).toBe('Spot-1');
      expect(cloned.spots[3]).toBe('Spot-4');
    });
  });

  describe('ParkingLevel - Use Cases', () => {
    test('use case: buat konfigurasi level baru dari template', () => {
      // Template untuk level standard
      const standardTemplate = new ParkingLevel('Standard Level', 100);

      // Buat beberapa level dari template
      const levelA = standardTemplate.clone();
      levelA.levelName = 'Level A';

      const levelB = standardTemplate.clone();
      levelB.levelName = 'Level B';

      const levelC = standardTemplate.clone();
      levelC.levelName = 'Level C';

      // Semua punya 100 spots (dari template)
      expect(levelA.spots.length).toBe(100);
      expect(levelB.spots.length).toBe(100);
      expect(levelC.spots.length).toBe(100);

      // Nama berbeda
      expect(levelA.levelName).toBe('Level A');
      expect(levelB.levelName).toBe('Level B');
      expect(levelC.levelName).toBe('Level C');
    });

    test('use case: buat VIP level dengan spots lebih sedikit', () => {
      const vipTemplate = new ParkingLevel('VIP Zone', 20);

      const vipZone1 = vipTemplate.clone();
      vipZone1.levelName = 'VIP Zone 1';

      const vipZone2 = vipTemplate.clone();
      vipZone2.levelName = 'VIP Zone 2';

      expect(vipZone1.spots.length).toBe(20);
      expect(vipZone2.spots.length).toBe(20);
    });

    test('use case: modifikasi clone untuk kebutuhan spesifik', () => {
      const baseLevel = new ParkingLevel('Base', 50);
      
      const smallLevel = baseLevel.clone();
      smallLevel.levelName = 'Small Area';
      // Note: Tidak bisa ubah jumlah spots setelah clone di implementasi ini
      // Tapi bisa ubah isi array
      smallLevel.spots = smallLevel.spots.slice(0, 25);

      expect(baseLevel.spots.length).toBe(50);
      expect(smallLevel.spots.length).toBe(25);
      expect(smallLevel.levelName).toBe('Small Area');
    });
  });

  describe('ParkingLevel - Edge Cases', () => {
    test('harus bisa clone level dengan 0 spots', () => {
      const original = new ParkingLevel('Under Construction', 0);
      const cloned = original.clone();

      expect(cloned.spots.length).toBe(0);
      expect(cloned.levelName).toContain('Copy of Under Construction');
    });

    test('harus bisa clone level dengan nama panjang', () => {
      const longName = 'Level Basement 3 - Reserved for Premium Members Only';
      const original = new ParkingLevel(longName, 10);
      const cloned = original.clone();

      expect(cloned.levelName).toContain(longName);
      expect(cloned.spots.length).toBe(10);
    });

    test('harus bisa clone level dengan spots sangat besar', () => {
      const original = new ParkingLevel('Mega Parking', 1000);
      const cloned = original.clone();

      expect(cloned.spots.length).toBe(1000);
    });
  });

  describe('ParkingLevel - setDetails Method', () => {
    test('harus bisa update nama level dengan setDetails', () => {
      const level = new ParkingLevel('Old Name', 5);
      level.setDetails('New Name');
      
      expect(level.levelName).toBe('New Name');
    });

    test('setDetails harus work setelah clone', () => {
      const original = new ParkingLevel('Original', 3);
      const cloned = original.clone();
      
      cloned.setDetails('Modified Clone');
      
      expect(original.levelName).toBe('Original');
      expect(cloned.levelName).toBe('Modified Clone');
    });
  });

  describe('Prototype Pattern - Clone Independence', () => {
    test('modify spots di clone tidak affect original', () => {
      const original = new ParkingLevel('Level 1', 5);
      const cloned = original.clone();
      
      // Modify clone
      cloned.spots.push('Extra-Spot');
      
      // Original tidak berubah
      expect(original.spots.length).toBe(5);
      expect(cloned.spots.length).toBe(6);
    });

    test('modify spots content di clone tidak affect original', () => {
      const original = new ParkingLevel('Level 2', 3);
      const cloned = original.clone();
      
      // Modify clone content
      cloned.spots[0] = 'Modified-Spot';
      
      // Original tidak berubah
      expect(original.spots[0]).toBe('Spot-1');
      expect(cloned.spots[0]).toBe('Modified-Spot');
    });
  });
});
