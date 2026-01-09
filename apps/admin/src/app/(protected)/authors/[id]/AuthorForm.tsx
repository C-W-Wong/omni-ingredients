"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button, FormField } from "@/components/ui";
import { Author, updateAuthor } from "@/actions/authors";

interface AuthorFormProps {
  author: Author;
}

export function AuthorForm({ author }: AuthorFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState(author.name);
  const [slug, setSlug] = useState(author.slug);
  const [bio, setBio] = useState(author.bio || "");
  const [avatarUrl, setAvatarUrl] = useState(author.avatar_url || "");

  const handleSubmit = () => {
    setError(null);

    startTransition(async () => {
      const result = await updateAuthor(author.id, {
        name,
        slug,
        bio,
        avatar_url: avatarUrl,
      });

      if (!result.success) {
        setError(result.error || "Failed to update author");
      }
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex items-start gap-6">
        <div className="w-24 h-24 bg-gray-100 rounded-full overflow-hidden flex-shrink-0">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl font-medium">
              {name.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            required
          />
          <FormField
            label="Slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="url-slug"
            required
          />
          <div className="md:col-span-2">
            <FormField
              label="Avatar URL"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>
        </div>
      </div>

      <FormField
        as="textarea"
        label="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Author bio..."
      />

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <Button
          variant="secondary"
          onClick={() => router.push("/authors")}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          isLoading={isPending}
          disabled={!name || !slug}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
