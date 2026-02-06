# State Pattern

State pattern memungkinkan objek mengubah perilakunya ketika status internalnya berubah. Objek akan tampak berubah kelasnya.

## Diagram Kelas

```mermaid
classDiagram
    class SpotState {
        <<interface>>
        +park(context: ParkingSpotContext) string
        +leave(context: ParkingSpotContext) string
    }
    
    class ParkingSpotContext {
        -state: SpotState
        +setState(state: SpotState) void
        +requestPark() string
        +requestLeave() string
    }
    
    class AvailableState {
        +park(ctx: ParkingSpotContext) string
        +leave() string
    }
    
    class OccupiedState {
        +park() string
        +leave(ctx: ParkingSpotContext) string
    }
    
    SpotState <|.. AvailableState
    SpotState <|.. OccupiedState
    ParkingSpotContext o-- SpotState : state
    AvailableState ..> OccupiedState : creates
    OccupiedState ..> AvailableState : creates
```

## Penggunaan

```typescript
const spot = new ParkingSpotContext();
spot.requestPark();  // "Park successful. State changed to Occupied."
spot.requestPark();  // "Spot is full!"
spot.requestLeave(); // "Vehicle left. State changed to Available."
```
