# Facade Pattern

Facade pattern menyediakan antarmuka terpadu untuk sekumpulan antarmuka dalam sebuah subsistem. Facade mendefinisikan antarmuka tingkat tinggi yang membuat subsistem lebih mudah digunakan.

## Diagram Kelas

```mermaid
classDiagram
    class SmartParkingFacade {
        -factory: StandardHardwareFactory
        -gate: IGate
        -display: IDisplay
        +handleVehicleEntry(plate: string) VehicleEntryResult
    }
    
    class StandardHardwareFactory {
        +createGate() IGate
        +createDisplay() IDisplay
    }
    
    class TicketBuilder {
        +setVehicleNumber(plate: string) TicketBuilder
        +setEntryTime(time: Date) TicketBuilder
        +build() ParkingTicket
    }
    
    class IGate {
        <<interface>>
        +open() string
        +close() string
    }
    
    class IDisplay {
        <<interface>>
        +showMessage(msg: string) string
    }
    
    class ParkingTicket {
        +id: string
        +vehicleNumber: string
        +entryTime: Date
    }
    
    SmartParkingFacade --> StandardHardwareFactory
    SmartParkingFacade --> TicketBuilder
    SmartParkingFacade --> IGate
    SmartParkingFacade --> IDisplay
    TicketBuilder ..> ParkingTicket : creates
```

## Penggunaan

```typescript
const facade = new SmartParkingFacade();
const result = facade.handleVehicleEntry("B 1234 CD");
// Mengembalikan: { ticket: ParkingTicket, processLogs: string[] }
```
