import Link from "next/link";
import type { Vision } from "src/contentful/getVisions";

interface VisionLinkProps {
  vision: Vision;
}

export const VisionLink = (props: VisionLinkProps) => {
  const { vision } = props;

  return (
    <Link href={`/visions/${vision.slug}`}>
      <div>
        <h2>
          <Link href={`/visions/${vision.slug}`}>{vision.title}</Link>
        </h2>
        <p>{vision.publishedAt}</p>
      </div>
    </Link>
  );
};
