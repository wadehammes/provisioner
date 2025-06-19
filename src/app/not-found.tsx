import { NotFoundPage } from "src/components/NotFoundPage/NotFoundPage.component";
import { PageLayout } from "src/components/PageLayout/PageLayout.component";

export const dynamic = "force-static";

export default function NotFound() {
  return (
    <PageLayout>
      <NotFoundPage />
    </PageLayout>
  );
}
