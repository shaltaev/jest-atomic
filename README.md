# jest-atomic

This project support to contain my another js/ts projects in consistent way with TDD

## Getting Started

### Installing

Add to your nodeJS project

```sh
npm install -D jest-atomic jest @types/jest ts-jest
```

or

```sh
yarn add -D jest-atomic jest @types/jest ts-jest
```

### Usage

#### Modify jest config

add transformIgnorePatterns

```js
{
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!(jest-atomic)/)"];
}
```

or

```json (package.json -> jest config)
  "transformIgnorePatterns": ["<rootDir>/node_modules/(?!(jest-atomic)/)"];
```

#### into your app/lib

```ts
// mul.ts :: ITERATION 0
export const mul = (a: number, b: number) => {
  return new Error("No implemented yet");
};
```

```ts
// mul.ts :: ITERATION 1
export const mul = (a: number, b: number) => {
  return a * b;
};
```

#### Into your Test

```ts
// ITERATION 0
const ITERATION: number = 0;
import { AtomicTestRegistry, iterate } from "jest-atomic";

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
```

```ts
// ITERATION 1
const ITERATION: number = 1;
import { AtomicTestRegistry, iterate } from "jest-atomic";

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
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/shaltaev/jest-atomic/tags).

## Authors

- **Shaltaev** - _Initial work_ - [Shaltaev](https://github.com/shaltaev)

See also the list of [contributors](https://github.com/shaltaev/jest-atomic/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
