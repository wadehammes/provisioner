import { faker } from "@faker-js/faker";
import userEvent from "@testing-library/user-event";
import { NewsletterFormPageObject } from "src/components/NewsletterForm/NewsletterForm.po";
import { screen, waitFor } from "src/tests/testUtils";

let po: NewsletterFormPageObject;

describe("NewsletterForm", () => {
  beforeEach(() => {
    po = new NewsletterFormPageObject();
  });

  it("should render the newsletter form", () => {
    po.renderNewsletterForm();

    const submitButton = screen.getByRole("button", { name: "Submit" });
    const emailInput = screen.getByRole("textbox", {
      name: "Drop your email and we'll stay in touch.",
    });

    expect(emailInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("should submit the newsletter form", async () => {
    po.renderNewsletterForm();

    const email = faker.internet.email();
    const submitButton = screen.getByRole("button", { name: "Submit" });
    const emailInput = screen.getByRole("textbox", {
      name: "Drop your email and we'll stay in touch.",
    });

    expect(emailInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    userEvent.setup();

    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, email);
    await userEvent.click(submitButton);

    expect(
      screen.queryByRole("button", { name: "Submit" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("textbox", {
        name: "Drop your email and we'll stay in touch.",
      }),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Thanks! We got it.")).toBeInTheDocument();
  });
});
