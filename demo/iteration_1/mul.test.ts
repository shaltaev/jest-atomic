const ITERATION: number = 1;
import { AtomicTestRegistry, iterate } from "../../src";

import { mul } from "./mul";

const testRegistry: AtomicTestRegistry = new AtomicTestRegistry();

// ALL TEST :: START
// For ITERATION 0
testRegistry.addTest(0, "Add icon not implement", () => {
  expect(mul(5, 5)).toStrictEqual(Error("No implemented yet"));
});

// For ITERATION 1
testRegistry.addTest(1, "Add icon not implement", () => {
  expect(mul(5, 5)).toBe(25);
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

toTest = iterate({
  testRegistryShadow: testRegistry,
  currentIterate: ITERATION,
  iterateID: 1,
  toTestShadow: toTest,
  outdateTest: [0],
  newTest: [1],
  iterationDescription: "001 Mul was implemented"
});
