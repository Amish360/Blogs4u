import { getCategories } from "@/lib/content";
import DraftPreviewClient from "./DraftPreviewClient";

export default function CreateBlogPreviewPage() {
  const categories = getCategories();
  return <DraftPreviewClient categories={categories} />;
}
