# Prototype Pattern

Prototype pattern menentukan jenis objek yang akan dibuat menggunakan instance prototipe, dan membuat objek baru dengan menyalin prototipe ini.

## Diagram Kelas

```mermaid
classDiagram
    class IPrototype~T~ {
        <<interface>>
        +clone() T
    }
    
    class ParkingLevel {
        +levelName: string
        +spots: string[]
        +setDetails(name: string) void
        +clone() ParkingLevel
    }
    
    IPrototype~ParkingLevel~ <|.. ParkingLevel
```

## Penggunaan

```typescript
const originalLevel = new ParkingLevel("Level A", 3);
const clonedLevel = originalLevel.clone();

console.log(originalLevel.levelName); // "Level A"
console.log(clonedLevel.levelName);   // "Copy of Level A"
console.log(clonedLevel.spots);       // ["Spot-1", "Spot-2", "Spot-3"]
```
