import { cleanup } from "@testing-library/react";
import { afterEach, expect } from "vitest";
const matchers = require("@testing-library/jest-dom/matchers");

expect.extend(matchers);

afterEach(() => {
    cleanup();
});
