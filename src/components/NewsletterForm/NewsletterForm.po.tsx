import { mocked } from "jest-mock";
import { api } from "src/api/urls";
import NewsletterForm from "src/components/NewsletterForm/NewsletterForm.component";
import {
  BasePageObject,
  type BasePageObjectProps,
} from "src/tests/basePageObject.po";
import { executeAsyncMock } from "src/tests/mocks/mockGoogleRecaptcha";
import { render } from "src/tests/testUtils";

jest.mock("src/api/urls");
const mockNewsletterApi = mocked(api.resend.newsletter);
const mockSendWelcomeEmailApi = mocked(api.resend.welcome);

jest.mock("react-google-recaptcha");

export class NewsletterFormPageObject extends BasePageObject {
  public mockNewsletterAddApi = mockNewsletterApi;
  public mockSendWelcomeEmailApi = mockSendWelcomeEmailApi;
  public executeAsyncMock = executeAsyncMock;

  constructor(
    { debug, raiseOnFind }: BasePageObjectProps = {
      debug: false,
      raiseOnFind: false,
    },
  ) {
    super({ debug, raiseOnFind });

    jest.resetAllMocks();
  }

  // Actions
  renderNewsletterForm() {
    this.executeAsyncMock.mockResolvedValue("fake-token");

    render(<NewsletterForm />);
  }
}
