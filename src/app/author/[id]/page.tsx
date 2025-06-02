"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/redux/store";
import {
  fetchAuthorById,
  fetchBlogsByAuthorId,
  clearAuthor,
} from "@/src/redux/slices/authorSlice";
import { useParams, useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { BlogsGrid, BentoGridItem } from "@/components/blogsGrid";

const AuthorDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { author, status, error, blogsState } = useSelector(
    (state: RootState) => state.authorDetail
  );

  useEffect(() => {
    if (id) {
      const authorId = Number(id);
      dispatch(fetchAuthorById(authorId));
      dispatch(fetchBlogsByAuthorId(authorId));
    }

    return () => {
      dispatch(clearAuthor());
    };
  }, [dispatch, id]);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
      {/* ---------------- Author Info ---------------- */}
      {status === "loading" && (
        <div className="flex flex-col items-center space-y-6">
          <Skeleton className="w-24 h-24 rounded-full" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      )}

      {status === "failed" && (
        <p className="text-red-500 text-center font-medium">{error}</p>
      )}

      {status === "succeeded" && author && (
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage
                src={
                  author.avatarUrl ??
                  `https://api.dicebear.com/7.x/initials/svg?seed=${author.name}`
                }
                alt={author.name}
              />
              <AvatarFallback>{author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{author.name}</h2>
              <p className="text-sm text-muted-foreground">
                {author._count.blogs} Blog{author._count.blogs !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {author.bio && (
            <CardContent className="mt-6 text-gray-700 leading-relaxed">
              {author.bio}
            </CardContent>
          )}
        </Card>
      )}

      {/* ---------------- Blogs Grid ---------------- */}
      {blogsState.status === "loading" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, idx) => (
            <Skeleton key={idx} className="h-48 w-full rounded-lg" />
          ))}
        </div>
      )}

      {blogsState.status === "succeeded" && blogsState.blogs.length > 0 && (
        <BlogsGrid>
          {blogsState.blogs.map((blog) => (
            <BentoGridItem
              key={blog.id}
              title={blog.title}
              description={blog.content.slice(0, 100) + "..."}
              image={blog.coverImage || "/default.jpg"}
              onClick={() => router.push(`/blogPage/${blog.id}`)}
            />
          ))}
        </BlogsGrid>
      )}

      {blogsState.status === "succeeded" && blogsState.blogs.length === 0 && (
        <p className="text-center text-muted-foreground">No blogs found.</p>
      )}

      {blogsState.status === "failed" && (
        <p className="text-red-500 text-center font-medium">
          {blogsState.error}
        </p>
      )}
    </div>
  );
};

export default AuthorDetailsPage;
