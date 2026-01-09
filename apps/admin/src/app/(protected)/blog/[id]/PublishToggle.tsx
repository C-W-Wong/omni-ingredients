"use client";

import { useState, useTransition } from "react";
import { publishBlogPost, unpublishBlogPost } from "@/actions/blog";
import { Button, StatusBadge } from "@/components/ui";

interface PublishToggleProps {
  postId: string;
  isPublished: boolean;
}

export function PublishToggle({ postId, isPublished: initialPublished }: PublishToggleProps) {
  const [isPublished, setIsPublished] = useState(initialPublished);
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      const result = isPublished
        ? await unpublishBlogPost(postId)
        : await publishBlogPost(postId);

      if (result.success) {
        setIsPublished(!isPublished);
      }
    });
  };

  return (
    <div className="flex items-center gap-4">
      <StatusBadge status={isPublished ? "published" : "draft"} />
      <Button
        size="sm"
        variant={isPublished ? "secondary" : "primary"}
        onClick={handleToggle}
        isLoading={isPending}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
    </div>
  );
}
