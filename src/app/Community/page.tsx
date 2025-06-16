import CommunityCard from "@/components/communityCard";
import { getCategories } from "@/lib/content";

export default function CommunitySection() {
  const categories = getCategories();

  return (
    <div className="p-8 bg-[var(--paper)]">
      <h1 className="font-serif text-4xl font-semibold text-[var(--ink)] mb-8 text-center">
        Communities
      </h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 p-2">
        {categories.map((category) => (
          <CommunityCard
            key={category.id}
            name={category.name}
            image={category.image}
            href={`/Community/${category.slug}`}
          />
        ))}
      </div>
    </div>
  );
}
