import type { Asset, AssetLink } from "contentful";

/** Values from asset reference fields when using `withoutUnresolvableLinks` (resolved) or plain link stubs. */
type ContentfulImageField =
  | Asset<"WITHOUT_UNRESOLVABLE_LINKS">
  | { sys: AssetLink }
  | undefined
  | null;

// Our simplified version of an image asset.
// We don't need all the data that Contentful gives us.
export interface ContentImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

// A function to transform a Contentful image asset
// into our own ContentImage object.
export function parseContentfulContentImage(
  asset?: ContentfulImageField,
): ContentImage | null {
  if (!asset) {
    return null;
  }

  if (!("fields" in asset)) {
    return null;
  }

  return {
    id: asset.sys.id,
    src: asset.fields.file?.url || "",
    alt: asset.fields.description || "",
    width: asset.fields.file?.details.image?.width || 0,
    height: asset.fields.file?.details.image?.height || 0,
  };
}
