import {
  AdminDashboardObserver,
  DisplayBoardObserver,
  ParkingLotSubject,
} from "@/app/lib/patterns/behavioral/observer";
import {
  HourlyStrategy,
  PricingContext,
  WeekendStrategy,
} from "@/app/lib/patterns/behavioral/strategy";
import {
  BasicParking,
  CarWashDecorator,
} from "@/app/lib/patterns/creational/decorator";
import { SmartParkingFacade } from "@/app/lib/patterns/structural/facade";
import { NextResponse } from "next/server";

export async function GET() {
  const results = {};

  // 1. Test Builder & Facade (Creational & Structural)
  const facade = new SmartParkingFacade();
  const entryProcess = facade.handleVehicleEntry("B 1234 CD");

  // 2. Test Decorator (Structural)
  let myService = new BasicParking();
  myService = new CarWashDecorator(myService); // Add CarWash
  const serviceCost = myService.getCost(); // 5000 + 35000 = 40000

  // 3. Test Strategy (Behavioral)
  const pricing = new PricingContext(new HourlyStrategy());
  const normalFee = pricing.executePricing(5); // 15000
  pricing.setStrategy(new WeekendStrategy());
  const weekendFee = pricing.executePricing(5); // 25000

  // 4. Test Observer (Behavioral)
  const parkingLot = new ParkingLotSubject();
  const display = new DisplayBoardObserver();
  const admin = new AdminDashboardObserver();

  parkingLot.attach(display);
  parkingLot.attach(admin);

  parkingLot.setSpots(5); // Trigger notify

  return NextResponse.json({
    status: "Success",
    tests: {
      facade_output: entryProcess,
      decorator_cost: serviceCost,
      strategy_comparison: { normal: normalFee, weekend: weekendFee },
      observer_reaction: {
        display: display.message,
        admin: admin.log,
      },
    },
  });
}
