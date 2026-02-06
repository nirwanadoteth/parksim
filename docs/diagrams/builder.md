# Builder Pattern

Builder pattern memisahkan konstruksi objek kompleks dari representasinya sehingga proses konstruksi yang sama dapat membuat representasi yang berbeda.

## Diagram Kelas

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

## Penggunaan

```typescript
const ticket = new TicketBuilder()
  .setVehicleNumber("B 1234 CD")
  .setEntryTime(new Date())
  .setIsMember(true)
  .setInsuranceIncluded(true)
  .build();
```
