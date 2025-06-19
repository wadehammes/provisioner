import type { MockedFunction } from "jest-mock";
import { mockApiResponse } from "src/tests/mocks/mockApiResponse";

interface MockResponse {
  status: number;
  ok: boolean;
  json: () => Promise<Record<string, unknown>>;
  text: () => Promise<string>;
}

// Create a mock Response object that works in the test environment
const createMockResponse = (
  status: number,
  body?: Record<string, unknown>,
): MockResponse => {
  return {
    status,
    ok: status >= 200 && status < 300,
    json: async () => body || {},
    text: async () => JSON.stringify(body || {}),
  };
};

export const mockSuccessfulApiCall = <
  T extends (...args: unknown[]) => unknown,
>(
  apiFunction: MockedFunction<T>,
) => {
  mockApiResponse(
    true,
    apiFunction,
    createMockResponse(200),
    new Error("API error"),
  );
};

export const mockFailedApiCall = <T extends (...args: unknown[]) => unknown>(
  apiFunction: MockedFunction<T>,
) => {
  mockApiResponse(
    false,
    apiFunction,
    createMockResponse(200),
    new Error("API error"),
  );
};

export const mockApiCallWithStatus = <
  T extends (...args: unknown[]) => unknown,
>(
  apiFunction: MockedFunction<T>,
  status: number,
  body?: Record<string, unknown>,
) => {
  mockApiResponse(
    true,
    apiFunction,
    createMockResponse(status, body),
    new Error("API error"),
  );
};
