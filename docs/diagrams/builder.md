# Builder Pattern

The Builder pattern separates the construction of a complex object from its representation so that the same construction process can create different representations.

## Class Diagram

```mermaid
classDiagram
    class ParkingTicket {
        +id: string
        +vehicleNumber: string
        +entryTime: Date
        +isMember: boolean
        +insuranceIncluded: boolean
    }
    
    class TicketBuilder {
        -vehicleNumber: string
        -entryTime: Date
        -isMember: boolean
        -insuranceIncluded: boolean
        +setVehicleNumber(plate: string) TicketBuilder
        +setEntryTime(time: Date) TicketBuilder
        +setIsMember(isMember: boolean) TicketBuilder
        +setInsuranceIncluded(included: boolean) TicketBuilder
        +build() ParkingTicket
    }
    
    TicketBuilder ..> ParkingTicket : creates
```

## Usage

```typescript
const ticket = new TicketBuilder()
  .setVehicleNumber("B 1234 CD")
  .setEntryTime(new Date())
  .setIsMember(true)
  .setInsuranceIncluded(true)
  .build();
```
