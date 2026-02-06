import {
  AdminDashboardObserver,
  DisplayBoardObserver,
  ParkingLotSubject,
} from "@/app/lib/patterns/behavioral/observer";
import { ParkingSpotContext } from "@/app/lib/patterns/behavioral/state";
import {
  HourlyStrategy,
  PricingContext,
  WeekendStrategy,
} from "@/app/lib/patterns/behavioral/strategy";
import {
  StandardHardwareFactory,
  VIPHardwareFactory,
} from "@/app/lib/patterns/creational/abstract-factory";
import { ParkingTicket, TicketBuilder } from "@/app/lib/patterns/creational/builder";
import { ParkingLevel } from "@/app/lib/patterns/creational/prototype";
import { StripeAdapter } from "@/app/lib/patterns/structural/adapter";
import {
  BasicParking,
  CarWashDecorator,
  ValetDecorator,
} from "@/app/lib/patterns/structural/decorator";
import { SmartParkingFacade } from "@/app/lib/patterns/structural/facade";
import { NextResponse } from "next/server";

interface PatternOutput {
  pattern: string;
  category: string;
  description: string;
  output: unknown;
}

export async function GET() {
  const results: PatternOutput[] = [];

  // 1. Builder Pattern (Creational)
  const ticket: ParkingTicket = new TicketBuilder()
    .setVehicleNumber("B 1234 CD")
    .setEntryTime(new Date())
    .setIsMember(true)
    .setInsuranceIncluded(true)
    .build();
  results.push({
    pattern: "Builder",
    category: "Creational",
    description: "Creates complex objects step by step with fluent API",
    output: {
      ticketId: ticket.id,
      vehicleNumber: ticket.vehicleNumber,
      isMember: ticket.isMember,
      insuranceIncluded: ticket.insuranceIncluded,
    },
  });

  // 2. Abstract Factory Pattern (Creational)
  const standardFactory = new StandardHardwareFactory();
  const vipFactory = new VIPHardwareFactory();
  const standardGate = standardFactory.createGate();
  const standardDisplay = standardFactory.createDisplay();
  const vipGate = vipFactory.createGate();
  const vipDisplay = vipFactory.createDisplay();
  results.push({
    pattern: "Abstract Factory",
    category: "Creational",
    description: "Creates families of related objects without specifying concrete classes",
    output: {
      standard: {
        gate: standardGate.open(),
        display: standardDisplay.showMessage("Welcome"),
      },
      vip: {
        gate: vipGate.open(),
        display: vipDisplay.showMessage("VIP Welcome"),
      },
    },
  });

  // 3. Prototype Pattern (Creational)
  const originalLevel = new ParkingLevel("Level A", 3);
  const clonedLevel = originalLevel.clone();
  results.push({
    pattern: "Prototype",
    category: "Creational",
    description: "Creates new objects by cloning existing ones",
    output: {
      original: {
        levelName: originalLevel.levelName,
        spots: originalLevel.spots,
      },
      cloned: {
        levelName: clonedLevel.levelName,
        spots: clonedLevel.spots,
      },
    },
  });

  // 4. Adapter Pattern (Structural)
  const paymentProcessor = new StripeAdapter();
  const paymentResult = paymentProcessor.pay(50000);
  results.push({
    pattern: "Adapter",
    category: "Structural",
    description: "Allows incompatible interfaces to work together",
    output: {
      amountPaid: 50000,
      result: paymentResult,
    },
  });

  // 5. Decorator Pattern (Structural)
  const basicService = new BasicParking();
  const withCarWash = new CarWashDecorator(basicService);
  const withValetAndCarWash = new ValetDecorator(withCarWash);
  results.push({
    pattern: "Decorator",
    category: "Structural",
    description: "Adds behavior to objects dynamically without affecting other objects",
    output: {
      basic: {
        description: basicService.getDescription(),
        cost: basicService.getCost(),
      },
      withCarWash: {
        description: withCarWash.getDescription(),
        cost: withCarWash.getCost(),
      },
      withValetAndCarWash: {
        description: withValetAndCarWash.getDescription(),
        cost: withValetAndCarWash.getCost(),
      },
    },
  });

  // 6. Facade Pattern (Structural)
  const facade = new SmartParkingFacade();
  const entryProcess = facade.handleVehicleEntry("B 5678 EF");
  results.push({
    pattern: "Facade",
    category: "Structural",
    description: "Provides a simplified interface to a complex subsystem",
    output: {
      ticketId: entryProcess.ticket.id,
      vehicleNumber: entryProcess.ticket.vehicleNumber,
      processLogs: entryProcess.processLogs,
    },
  });

  // 7. Observer Pattern (Behavioral)
  const parkingLot = new ParkingLotSubject();
  const display = new DisplayBoardObserver();
  const admin = new AdminDashboardObserver();
  parkingLot.attach(display);
  parkingLot.attach(admin);
  parkingLot.setSpots(5);
  results.push({
    pattern: "Observer",
    category: "Behavioral",
    description: "Notifies multiple objects about state changes",
    output: {
      spotsSet: 5,
      displayMessage: display.message,
      adminLog: admin.log,
    },
  });

  // 8. State Pattern (Behavioral)
  const parkingSpot = new ParkingSpotContext();
  const parkResult = parkingSpot.requestPark();
  const parkAgainResult = parkingSpot.requestPark();
  const leaveResult = parkingSpot.requestLeave();
  results.push({
    pattern: "State",
    category: "Behavioral",
    description: "Allows an object to alter its behavior when its internal state changes",
    output: {
      firstPark: parkResult,
      secondPark: parkAgainResult,
      leave: leaveResult,
    },
  });

  // 9. Strategy Pattern (Behavioral)
  const pricing = new PricingContext(new HourlyStrategy());
  const hourlyFee = pricing.executePricing(5);
  pricing.setStrategy(new WeekendStrategy());
  const weekendFee = pricing.executePricing(5);
  results.push({
    pattern: "Strategy",
    category: "Behavioral",
    description: "Defines a family of interchangeable algorithms",
    output: {
      hours: 5,
      hourlyRate: hourlyFee,
      weekendRate: weekendFee,
    },
  });

  return NextResponse.json({
    status: "Success",
    message: "Design Patterns Demo - Park Simulator",
    patterns: results,
  });
}
