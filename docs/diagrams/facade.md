# Facade Pattern

The Facade pattern provides a unified interface to a set of interfaces in a subsystem. Facade defines a higher-level interface that makes the subsystem easier to use.

## Class Diagram

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

## Usage

```typescript
const facade = new SmartParkingFacade();
const result = facade.handleVehicleEntry("B 1234 CD");
// Returns: { ticket: ParkingTicket, processLogs: string[] }
```
