class ParkingTicket {
  constructor(
    public id: string,
    public vehicleNumber: string,
    public entryTime: Date,
    public isMember: boolean = false,
    public insuranceIncluded: boolean = false,
  ) {}
}

export class TickedBuilder {
  private vehicleNumber: string = "";
  private entryTime: Date = new Date();
  private isMember: boolean = false;
  private insuranceIncluded: boolean = false;

  setVehicleNumber(plate: string): TickedBuilder {
    this.vehicleNumber = plate;
    return this;
  }

  setEntryTime(time: Date): TickedBuilder {
    this.entryTime = time;
    return this;
  }

  setIsMember(isMember: boolean): TickedBuilder {
    this.isMember = isMember;
    return this;
  }

  setInsuranceIncluded(insuranceIncluded: boolean): TickedBuilder {
    this.insuranceIncluded = insuranceIncluded;
    return this;
  }

  build(): ParkingTicket {
    if (!this.vehicleNumber) throw new Error("Vehicle number is required");
    const id = `TICKET-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    return new ParkingTicket(
      id,
      this.vehicleNumber,
      this.entryTime,
      this.isMember,
      this.insuranceIncluded,
    );
  }
}
