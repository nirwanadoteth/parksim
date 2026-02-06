# Abstract Factory Pattern

Abstract Factory pattern menyediakan antarmuka untuk membuat keluarga objek yang terkait atau bergantung tanpa menentukan kelas konkretnya.

## Diagram Kelas

```mermaid
classDiagram
    class IParkingHardwareFactory {
        <<interface>>
        +createGate() IGate
        +createDisplay() IDisplay
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
    
    class StandardHardwareFactory {
        +createGate() IGate
        +createDisplay() IDisplay
    }
    
    class VIPHardwareFactory {
        +createGate() IGate
        +createDisplay() IDisplay
    }
    
    class StandardGate {
        +open() string
        +close() string
    }
    
    class StandardDisplay {
        +showMessage(msg: string) string
    }
    
    class VIPGate {
        +open() string
        +close() string
    }
    
    class VIPDisplay {
        +showMessage(msg: string) string
    }
    
    IParkingHardwareFactory <|.. StandardHardwareFactory
    IParkingHardwareFactory <|.. VIPHardwareFactory
    IGate <|.. StandardGate
    IGate <|.. VIPGate
    IDisplay <|.. StandardDisplay
    IDisplay <|.. VIPDisplay
    StandardHardwareFactory ..> StandardGate : creates
    StandardHardwareFactory ..> StandardDisplay : creates
    VIPHardwareFactory ..> VIPGate : creates
    VIPHardwareFactory ..> VIPDisplay : creates
```

## Penggunaan

```typescript
const standardFactory = new StandardHardwareFactory();
const gate = standardFactory.createGate();
const display = standardFactory.createDisplay();

gate.open();                    // "Opening standard gates. (delay 5s)"
display.showMessage("Welcome"); // "[LCD Panel]: Welcome"

const vipFactory = new VIPHardwareFactory();
const vipGate = vipFactory.createGate();
vipGate.open(); // "Opening VIP gates. (delay 2s)"
```
