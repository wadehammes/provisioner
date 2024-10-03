import {
  type Options,
  documentToReactComponents,
} from "@contentful/rich-text-react-renderer";
import type { Document as RichTextDocument } from "@contentful/rich-text-types";
import { replaceNbsp } from "src/utils/helpers";

const richTextParsing: Options = {
  renderText: (text) => replaceNbsp(text),
};

type RichTextProps = {
  document: RichTextDocument | null;
};

export const RichText = ({ document }: RichTextProps) => {
  if (!document) {
    return null;
  }

  return <>{documentToReactComponents(document, richTextParsing)}</>;
};
