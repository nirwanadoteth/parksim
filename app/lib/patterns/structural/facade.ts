// lib/patterns/structural/facade.ts

import { StandardHardwareFactory } from "../creational/abstract-factory";
import { TickedBuilder } from "../creational/builder";

export class SmartParkingFacade {
  private factory = new StandardHardwareFactory();
  private gate = this.factory.createGate();
  private display = this.factory.createDisplay();

  // Operasi kompleks disederhanakan menjadi satu method
  public handleVehicleEntry(plate: string): any {
    const logs = [];

    // 1. Generate Ticket
    const ticket = new TickedBuilder()
      .setVehicleNumber(plate)
      .setEntryTime(new Date())
      .build();
    logs.push(`Ticket Created: ${ticket.id}`);

    // 2. Hardware Interaction
    logs.push(this.display.showMessage(`Welcome ${plate}`));
    logs.push(this.gate.open());

    // 3. Close gate logic (simulation)
    logs.push(this.gate.close());

    return { ticket, processLogs: logs };
  }
}
