import userEvent from "@testing-library/user-event";
import React from "react";
import { screen, waitFor } from "src/tests/testUtils";
import { StartYourProjectFormPO } from "./StartYourProjectForm.po";

jest.mock("react-google-recaptcha", () => {
  return React.forwardRef<HTMLDivElement>((props, ref) => {
    const mockRef = {
      executeAsync: jest.fn().mockResolvedValue("mock-token"),
    };
    if (ref) {
      if (typeof ref === "function") {
        ref(mockRef as any);
      } else {
        ref.current = mockRef as any;
      }
    }
    return <div ref={ref} data-testid="recaptcha-mock" />;
  });
});

jest.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: jest.fn().mockReturnValue(null),
  }),
}));

describe("StartYourProjectForm", () => {
  let po: StartYourProjectFormPO;
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    jest.clearAllMocks();
    po = new StartYourProjectFormPO();
    user = userEvent.setup();
  });

  it("renders all form fields", () => {
    po.render();

    expect(screen.getByLabelText(/your full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your digits/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your company's name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your job title/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/tell us a little about your needs/i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/join our email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("shows error for missing required fields", async () => {
    po.render();

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/you are missing some required fields/i),
      ).toBeInTheDocument();
    });
  });

  it("shows error for invalid email format", async () => {
    po.render();

    const emailInput = screen.getByLabelText(/your email/i);
    await user.type(emailInput, "invalid-email");

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/you are missing some required fields/i),
      ).toBeInTheDocument();
    });
  });

  it("shows error for invalid phone format", async () => {
    po.render();

    const phoneInput = screen.getByLabelText(/your digits/i);
    await user.type(phoneInput, "invalid-phone");

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/you are missing some required fields/i),
      ).toBeInTheDocument();
    });
  });

  it("shows success message on valid submit", async () => {
    po.setupApiMocks();

    po.render();

    const nameInput = screen.getByLabelText(/your full name/i);
    const emailInput = screen.getByLabelText(/your email/i);
    const phoneInput = screen.getByLabelText(/your digits/i);
    const companyInput = screen.getByLabelText(/your company's name/i);
    const jobTitleInput = screen.getByLabelText(/your job title/i);
    const descriptionInput = screen.getByLabelText(
      /tell us a little about your needs/i,
    );

    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "john@example.com");
    await user.type(phoneInput, "123-456-7890");
    await user.type(companyInput, "Test Company");
    await user.type(jobTitleInput, "Developer");
    await user.type(descriptionInput, "Need help with a project");

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/thanks for the request/i)).toBeInTheDocument();
    });
  });

  it("shows error message on API error", async () => {
    po.setupErrorMocks();

    po.render();

    const nameInput = screen.getByLabelText(/your full name/i);
    const emailInput = screen.getByLabelText(/your email/i);
    const phoneInput = screen.getByLabelText(/your digits/i);
    const companyInput = screen.getByLabelText(/your company's name/i);
    const jobTitleInput = screen.getByLabelText(/your job title/i);
    const descriptionInput = screen.getByLabelText(
      /tell us a little about your needs/i,
    );

    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "john@example.com");
    await user.type(phoneInput, "123-456-7890");
    await user.type(companyInput, "Test Company");
    await user.type(jobTitleInput, "Developer");
    await user.type(descriptionInput, "Need help with a project");

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Failed to submit project request/i),
      ).toBeInTheDocument();
    });
  });

  it("handles marketing consent checkbox", async () => {
    po.setupApiMocks();

    po.render();

    const marketingConsentCheckbox = screen.getByLabelText(/join our email/i);
    expect(marketingConsentCheckbox).toBeChecked();

    await user.click(marketingConsentCheckbox);
    expect(marketingConsentCheckbox).not.toBeChecked();

    const nameInput = screen.getByLabelText(/your full name/i);
    const emailInput = screen.getByLabelText(/your email/i);
    const phoneInput = screen.getByLabelText(/your digits/i);
    const companyInput = screen.getByLabelText(/your company's name/i);
    const jobTitleInput = screen.getByLabelText(/your job title/i);
    const descriptionInput = screen.getByLabelText(
      /tell us a little about your needs/i,
    );

    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "john@example.com");
    await user.type(phoneInput, "123-456-7890");
    await user.type(companyInput, "Test Company");
    await user.type(jobTitleInput, "Developer");
    await user.type(descriptionInput, "Need help with a project");

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/thanks for the request/i)).toBeInTheDocument();
    });
  });

  it("submits with correct data", async () => {
    po.setupApiMocks();

    po.render();

    const nameInput = screen.getByLabelText(/your full name/i);
    const emailInput = screen.getByLabelText(/your email/i);
    const phoneInput = screen.getByLabelText(/your digits/i);
    const companyInput = screen.getByLabelText(/your company's name/i);
    const jobTitleInput = screen.getByLabelText(/your job title/i);
    const descriptionInput = screen.getByLabelText(
      /tell us a little about your needs/i,
    );

    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "john@example.com");
    await user.type(phoneInput, "123-456-7890");
    await user.type(companyInput, "Test Company");
    await user.type(jobTitleInput, "Developer");
    await user.type(descriptionInput, "Need help with a project");

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(po.mockHubspotLeadGeneration).toHaveBeenCalledWith({
        briefDescription: "Need help with a project",
        companyName: "Test Company",
        email: "john@example.com",
        name: "John Doe",
        phone: "123-456-7890",
        jobTitle: "Developer",
        trafficSource: "organic",
      });
    });

    await waitFor(() => {
      expect(po.mockResendProjectRequest).toHaveBeenCalledWith({
        companyName: "Test Company",
        email: "john@example.com",
        name: "John Doe",
        briefDescription: "Need help with a project",
      });
    });
  });
});
