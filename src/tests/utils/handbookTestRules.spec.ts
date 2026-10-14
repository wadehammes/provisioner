import {
  collectHandbookTestViolations,
  formatHandbookTestViolations,
  isFeatureTestFile,
  isHandbookTestRulesAllowlisted,
  validateFeatureTestSource,
} from "src/tests/utils/handbookTestRules";

describe("handbookTestRules", () => {
  it("identifies feature test files and handbook rules spec allowlist paths", () => {
    expect(
      isFeatureTestFile(
        "src/components/NewsletterForm/NewsletterForm.spec.tsx",
      ),
    ).toBe(true);
    expect(
      isFeatureTestFile(
        "src/components/StartYourProjectForm/StartYourProjectForm.component.spec.tsx",
      ),
    ).toBe(true);
    expect(isFeatureTestFile("src/tests/utils/handbookTestRules.ts")).toBe(
      false,
    );

    expect(
      isHandbookTestRulesAllowlisted(
        "src/tests/utils/handbookTestRules.spec.ts",
      ),
    ).toBe(true);
    expect(
      isHandbookTestRulesAllowlisted(
        "src/components/NewsletterForm/NewsletterForm.spec.tsx",
      ),
    ).toBe(false);
  });

  it("flags specs under src/hooks/mutations or src/hooks/queries", () => {
    const violations = validateFeatureTestSource(
      "src/hooks/mutations/useSendProjectRequestEmailApi.mutation.spec.ts",
      `describe("useSendProjectRequestEmailApi", () => {});\n`,
    );

    expect(violations).toEqual([
      expect.objectContaining({
        line: 1,
        rule: "forbidden-hook-layer-spec",
      }),
    ]);
  });

  it("flags jest.mock on src/hooks/mutations in feature tests", () => {
    const violations = validateFeatureTestSource(
      "src/components/StartYourProjectForm/StartYourProjectForm.component.spec.tsx",
      `jest.mock("src/hooks/mutations/useSendProjectRequestEmailApi.mutation");\n`,
    );

    expect(violations).toEqual([
      expect.objectContaining({
        line: 1,
        rule: "jest-mock-mutation-hook",
      }),
    ]);
  });

  it("flags jest.mock on src/hooks/queries in feature tests", () => {
    const violations = validateFeatureTestSource(
      "src/components/NewsletterForm/NewsletterForm.spec.tsx",
      `jest.mock("src/hooks/queries/useExample.query");\n`,
    );

    expect(violations).toEqual([
      expect.objectContaining({
        line: 1,
        rule: "jest-mock-query-hook",
      }),
    ]);
  });

  it("keeps feature tests free of handbook testing violations", () => {
    const violations = collectHandbookTestViolations(process.cwd());

    expect(violations).toEqual([]);
  });

  it("formats violations for hook and CI output", () => {
    const formatted = formatHandbookTestViolations([
      {
        excerpt: 'jest.mock("src/hooks/queries/useExample.query");',
        filePath: "src/components/NewsletterForm/NewsletterForm.spec.tsx",
        line: 12,
        message: "Do not jest.mock query hooks.",
        rule: "jest-mock-query-hook",
      },
    ]);

    expect(formatted).toContain("[jest-mock-query-hook]");
    expect(formatted).toContain("NewsletterForm.spec.tsx:12");
  });
});
