import { api } from "src/api/urls";
import { StartYourProjectForm } from "src/components/StartYourProjectForm/StartYourProjectForm.component";
import { BasePageObject } from "src/tests/basePageObject.po";
import { mockApiResponse } from "src/tests/mocks/mockApiResponse";
import { render } from "src/tests/testUtils";

jest.mock("src/api/urls");
const mockApi = jest.mocked(api);

export class StartYourProjectFormPO extends BasePageObject {
  public mockHubspotLeadGeneration = mockApi.hubspot.leadGeneration;
  public mockResendProjectRequest = mockApi.resend.projectRequest;

  constructor(props?: { debug?: boolean; raiseOnFind?: boolean }) {
    super(props);
  }

  setupApiMocks() {
    mockApiResponse(true, this.mockHubspotLeadGeneration);
    mockApiResponse(true, this.mockResendProjectRequest);
  }

  setupErrorMocks() {
    mockApiResponse(false, this.mockHubspotLeadGeneration);
    mockApiResponse(false, this.mockResendProjectRequest);
  }

  render() {
    return render(<StartYourProjectForm />);
  }
}
