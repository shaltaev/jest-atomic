"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Registry for all test
 */
class AtomicTestRegistry {
    constructor() {
        this.tests = {};
        this.count = 0;
    }
    addTest(testID, message, handler) {
        if (testID in this.tests) {
            return new Error("Test with this id exist");
        }
        this.tests = Object.assign({}, this.tests, { [testID]: {
                message,
                handler
            } });
        this.count += 1;
        return true;
    }
    runTests(...allTest) {
        allTest.forEach((testID) => {
            if (!(testID in this.tests)) {
                throw new Error(`Test with ID ${testID} not found`);
            }
            test(`${testID} :: ${this.tests[testID].message}`, this.tests[testID].handler);
        });
    }
}
exports.AtomicTestRegistry = AtomicTestRegistry;
function filterArrayFromOutdated(toTestShadow, outdateTest) {
    function removeAllOutdated(item) {
        return !outdateTest.includes(item);
    }
    return toTestShadow.filter(removeAllOutdated);
}
exports.iterate = (toProcess) => {
    if (toProcess.iterateID <= toProcess.currentIterate) {
        toProcess.toTestShadow = filterArrayFromOutdated(toProcess.toTestShadow, toProcess.outdateTest);
        toProcess.toTestShadow = [...toProcess.toTestShadow, ...toProcess.newTest];
    }
    if (toProcess.iterateID === toProcess.currentIterate) {
        describe(toProcess.iterationDescription, () => {
            toProcess.testRegistryShadow.runTests(...toProcess.toTestShadow);
        });
    }
    return toProcess.toTestShadow;
};
//# sourceMappingURL=AtomicTestRegistry.js.map