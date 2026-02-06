# Observer Pattern

The Observer pattern defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.

## Class Diagram

```mermaid
classDiagram
    class IObserver {
        <<interface>>
        +update(availableSpots: number) void
    }
    
    class ParkingLotSubject {
        -observers: IObserver[]
        -availableSpots: number
        +attach(observer: IObserver) void
        +setSpots(count: number) void
        -notify() void
    }
    
    class DisplayBoardObserver {
        +message: string
        +update(count: number) void
    }
    
    class AdminDashboardObserver {
        +log: string
        +update(count: number) void
    }
    
    IObserver <|.. DisplayBoardObserver
    IObserver <|.. AdminDashboardObserver
    ParkingLotSubject o-- IObserver : observers
```

## Usage

```typescript
const parkingLot = new ParkingLotSubject();
const display = new DisplayBoardObserver();
const admin = new AdminDashboardObserver();

parkingLot.attach(display);
parkingLot.attach(admin);
parkingLot.setSpots(5); // Both observers are notified
```
