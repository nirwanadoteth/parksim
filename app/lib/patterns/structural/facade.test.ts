import { SmartParkingFacade } from './facade';

describe('Facade Pattern - Test', () => {
  let facade: SmartParkingFacade;

  beforeEach(() => {
    facade = new SmartParkingFacade();
  });

  describe('SmartParkingFacade - Basic Entry Process', () => {
    test('harus bisa handle vehicle entry', () => {
      const result = facade.handleVehicleEntry('B 1234 CD');

      expect(result).toBeDefined();
      expect(result.ticket).toBeDefined();
      expect(result.processLogs).toBeDefined();
    });

    test('harus return ticket dengan vehicle number yang benar', () => {
      const plateNumber = 'B 5678 EF';
      const result = facade.handleVehicleEntry(plateNumber);

      expect(result.ticket.vehicleNumber).toBe(plateNumber);
    });

    test('harus generate ticket ID', () => {
      const result = facade.handleVehicleEntry('D 9999 XY');

      expect(result.ticket.id).toBeDefined();
      expect(result.ticket.id).toContain('TICKET-');
    });

    test('harus set entry time', () => {
      const beforeEntry = new Date();
      const result = facade.handleVehicleEntry('B 1111 AA');
      const afterEntry = new Date();

      expect(result.ticket.entryTime).toBeDefined();
      expect(result.ticket.entryTime.getTime()).toBeGreaterThanOrEqual(beforeEntry.getTime() - 1000);
      expect(result.ticket.entryTime.getTime()).toBeLessThanOrEqual(afterEntry.getTime() + 1000);
    });
  });

  describe('SmartParkingFacade - Process Logs', () => {
    test('harus punya logs array', () => {
      const result = facade.handleVehicleEntry('B 2222 BB');

      expect(Array.isArray(result.processLogs)).toBe(true);
      expect(result.processLogs.length).toBeGreaterThan(0);
    });

    test('harus log ticket creation', () => {
      const result = facade.handleVehicleEntry('B 3333 CC');

      const hasTicketLog = result.processLogs.some(log => 
        log.includes('Ticket Created')
      );

      expect(hasTicketLog).toBe(true);
    });

    test('harus log display message', () => {
      const plateNumber = 'B 4444 DD';
      const result = facade.handleVehicleEntry(plateNumber);

      const hasDisplayLog = result.processLogs.some(log => 
        log.includes('Welcome') && log.includes(plateNumber)
      );

      expect(hasDisplayLog).toBe(true);
    });

    test('harus log gate operations', () => {
      const result = facade.handleVehicleEntry('B 5555 EE');

      const hasOpenLog = result.processLogs.some(log => 
        log.toLowerCase().includes('opening') || log.toLowerCase().includes('open')
      );
      const hasCloseLog = result.processLogs.some(log => 
        log.toLowerCase().includes('closing') || log.toLowerCase().includes('close')
      );

      expect(hasOpenLog).toBe(true);
      expect(hasCloseLog).toBe(true);
    });

    test('logs harus berurutan (ticket -> display -> open -> close)', () => {
      const result = facade.handleVehicleEntry('B 6666 FF');

      const ticketIndex = result.processLogs.findIndex(log => 
        log.includes('Ticket Created')
      );
      const displayIndex = result.processLogs.findIndex(log => 
        log.includes('Welcome')
      );
      const openIndex = result.processLogs.findIndex(log => 
        log.toLowerCase().includes('opening')
      );
      const closeIndex = result.processLogs.findIndex(log => 
        log.toLowerCase().includes('closing')
      );

      expect(ticketIndex).toBeLessThan(displayIndex);
      expect(displayIndex).toBeLessThan(openIndex);
      expect(openIndex).toBeLessThan(closeIndex);
    });
  });

  describe('SmartParkingFacade - Different Plate Numbers', () => {
    test('harus handle berbagai format plat', () => {
      const plates = [
        'B 1234 CD',
        'D 5678 EF',
        'F 9999 XY',
        'AA 1111 BB',
      ];

      plates.forEach(plate => {
        const result = facade.handleVehicleEntry(plate);
        expect(result.ticket.vehicleNumber).toBe(plate);
      });
    });

    test('setiap entry harus generate ticket ID unik', () => {
      const result1 = facade.handleVehicleEntry('B 1111 AA');
      const result2 = facade.handleVehicleEntry('B 2222 BB');
      const result3 = facade.handleVehicleEntry('B 3333 CC');

      expect(result1.ticket.id).not.toBe(result2.ticket.id);
      expect(result2.ticket.id).not.toBe(result3.ticket.id);
      expect(result1.ticket.id).not.toBe(result3.ticket.id);
    });
  });

  describe('SmartParkingFacade - Simplification Benefit', () => {
    test('satu method call harus handle semua subsystems', () => {
      // Client hanya perlu call 1 method
      const result = facade.handleVehicleEntry('B 7777 GG');

      // Tapi di dalam dia coordinate banyak subsystems:
      // 1. Factory (buat hardware)
      // 2. Builder (buat ticket)
      // 3. Display (show message)
      // 4. Gate (open & close)

      expect(result.ticket).toBeDefined(); // Builder bekerja
      expect(result.processLogs.length).toBeGreaterThan(0); // Semua subsystems bekerja
    });

    test('client tidak perlu tahu detail internal', () => {
      const result = facade.handleVehicleEntry('B 8888 HH');

      // Client hanya perlu tahu:
      // - Ada ticket
      // - Ada logs
      // Tidak perlu tahu tentang Factory, Builder, Gate, Display details

      expect(result.ticket).toBeDefined();
      expect(result.processLogs).toBeDefined();
    });
  });

  describe('SmartParkingFacade - Real-world Scenarios', () => {
    test('scenario: mobil masuk parkiran pagi hari', () => {
      const result = facade.handleVehicleEntry('B 1234 AB');

      expect(result.ticket.vehicleNumber).toBe('B 1234 AB');
      const welcomeLog = result.processLogs.find(log => log.includes('Welcome'));
      expect(welcomeLog).toBeDefined();
    });

    test('scenario: motor masuk parkiran siang hari', () => {
      const result = facade.handleVehicleEntry('B 9876 ZX');

      expect(result.ticket).toBeDefined();
      expect(result.processLogs.length).toBeGreaterThan(3);
    });

    test('scenario: kendaraan VIP masuk', () => {
      // Walaupun VIP, process tetap sama via facade
      const result = facade.handleVehicleEntry('B 8888 VIP');

      expect(result.ticket.vehicleNumber).toBe('B 8888 VIP');
      expect(result.processLogs).toBeDefined();
    });
  });
});
