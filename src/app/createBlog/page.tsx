import { getCategories } from "@/lib/content";
import CreateBlogForm from "./CreateBlogForm";

export default function CreateBlogPage() {
  const categories = getCategories();

  return <CreateBlogForm categories={categories} />;
}
