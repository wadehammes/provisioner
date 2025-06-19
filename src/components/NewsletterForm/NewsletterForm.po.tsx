import { api } from "src/api/urls";
import { BasePageObject } from "src/tests/basePageObject.po";
import { mockApiResponse } from "src/tests/mocks/mockApiResponse";
import { render } from "src/tests/testUtils";
import NewsletterForm from "./NewsletterForm.component";

jest.mock("src/api/urls");
const mockApi = jest.mocked(api);

export class NewsletterFormPO extends BasePageObject {
  public mockNewsletter = mockApi.resend.newsletter;
  public mockWelcome = mockApi.resend.welcome;
  public mockUnsubscribe = mockApi.resend.unsubscribe;

  constructor(props?: { debug?: boolean; raiseOnFind?: boolean }) {
    super(props);
  }

  setupApiMocks() {
    mockApiResponse(true, this.mockNewsletter);
    mockApiResponse(true, this.mockWelcome);
  }

  setupAlreadySubscribedMocks() {
    // Mock a successful response with 409 status
    this.mockNewsletter.mockResolvedValue({
      ok: true,
      status: 409,
      json: async () => ({ message: "contact already exists in Resend" }),
    } as Response);
  }

  setupUnsubscribeMocks() {
    this.setupAlreadySubscribedMocks();
    mockApiResponse(true, this.mockUnsubscribe);
  }

  setupErrorMocks() {
    this.mockNewsletter.mockRejectedValue(
      new Error("Failed to add email to newsletter list. Please try again."),
    );
  }

  render() {
    return render(<NewsletterForm />);
  }
}
