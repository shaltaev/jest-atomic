/// <reference types="jest" />
declare type atomicTestRegistryType = {
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
export declare class AtomicTestRegistry implements atomicTestRegistryType {
    count: number;
    tests: atomicTestRegistryType["tests"];
    constructor();
    addTest(testID: number, message: string, handler: jest.ProvidesCallback): true | Error;
    runTests(...allTest: number[]): void;
}
declare type iterationFunc = (toProcess: {
    testRegistryShadow: AtomicTestRegistry;
    currentIterate: number;
    iterateID: number;
    toTestShadow: number[];
    outdateTest: number[];
    newTest: number[];
    iterationDescription: string;
}) => number[];
export declare const iterate: iterationFunc;
export {};
