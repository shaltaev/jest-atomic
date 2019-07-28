const ITERATION: number = 0;
import { AtomicTestRegistry, iterate } from "../../src";

import { mul } from "./mul";

const testRegistry: AtomicTestRegistry = new AtomicTestRegistry();

// ALL TEST :: START
// For ITERATION 0
testRegistry.addTest(0, "Add icon not implement", () => {
  expect(mul(5, 5)).toStrictEqual(Error("No implemented yet"));
});
// ALL TEST :: END

let toTest: number[] = [];

toTest = iterate({
  testRegistryShadow: testRegistry,
  currentIterate: ITERATION,
  iterateID: 0,
  toTestShadow: toTest,
  outdateTest: [],
  newTest: [0],
  iterationDescription: "000 Not implemented yet"
});
