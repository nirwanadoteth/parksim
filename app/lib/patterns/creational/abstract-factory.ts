interface IGate {
  open(): string;
  close(): string;
}

interface IDisplay {
  showMessage(msg: string): string;
}

export interface IParkingHardwareFactory {
  createGate(): IGate;
  createDisplay(): IDisplay;
}

// Concrete Products for Standard Parking Lot
class StandardGate implements IGate {
  open = () => "Opening standard gates. (delay 5s)";
  close = () => "Closing standard gates. (delay 5s)";
}

class StandardDisplay implements IDisplay {
  showMessage = (msg: string) => `[LCD Panel]: ${msg}`;
}

export class StandardHardwareFactory implements IParkingHardwareFactory {
  createGate(): IGate {
    return new StandardGate();
  }
  createDisplay(): IDisplay {
    return new StandardDisplay();
  }
}

// Concrete Products for VIP Parking Lot
class VIPGate implements IGate {
  open = () => "Opening VIP gates. (delay 2s)";
  close = () => "Closing VIP gates. (delay 2s)";
}

class VIPDisplay implements IDisplay {
  showMessage = (msg: string) => `[OLED Display]: ${msg}`;
}

export class VIPHardwareFactory implements IParkingHardwareFactory {
  createGate(): IGate {
    return new VIPGate();
  }
  createDisplay(): IDisplay {
    return new VIPDisplay();
  }
}
