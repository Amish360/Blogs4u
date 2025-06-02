"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/redux/store";
import { fetchAuthorById, clearAuthor } from "@/src/redux/slices/authorSlice";
import { useParams } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const AuthorDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { author, status, error } = useSelector(
    (state: RootState) => state.authorDetail
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchAuthorById(Number(id)));
    }

    return () => {
      dispatch(clearAuthor());
    };
  }, [dispatch, id]);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
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
    </div>
  );
};

export default AuthorDetailsPage;
