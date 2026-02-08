import { ParkingLotSubject, DisplayBoardObserver, AdminDashboardObserver } from './observer';

describe('Observer Pattern - Test', () => {
  let subject: ParkingLotSubject;
  let displayObserver: DisplayBoardObserver;
  let adminObserver: AdminDashboardObserver;

  beforeEach(() => {
    subject = new ParkingLotSubject();
    displayObserver = new DisplayBoardObserver();
    adminObserver = new AdminDashboardObserver();
  });

  describe('ParkingLotSubject - Basic Functionality', () => {
    test('harus bisa attach observer', () => {
      expect(() => {
        subject.attach(displayObserver);
      }).not.toThrow();
    });

    test('harus bisa attach multiple observers', () => {
      subject.attach(displayObserver);
      subject.attach(adminObserver);

      // Tidak ada error berarti berhasil
      expect(displayObserver).toBeDefined();
      expect(adminObserver).toBeDefined();
    });

    test('harus bisa set spots', () => {
      expect(() => {
        subject.setSpots(50);
      }).not.toThrow();
    });
  });

  describe('DisplayBoardObserver - Notification', () => {
    test('harus receive update saat spots berubah', () => {
      subject.attach(displayObserver);
      subject.setSpots(75);

      expect(displayObserver.message).toBeDefined();
      expect(displayObserver.message).toContain('Display Update');
    });

    test('message harus include jumlah spots', () => {
      subject.attach(displayObserver);
      subject.setSpots(42);

      expect(displayObserver.message).toContain('42');
      expect(displayObserver.message).toContain('spots remaining');
    });

    test('harus update message setiap kali spots berubah', () => {
      subject.attach(displayObserver);

      subject.setSpots(100);
      expect(displayObserver.message).toContain('100');

      subject.setSpots(50);
      expect(displayObserver.message).toContain('50');

      subject.setSpots(25);
      expect(displayObserver.message).toContain('25');
    });
  });

  describe('AdminDashboardObserver - Notification', () => {
    test('harus receive update saat spots berubah', () => {
      subject.attach(adminObserver);
      subject.setSpots(20);

      expect(adminObserver.log).toBeDefined();
      expect(adminObserver.log).toContain('Admin Alert');
    });

    test('harus show NORMAL status kalau spots >= 10', () => {
      subject.attach(adminObserver);
      
      subject.setSpots(50);
      expect(adminObserver.log).toContain('NORMAL');

      subject.setSpots(10);
      expect(adminObserver.log).toContain('NORMAL');
    });

    test('harus show CRITICAL status kalau spots < 10', () => {
      subject.attach(adminObserver);
      
      subject.setSpots(9);
      expect(adminObserver.log).toContain('CRITICAL');

      subject.setSpots(5);
      expect(adminObserver.log).toContain('CRITICAL');

      subject.setSpots(1);
      expect(adminObserver.log).toContain('CRITICAL');
    });

    test('harus include jumlah spots di log', () => {
      subject.attach(adminObserver);
      
      subject.setSpots(15);
      expect(adminObserver.log).toContain('15');
    });
  });

  describe('Multiple Observers - Simultaneous Updates', () => {
    test('semua observers harus receive update bersamaan', () => {
      subject.attach(displayObserver);
      subject.attach(adminObserver);

      subject.setSpots(30);

      // Display updated
      expect(displayObserver.message).toContain('30');
      
      // Admin updated
      expect(adminObserver.log).toContain('30');
    });

    test('observers harus independent (tidak saling mempengaruhi)', () => {
      subject.attach(displayObserver);
      subject.attach(adminObserver);

      subject.setSpots(8);

      // Display message berbeda dengan admin log
      expect(displayObserver.message).toContain('Display Update');
      expect(adminObserver.log).toContain('Admin Alert');
      expect(adminObserver.log).toContain('CRITICAL');
    });

    test('harus bisa attach banyak observer dari tipe sama', () => {
      const display1 = new DisplayBoardObserver();
      const display2 = new DisplayBoardObserver();
      const display3 = new DisplayBoardObserver();

      subject.attach(display1);
      subject.attach(display2);
      subject.attach(display3);

      subject.setSpots(45);

      expect(display1.message).toContain('45');
      expect(display2.message).toContain('45');
      expect(display3.message).toContain('45');
    });
  });

  describe('Observer - Real-world Scenarios', () => {
    test('scenario: parkiran hampir penuh (critical)', () => {
      subject.attach(displayObserver);
      subject.attach(adminObserver);

      subject.setSpots(3);

      expect(displayObserver.message).toContain('3 spots remaining');
      expect(adminObserver.log).toContain('CRITICAL');
    });

    test('scenario: parkiran normal', () => {
      subject.attach(displayObserver);
      subject.attach(adminObserver);

      subject.setSpots(50);

      expect(displayObserver.message).toContain('50 spots remaining');
      expect(adminObserver.log).toContain('NORMAL');
    });

    test('scenario: monitoring real-time (spots berubah terus)', () => {
      subject.attach(displayObserver);
      subject.attach(adminObserver);

      // Mobil masuk satu-satu
      subject.setSpots(100);
      expect(displayObserver.message).toContain('100');

      subject.setSpots(95);
      expect(displayObserver.message).toContain('95');

      subject.setSpots(90);
      expect(displayObserver.message).toContain('90');

      // Last message harus yang terbaru
      expect(displayObserver.message).toContain('90');
    });

    test('scenario: transisi dari NORMAL ke CRITICAL', () => {
      subject.attach(adminObserver);

      subject.setSpots(15);
      expect(adminObserver.log).toContain('NORMAL');

      subject.setSpots(10);
      expect(adminObserver.log).toContain('NORMAL');

      subject.setSpots(9);
      expect(adminObserver.log).toContain('CRITICAL'); // Transition point
    });
  });

  describe('Observer - Edge Cases', () => {
    test('harus handle spots = 0 (penuh)', () => {
      subject.attach(displayObserver);
      subject.attach(adminObserver);

      subject.setSpots(0);

      expect(displayObserver.message).toContain('0 spots remaining');
      expect(adminObserver.log).toContain('CRITICAL');
    });

    test('harus handle spots sangat besar', () => {
      subject.attach(displayObserver);
      subject.attach(adminObserver);

      subject.setSpots(10000);

      expect(displayObserver.message).toContain('10000');
      expect(adminObserver.log).toContain('NORMAL');
    });

    test('observer tanpa di-attach tidak receive update', () => {
      const orphanObserver = new DisplayBoardObserver();
      
      // Tidak di-attach ke subject
      subject.setSpots(100);

      // Message masih kosong
      expect(orphanObserver.message).toBe('');
    });
  });

  describe('Observer - Decoupling', () => {
    test('subject tidak perlu tahu detail tentang observer', () => {
      // Subject hanya tahu interface IObserver
      // Tidak tahu apakah itu DisplayBoard atau AdminDashboard

      subject.attach(displayObserver);
      subject.attach(adminObserver);

      subject.setSpots(25);

      // Kedua observer updated meskipun subject tidak tahu detail mereka
      expect(displayObserver.message).toBeDefined();
      expect(adminObserver.log).toBeDefined();
    });

    test('bisa add observer baru tanpa ubah subject', () => {
      // Custom observer
      class EmailNotificationObserver {
        public email: string = '';
        update(count: number) {
          this.email = `Email sent: ${count} spots available`;
        }
      }

      const emailObserver = new EmailNotificationObserver();
      subject.attach(emailObserver as any);

      subject.setSpots(77);

      expect(emailObserver.email).toContain('77');
    });
  });
});
