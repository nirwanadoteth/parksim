import { StandardHardwareFactory } from "../creational/abstract-factory";
import { ParkingTicket, TicketBuilder } from "../creational/builder";

interface VehicleEntryResult {
  ticket: ParkingTicket;
  processLogs: string[];
}

export class SmartParkingFacade {
  private factory = new StandardHardwareFactory();
  private gate = this.factory.createGate();
  private display = this.factory.createDisplay();

  public handleVehicleEntry(plate: string): VehicleEntryResult {
    const logs: string[] = [];

    const ticket = new TicketBuilder()
      .setVehicleNumber(plate)
      .setEntryTime(new Date())
      .build();
    logs.push(`Ticket Created: ${ticket.id}`);

    logs.push(this.display.showMessage(`Welcome ${plate}`));
    logs.push(this.gate.open());

    logs.push(this.gate.close());

    return { ticket, processLogs: logs };
  }
}
