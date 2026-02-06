# Decorator Pattern

Decorator pattern menambahkan tanggung jawab tambahan ke objek secara dinamis. Decorator menyediakan alternatif yang fleksibel untuk subclassing dalam memperluas fungsionalitas.

## Diagram Kelas

```mermaid
classDiagram
    class IParkingService {
        <<interface>>
        +getCost() number
        +getDescription() string
    }
    
    class BasicParking {
        +getCost() number
        +getDescription() string
    }
    
    class ServiceDecorator {
        <<abstract>>
        #service: IParkingService
        +getCost() number*
        +getDescription() string*
    }
    
    class CarWashDecorator {
        +getCost() number
        +getDescription() string
    }
    
    class ValetDecorator {
        +getCost() number
        +getDescription() string
    }
    
    IParkingService <|.. BasicParking
    IParkingService <|.. ServiceDecorator
    ServiceDecorator <|-- CarWashDecorator
    ServiceDecorator <|-- ValetDecorator
    ServiceDecorator o-- IParkingService : service
```

## Penggunaan

```typescript
let service: IParkingService = new BasicParking();
service = new CarWashDecorator(service);
service = new ValetDecorator(service);

service.getCost();        // 60000 (5000 + 35000 + 20000)
service.getDescription(); // "Basic Parking + Car Wash + Valet Service"
```
