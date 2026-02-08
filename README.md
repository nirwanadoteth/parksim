# ParkSim - Simulasi Sistem Parkir Pintar

ParkSim adalah sebuah proyek simulasi sistem parkir pintar berbasis **Next.js** dan **TypeScript**. Proyek ini dirancang khusus untuk mendemonstrasikan implementasi berbagai **Design Patterns** dalam pengembangan perangkat lunak modern untuk menciptakan sistem yang modular, skalabel, dan mudah dipelihara.

## 🚀 Fitur Utama

- **Manajemen Perangkat Keras**: Simulasi kontrol pintu gerbang (Gate) dan panel informasi (Display).
- **Sistem Tiket Otomatis**: Pembuatan tiket parkir dengan konfigurasi fleksibel.
- **Pemantauan Real-time**: Notifikasi otomatis perubahan kuota parkir kepada Admin dan Display Board.
- **Fleksibilitas Pembayaran**: Dukungan integrasi pembayaran pihak ketiga (seperti Stripe) melalui sistem adaptor.
- **Strategi Tarif**: Perhitungan biaya parkir dinamis (tarif jam biasa vs akhir pekan).
- **Layanan Tambahan**: Fitur dekorator untuk menambahkan layanan seperti cuci mobil atau valet.

## 🛠️ Design Patterns yang Diimplementasikan

Proyek ini menggunakan 3 kategori utama Design Patterns:

### 1. Creational Patterns (Pembuatan Objek)

- **Abstract Factory**: Digunakan untuk membedakan pembuatan perangkat keras antara tipe **Standard** dan **VIP**.
- **Builder**: Digunakan pada `TicketBuilder` untuk membuat objek tiket yang kompleks secara bertahap.
- **Prototype**: Digunakan untuk mengklon konfigurasi lantai parkir (`ParkingLevel`).

### 2. Structural Patterns (Struktur Objek)

- **Adapter**: Menghubungkan sistem internal dengan library pembayaran luar (`ExternalStripeLib`).
- **Decorator**: Menambahkan fungsionalitas tambahan pada layanan parkir dasar tanpa mengubah kelas aslinya.
- **Facade**: Menyederhanakan alur masuk kendaraan yang kompleks menjadi satu fungsi sederhana melalui `SmartParkingFacade`.

### 3. Behavioral Patterns (Perilaku Objek)

- **Observer**: Mengelola pemutakhiran status ketersediaan slot parkir ke berbagai pemantau.
- **State**: Mengelola transisi status slot parkir dari `Available` ke `Occupied` dan sebaliknya.
- **Strategy**: Memungkinkan pergantian algoritma perhitungan harga secara dinamis.

## 📊 Diagram Kelas

Untuk diagram kelas detail setiap design pattern, lihat dokumentasi [Diagram Design Pattern](./docs/diagrams/README.md).

### Diagram Overview

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

    SmartParkingFacade --> TicketBuilder
    ParkingLotSubject --> IObserver
    PricingContext --> IPricingStrategy
```

## 🚀 Memulai

### Instalasi

```bash
npm install
```

### Pengembangan

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Testing

Proyek ini dilengkapi dengan comprehensive unit testing menggunakan Jest:

```bash
# Run semua test
npm test

# Run test dengan watch mode
npm run test:watch

# Run test dengan coverage report
npm run test:coverage
```

**Test Summary**:
- ✅ 9 test suites (semua design patterns ter-cover)
- ✅ 158 test cases (semua pass)
- ✅ 100% code coverage untuk statements, functions, dan lines

### API Endpoint

Uji semua design pattern dengan mengakses:

```
GET /api/parking
```

Endpoint ini mendemonstrasikan semua 9 design pattern dengan contoh output.

## 📖 Dokumentasi

Untuk penjelasan lengkap tentang implementasi design pattern, mapping pattern, dan hasil testing, lihat [Laporan Lengkap](./docs/LAPORAN.md).
