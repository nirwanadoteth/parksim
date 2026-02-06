# Observer Pattern

Observer pattern mendefinisikan ketergantungan satu-ke-banyak antara objek sehingga ketika satu objek berubah status, semua objek yang bergantung padanya akan diberitahu dan diperbarui secara otomatis.

## Diagram Kelas

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

## Penggunaan

```typescript
const parkingLot = new ParkingLotSubject();
const display = new DisplayBoardObserver();
const admin = new AdminDashboardObserver();

parkingLot.attach(display);
parkingLot.attach(admin);
parkingLot.setSpots(5); // Kedua observer diberitahu
```
