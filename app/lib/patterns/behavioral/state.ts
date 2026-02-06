// lib/patterns/behavioral/state.ts

interface SpotState {
  park(context: ParkingSpotContext): string;
  leave(context: ParkingSpotContext): string;
}

export class ParkingSpotContext {
  private state: SpotState;

  constructor() {
    this.state = new AvailableState(); // Initial State
  }

  setState(state: SpotState) {
    this.state = state;
  }

  requestPark(): string {
    return this.state.park(this);
  }

  requestLeave(): string {
    return this.state.leave(this);
  }
}

class AvailableState implements SpotState {
  park(ctx: ParkingSpotContext): string {
    ctx.setState(new OccupiedState());
    return "Park successful. State changed to Occupied.";
  }
  leave(ctx: ParkingSpotContext): string {
    return "Spot is already empty.";
  }
}

class OccupiedState implements SpotState {
  park(ctx: ParkingSpotContext): string {
    return "Spot is full!";
  }
  leave(ctx: ParkingSpotContext): string {
    ctx.setState(new AvailableState());
    return "Vehicle left. State changed to Available.";
  }
}
