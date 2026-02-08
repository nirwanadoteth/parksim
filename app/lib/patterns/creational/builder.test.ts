import { TicketBuilder, ParkingTicket } from './builder';

describe('Builder Pattern - Test', () => {
  describe('TicketBuilder - Basic Functionality', () => {
    test('harus bisa build ticket dengan data minimal (vehicle number only)', () => {
      const ticket = new TicketBuilder()
        .setVehicleNumber('B 1234 CD')
        .build();

      expect(ticket).toBeInstanceOf(ParkingTicket);
      expect(ticket.vehicleNumber).toBe('B 1234 CD');
      expect(ticket.id).toBeDefined();
      expect(ticket.id).toContain('TICKET-');
    });

    test('harus bisa build ticket dengan semua atribut', () => {
      const entryTime = new Date('2024-01-01T10:00:00');
      const ticket = new TicketBuilder()
        .setVehicleNumber('B 5678 EF')
        .setEntryTime(entryTime)
        .setIsMember(true)
        .setInsuranceIncluded(true)
        .build();

      expect(ticket.vehicleNumber).toBe('B 5678 EF');
      expect(ticket.entryTime).toBe(entryTime);
      expect(ticket.isMember).toBe(true);
      expect(ticket.insuranceIncluded).toBe(true);
    });

    test('harus throw error kalau vehicle number kosong', () => {
      expect(() => {
        new TicketBuilder().build();
      }).toThrow('Vehicle number is required');
    });

    test('setiap ticket harus punya ID unik', () => {
      const ticket1 = new TicketBuilder().setVehicleNumber('B 1111 AA').build();
      const ticket2 = new TicketBuilder().setVehicleNumber('B 2222 BB').build();

      expect(ticket1.id).not.toBe(ticket2.id);
    });
  });

  describe('TicketBuilder - Method Chaining', () => {
    test('semua setter harus return builder untuk chaining', () => {
      const builder = new TicketBuilder();
      
      const result1 = builder.setVehicleNumber('B 1234 CD');
      const result2 = builder.setEntryTime(new Date());
      const result3 = builder.setIsMember(true);
      const result4 = builder.setInsuranceIncluded(false);

      expect(result1).toBe(builder);
      expect(result2).toBe(builder);
      expect(result3).toBe(builder);
      expect(result4).toBe(builder);
    });

    test('harus bisa chain semua setter dalam satu line', () => {
      const ticket = new TicketBuilder()
        .setVehicleNumber('B 9999 ZZ')
        .setEntryTime(new Date())
        .setIsMember(false)
        .setInsuranceIncluded(true)
        .build();

      expect(ticket).toBeDefined();
      expect(ticket.vehicleNumber).toBe('B 9999 ZZ');
    });
  });

  describe('TicketBuilder - Default Values', () => {
    test('isMember default harus false', () => {
      const ticket = new TicketBuilder()
        .setVehicleNumber('B 1234 CD')
        .build();

      expect(ticket.isMember).toBe(false);
    });

    test('insuranceIncluded default harus false', () => {
      const ticket = new TicketBuilder()
        .setVehicleNumber('B 1234 CD')
        .build();

      expect(ticket.insuranceIncluded).toBe(false);
    });

    test('entryTime default harus ada (current time)', () => {
      const beforeBuild = new Date();
      const ticket = new TicketBuilder()
        .setVehicleNumber('B 1234 CD')
        .build();
      const afterBuild = new Date();

      expect(ticket.entryTime).toBeDefined();
      expect(ticket.entryTime.getTime()).toBeGreaterThanOrEqual(beforeBuild.getTime() - 1000);
      expect(ticket.entryTime.getTime()).toBeLessThanOrEqual(afterBuild.getTime() + 1000);
    });
  });

  describe('TicketBuilder - Different Scenarios', () => {
    test('scenario: member tanpa insurance', () => {
      const ticket = new TicketBuilder()
        .setVehicleNumber('B 1111 AA')
        .setIsMember(true)
        .setInsuranceIncluded(false)
        .build();

      expect(ticket.isMember).toBe(true);
      expect(ticket.insuranceIncluded).toBe(false);
    });

    test('scenario: non-member dengan insurance', () => {
      const ticket = new TicketBuilder()
        .setVehicleNumber('B 2222 BB')
        .setIsMember(false)
        .setInsuranceIncluded(true)
        .build();

      expect(ticket.isMember).toBe(false);
      expect(ticket.insuranceIncluded).toBe(true);
    });

    test('scenario: member VIP dengan semua benefit', () => {
      const ticket = new TicketBuilder()
        .setVehicleNumber('B 8888 VIP')
        .setIsMember(true)
        .setInsuranceIncluded(true)
        .build();

      expect(ticket.isMember).toBe(true);
      expect(ticket.insuranceIncluded).toBe(true);
    });
  });
});
