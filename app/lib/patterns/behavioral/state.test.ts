import { ParkingSpotContext } from './state';

describe('State Pattern - Test', () => {
  let parkingSpot: ParkingSpotContext;

  beforeEach(() => {
    parkingSpot = new ParkingSpotContext();
  });

  describe('ParkingSpotContext - Initial State', () => {
    test('harus dimulai dengan state Available', () => {
      // Parkir pertama kali harus berhasil
      const result = parkingSpot.requestPark();
      expect(result).toContain('Park successful');
      expect(result).toContain('Occupied');
    });

    test('leave di state Available harus gagal', () => {
      const result = parkingSpot.requestLeave();
      expect(result).toContain('already empty');
    });
  });

  describe('State Transitions - Available to Occupied', () => {
    test('park di Available harus berhasil dan pindah ke Occupied', () => {
      const result = parkingSpot.requestPark();
      
      expect(result).toContain('Park successful');
      
      // Sekarang di state Occupied, park lagi harus gagal
      const result2 = parkingSpot.requestPark();
      expect(result2).toContain('full');
    });

    test('setelah park, leave harus berhasil', () => {
      parkingSpot.requestPark(); // Pindah ke Occupied
      
      const leaveResult = parkingSpot.requestLeave();
      expect(leaveResult).toContain('Vehicle left');
    });
  });

  describe('State Transitions - Occupied to Available', () => {
    test('leave di Occupied harus berhasil dan pindah ke Available', () => {
      parkingSpot.requestPark(); // Available -> Occupied
      const leaveResult = parkingSpot.requestLeave(); // Occupied -> Available
      
      expect(leaveResult).toContain('Vehicle left');
      
      // Sekarang Available lagi, bisa park
      const parkResult = parkingSpot.requestPark();
      expect(parkResult).toContain('Park successful');
    });
  });

  describe('State Behavior - Available State', () => {
    test('park di Available harus return success message', () => {
      const result = parkingSpot.requestPark();
      
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
      expect(result.toLowerCase()).toContain('success');
    });

    test('leave di Available harus return error message', () => {
      const result = parkingSpot.requestLeave();
      
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
      expect(result).toContain('empty');
    });
  });

  describe('State Behavior - Occupied State', () => {
    beforeEach(() => {
      parkingSpot.requestPark(); // Pindah ke Occupied
    });

    test('park di Occupied harus return error message', () => {
      const result = parkingSpot.requestPark();
      
      expect(result).toContain('full');
    });

    test('leave di Occupied harus return success message', () => {
      const result = parkingSpot.requestLeave();
      
      expect(result).toContain('Vehicle left');
    });
  });

  describe('State Pattern - Multiple Cycles', () => {
    test('harus bisa park -> leave -> park -> leave berkali-kali', () => {
      // Cycle 1
      let result = parkingSpot.requestPark();
      expect(result).toContain('Park successful');
      
      result = parkingSpot.requestLeave();
      expect(result).toContain('Vehicle left');
      
      // Cycle 2
      result = parkingSpot.requestPark();
      expect(result).toContain('Park successful');
      
      result = parkingSpot.requestLeave();
      expect(result).toContain('Vehicle left');
      
      // Cycle 3
      result = parkingSpot.requestPark();
      expect(result).toContain('Park successful');
      
      result = parkingSpot.requestLeave();
      expect(result).toContain('Vehicle left');
    });
  });

  describe('State Pattern - Real-world Scenarios', () => {
    test('scenario: mobil parkir di pagi hari, keluar sore hari', () => {
      // Pagi: parkir
      const parkResult = parkingSpot.requestPark();
      expect(parkResult).toContain('Park successful');
      
      // Sore: keluar
      const leaveResult = parkingSpot.requestLeave();
      expect(leaveResult).toContain('Vehicle left');
    });

    test('scenario: spot kosong, ada yang coba keluar (salah)', () => {
      // Spot kosong tapi ada yang coba ambil tiket keluar
      const result = parkingSpot.requestLeave();
      expect(result).toContain('empty');
    });

    test('scenario: spot penuh, ada yang coba parkir (salah)', () => {
      // Parkir pertama (berhasil)
      parkingSpot.requestPark();
      
      // Parkir lagi (gagal, udah penuh)
      const result = parkingSpot.requestPark();
      expect(result).toContain('full');
    });

    test('scenario: high turnover (banyak mobil masuk keluar)', () => {
      for (let i = 0; i < 10; i++) {
        // Parkir
        const parkResult = parkingSpot.requestPark();
        expect(parkResult).toContain('Park successful');
        
        // Keluar
        const leaveResult = parkingSpot.requestLeave();
        expect(leaveResult).toContain('Vehicle left');
      }
    });
  });

  describe('State Pattern - Error Handling', () => {
    test('double park harus ditolak', () => {
      parkingSpot.requestPark(); // First park: OK
      const result = parkingSpot.requestPark(); // Second park: FAIL
      
      expect(result).toContain('full');
    });

    test('double leave harus ditolak', () => {
      parkingSpot.requestPark(); // Park dulu
      parkingSpot.requestLeave(); // First leave: OK
      
      const result = parkingSpot.requestLeave(); // Second leave: FAIL
      expect(result).toContain('empty');
    });

    test('leave tanpa park harus ditolak', () => {
      const result = parkingSpot.requestLeave();
      expect(result).toContain('empty');
    });
  });

  describe('State Pattern - Benefits', () => {
    test('behavior berubah otomatis sesuai state', () => {
      // Di Available: park berhasil, leave gagal
      let parkResult = parkingSpot.requestPark();
      expect(parkResult).toContain('Park successful');
      
      // Di Occupied: park gagal, leave berhasil
      parkResult = parkingSpot.requestPark();
      expect(parkResult).toContain('full');
      
      const leaveResult = parkingSpot.requestLeave();
      expect(leaveResult).toContain('Vehicle left');
    });

    test('state transition handled secara internal', () => {
      // Client tidak perlu tahu tentang state transition
      // Cukup call method, state berubah otomatis
      
      parkingSpot.requestPark(); // Internal: Available -> Occupied
      parkingSpot.requestLeave(); // Internal: Occupied -> Available
      parkingSpot.requestPark(); // Internal: Available -> Occupied
      
      // Semua berhasil karena state managed dengan baik
      const result = parkingSpot.requestLeave();
      expect(result).toContain('Vehicle left');
    });
  });

  describe('State Pattern - Independent Instances', () => {
    test('multiple parking spots harus independent', () => {
      const spot1 = new ParkingSpotContext();
      const spot2 = new ParkingSpotContext();
      
      // Spot 1: Occupied
      spot1.requestPark();
      
      // Spot 2: masih Available
      const result = spot2.requestPark();
      expect(result).toContain('Park successful');
    });

    test('state change di satu spot tidak mempengaruhi spot lain', () => {
      const spot1 = new ParkingSpotContext();
      const spot2 = new ParkingSpotContext();
      
      spot1.requestPark(); // Spot 1: Occupied
      spot2.requestPark(); // Spot 2: Occupied
      
      spot1.requestLeave(); // Spot 1: Available
      
      // Spot 2 masih Occupied
      const result = spot2.requestPark();
      expect(result).toContain('full');
    });
  });
});
