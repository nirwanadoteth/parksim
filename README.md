# ParkSim - Smart Parking System Simulation

ParkSim adalah sebuah proyek simulasi sistem parkir pintar berbasis **Next.js** dan **TypeScript**. Proyek ini dirancang khusus untuk mendemonstrasikan implementasi berbagai **Design Patterns** (Corak Reka Bentuk) dalam pengembangan perangkat lunak modern untuk menciptakan sistem yang modular, skalabel, dan mudah dipelihara.

## 🚀 Fitur Utama

- **Manajemen Perangkat Keras**: Simulasi kontrol pintu gerbang (Gate) dan panel informasi (Display).
- **Sistem Tiket Otomatis**: Pembuatan tiket parkir dengan konfigurasi fleksibel.
- **Pemantauan Real-time**: Notifikasi otomatis perubahan kuota parkir kepada Admin dan Display Board.
- **Fleksibilitas Pembayaran**: Dukungan integrasi pembayaran pihak ketiga (seperti Stripe) melalui sistem adaptor.
- **Strategi Tarif**: Perhitungan biaya parkir dinamis (tarif jam biasa vs akhir pekan).
- **Layanan Tambahan**: Fitur dekorator untuk menambahkan layanan seperti cuci kereta atau valet.

## 🛠️ Design Patterns yang Diimplementasikan

Proyek ini menggunakan 3 kategori utama Design Patterns:

### 1. Creational Patterns (Pembuatan Objek)

- **Abstract Factory**: Digunakan untuk membedakan pembuatan perangkat keras antara tipe **Standard** dan **VIP**.
- **Builder**: Digunakan pada `TickedBuilder` untuk membuat objek tiket yang kompleks secara bertahap.
- **Prototype**: Digunakan untuk mengklon konfigurasi lantai parkir (`ParkingLevel`).

### 2. Structural Patterns (Struktur Objek)

- **Adapter**: Menghubungkan sistem internal dengan library pembayaran luar (`ExternalStripeLib`).
- **Decorator**: Menambahkan fungsionalitas tambahan pada layanan parkir dasar tanpa mengubah kelas aslinya.
- **Facade**: Menyederhanakan alur masuk kendaraan yang kompleks menjadi satu fungsi sederhana melalui `SmartParkingFacade`.

### 3. Behavioral Patterns (Perilaku Objek)

- **Observer**: Mengelola pemutakhiran status ketersediaan slot parkir ke berbagai pemantau.
- **State**: Mengelola transisi status slot parkir dari `Available` ke `Occupied` dan sebaliknya.
- **Strategy**: Memungkinkan pergantian algoritma perhitungan harga secara dinamis.

## 📊 Arsitektur Kelas (Class Diagram)

Berikut adalah visualisasi hubungan antar kelas dalam sistem ini:

```mermaid
classDiagram
    class IParkingHardwareFactory {
        <<interface>>
        +createGate() IGate
        +createDisplay() IDisplay
    }
    class StandardHardwareFactory {
        +createGate() IGate
        +createDisplay() IDisplay
    }
    IParkingHardwareFactory <|.. StandardHardwareFactory

    class ParkingLotSubject {
        -observers: IObserver[]
        -availableSpots: number
        +attach(observer)
        +notify()
    }

    class SmartParkingFacade {
        -factory: StandardHardwareFactory
        +handleVehicleEntry(plate)
    }

    class IPricingStrategy {
        <<interface>>
        +calculate(hours)
    }
    class PricingContext {
        -strategy: IPricingStrategy
        +executePricing(hours)
    }

    SmartParkingFacade --> TickedBuilder
    ParkingLotSubject --> IObserver
    PricingContext --> IPricingStrategy
```
