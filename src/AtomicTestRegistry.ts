type atomicTestRegistryType = {
  tests: {
    [testID: number]: {
      message: string;
      handler: jest.ProvidesCallback;
    };
  };
  count: number;

  addTest(testID: number, message: string, handler: Function): true | Error;
  runTests(...allTest: number[]): void;
};

/**
 * Registry for all test
 */
export class AtomicTestRegistry implements atomicTestRegistryType {
  count: number;
  tests: atomicTestRegistryType["tests"];
  constructor() {
    this.tests = {};
    this.count = 0;
  }

  addTest(
    testID: number,
    message: string,
    handler: jest.ProvidesCallback
  ): true | Error {
    if (testID in this.tests) {
      return new Error("Test with this id exist");
    }

    this.tests = {
      ...this.tests,
      [testID]: {
        message,
        handler
      }
    };
    this.count += 1;

    return true;
  }

  runTests(...allTest: number[]): void {
    allTest.forEach((testID: number) => {
      if (!(testID in this.tests)) {
        throw new Error(`Test with ID ${testID} not found`);
      }

      test(
        `${testID} :: ${this.tests[testID].message}`,
        this.tests[testID].handler
      );
    });
  }
}

function filterArrayFromOutdated(
  toTestShadow: number[],
  outdateTest: number[]
): number[] {
  function removeAllOutdated(item: number): boolean {
    return !outdateTest.includes(item);
  }

  return toTestShadow.filter(removeAllOutdated);
}

type iterationFunc = (toProcess: {
  testRegistryShadow: AtomicTestRegistry;
  currentIterate: number;
  iterateID: number;
  toTestShadow: number[];
  outdateTest: number[];
  newTest: number[];
  iterationDescription: string;
}) => number[];

export const iterate: iterationFunc = (toProcess: {
  testRegistryShadow: AtomicTestRegistry;
  currentIterate: number;
  iterateID: number;
  toTestShadow: number[];
  outdateTest: number[];
  newTest: number[];
  iterationDescription: string;
}): number[] => {
  if (toProcess.iterateID <= toProcess.currentIterate) {
    toProcess.toTestShadow = filterArrayFromOutdated(
      toProcess.toTestShadow,
      toProcess.outdateTest
    );
    toProcess.toTestShadow = [...toProcess.toTestShadow, ...toProcess.newTest];
  }

  if (toProcess.iterateID === toProcess.currentIterate) {
    describe(toProcess.iterationDescription, () => {
      toProcess.testRegistryShadow.runTests(...toProcess.toTestShadow);
    });
  }

  return toProcess.toTestShadow;
};
