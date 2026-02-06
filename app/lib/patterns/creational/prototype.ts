interface IPrototype<T> {
  clone(): T;
}
export class ParkingLevel implements IPrototype<ParkingLevel> {
  public spots: string[] = [];

  constructor(
    public levelName: string,
    spotCount: number,
  ) {
    for (let i = 1; i <= spotCount; i++) {
      this.spots.push(`Spot-${i}`);
    }
  }

  setDetails(name: string) {
    this.levelName = name;
  }

  clone(): ParkingLevel {
    const cloned = new ParkingLevel(this.levelName, this.spots.length);
    cloned.spots = [...this.spots];
    cloned.levelName = `Copy of ${this.levelName}`;
    return cloned;
  }
}
