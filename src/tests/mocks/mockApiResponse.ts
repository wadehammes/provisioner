// biome-ignore lint/suspicious/noExplicitAny: generic utility for any function signature
export function mockApiResponse(
  responseResult: boolean | boolean[],
  // biome-ignore lint/suspicious/noExplicitAny: accept any Jest mock function
  mockApiEndpoint: any,
  // biome-ignore lint/suspicious/noExplicitAny: resolvedResponse can be any type
  resolvedResponse?: Awaited<any>,
  // biome-ignore lint/suspicious/noExplicitAny: rejectedResponse can be any type
  rejectedResponse?: Awaited<any>,
) {
  const responseResults =
    typeof responseResult === "boolean" ? [responseResult] : responseResult;

  // Create mock Response objects that work in test environment
  const createMockResponse = (
    status: number,
    body: Record<string, unknown>,
  ) => ({
    status,
    ok: status >= 200 && status < 300,
    json: async () => body,
    text: async () => JSON.stringify(body),
  });

  // Default responses that match actual API responses
  const defaultResolvedResponse =
    resolvedResponse ||
    createMockResponse(200, {
      message: "Success",
      status: 200,
      id: "mock-response-id",
    });
  const defaultRejectedResponse =
    rejectedResponse ||
    createMockResponse(500, {
      error: "API error",
      status: 500,
    });

  responseResults.forEach((result, index) => {
    const isLast = index === responseResults.length - 1;

    if (result) {
      if (isLast) {
        mockApiEndpoint.mockResolvedValue(defaultResolvedResponse);
      } else {
        mockApiEndpoint.mockResolvedValueOnce(defaultResolvedResponse);
      }
    } else if (isLast) {
      mockApiEndpoint.mockRejectedValue(defaultRejectedResponse);
    } else {
      mockApiEndpoint.mockRejectedValueOnce(defaultRejectedResponse);
    }
  });
}
