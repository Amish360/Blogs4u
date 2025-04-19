"use client";
import CommunityCard from "@/components/communityCard";
import { useRouter } from "next/navigation";

const communities = [
  {
    name: "Tech",
    image: "https://source.unsplash.com/600x400/?technology",
  },
  {
    name: "Gaming",
    image: "https://source.unsplash.com/600x400/?gaming",
  },
  {
    name: "Sports",
    image: "https://source.unsplash.com/600x400/?music",
  },
];

export default function CommunitySection() {
  const router = useRouter();

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 p-2">
      {communities.map((comm) => (
        <CommunityCard
          key={comm.name}
          name={comm.name}
          image={comm.image}
          onClick={() => router.push(`/Community/${comm.name.toLowerCase()}`)}
        />
      ))}
    </div>
  );
}
