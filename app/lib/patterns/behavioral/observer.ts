// lib/patterns/behavioral/observer.ts

interface IObserver {
  update(availableSpots: number): void;
}

export class ParkingLotSubject {
  private observers: IObserver[] = [];
  private availableSpots: number = 100;

  attach(observer: IObserver) {
    this.observers.push(observer);
  }

  setSpots(count: number) {
    this.availableSpots = count;
    this.notify();
  }

  private notify() {
    for (const observer of this.observers) {
      observer.update(this.availableSpots);
    }
  }
}

export class DisplayBoardObserver implements IObserver {
  public message: string = "";
  update(count: number) {
    this.message = `Display Update: ${count} spots remaining.`;
  }
}

export class AdminDashboardObserver implements IObserver {
  public log: string = "";
  update(count: number) {
    const status = count < 10 ? "CRITICAL" : "NORMAL";
    this.log = `Admin Alert: Capacity is ${status} (${count})`;
  }
}
