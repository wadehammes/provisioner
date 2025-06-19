import userEvent from "@testing-library/user-event";
import React from "react";
import { NewsletterFormPO } from "src/components/NewsletterForm/NewsletterForm.po";
import { screen, waitFor } from "src/tests/testUtils";

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

describe("NewsletterForm", () => {
  let po: NewsletterFormPO;
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    jest.clearAllMocks();
    po = new NewsletterFormPO();
    user = userEvent.setup();
  });

  it("renders input and submit button", () => {
    po.render();

    expect(screen.getByPlaceholderText(/your email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("shows error for invalid email", async () => {
    po.render();

    const emailInput = screen.getByPlaceholderText(/your email/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });

    await user.type(emailInput, "not-an-email");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/email is invalid/i)).toBeInTheDocument();
    });
  });

  it("shows error for empty email", async () => {
    po.render();

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/email is invalid/i)).toBeInTheDocument();
    });
  });

  it("shows success message on valid submit", async () => {
    po.setupApiMocks();
    po.render();

    const emailInput = screen.getByPlaceholderText(/your email/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });

    await user.type(emailInput, "test@example.com");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/thanks! we got it/i)).toBeInTheDocument();
    });
  });

  it("shows already subscribed message if status 409", async () => {
    po.setupAlreadySubscribedMocks();
    po.render();

    const emailInput = screen.getByPlaceholderText(/your email/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });

    await user.type(emailInput, "test@example.com");
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Wow! We already have you in our list/i),
      ).toBeInTheDocument();
    });
  });

  it("shows error message on API error", async () => {
    po.setupErrorMocks();
    po.render();

    const emailInput = screen.getByPlaceholderText(/your email/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });

    await user.type(emailInput, "test@example.com");
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getAllByText(/Failed to add email/i).length,
      ).toBeGreaterThan(0);
    });
  });

  it("handles unsubscribe flow", async () => {
    po.setupUnsubscribeMocks();
    po.render();

    const emailInput = screen.getByPlaceholderText(/your email/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });

    await user.type(emailInput, "test@example.com");
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Wow! We already have you in our list/i),
      ).toBeInTheDocument();
    });

    const unsubscribeButton = screen.getByRole("button", {
      name: /unsubscribe me/i,
    });
    await user.click(unsubscribeButton);

    await waitFor(() => {
      expect(
        screen.queryByText(/Wow! We already have you in our list/i),
      ).not.toBeInTheDocument();
    });
  });
});
