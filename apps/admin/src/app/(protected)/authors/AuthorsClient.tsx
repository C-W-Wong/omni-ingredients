"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button, FormField, ConfirmDialog } from "@/components/ui";
import { Author, createAuthor, deleteAuthor } from "@/actions/authors";

interface AuthorsClientProps {
  initialAuthors: Author[];
}

export function AuthorsClient({ initialAuthors }: AuthorsClientProps) {
  const router = useRouter();
  const [authors, setAuthors] = useState(initialAuthors);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const resetForm = () => {
    setName("");
    setSlug("");
    setBio("");
    setAvatarUrl("");
    setIsCreating(false);
    setError(null);
  };

  const generateSlug = (text: string) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  };

  const handleNameChange = (value: string) => {
    setName(value);
    setSlug(generateSlug(value));
  };

  const handleCreate = () => {
    startTransition(async () => {
      const result = await createAuthor({ name, slug, bio, avatar_url: avatarUrl });
      if (result.success && result.id) {
        router.push(`/authors/${result.id}`);
      } else {
        setError(result.error || "Failed to create author");
      }
    });
  };

  const handleDelete = () => {
    if (!deleteId) return;

    startTransition(async () => {
      const result = await deleteAuthor(deleteId);
      if (result.success) {
        setAuthors(authors.filter((a) => a.id !== deleteId));
        setDeleteId(null);
      } else {
        setError(result.error || "Failed to delete author");
        setDeleteId(null);
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Authors</h2>
          <p className="text-sm text-gray-500">Manage blog post authors</p>
        </div>
        {!isCreating && (
          <Button onClick={() => setIsCreating(true)}>
            <PlusIcon className="w-4 h-4" />
            Add Author
          </Button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {isCreating && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">New Author</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Name"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
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
            <FormField
              label="Avatar URL"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://..."
            />
            <div className="md:col-span-2">
              <FormField
                as="textarea"
                label="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Author bio..."
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="secondary" onClick={resetForm} disabled={isPending}>
              Cancel
            </Button>
            <Button onClick={handleCreate} isLoading={isPending} disabled={!name || !slug}>
              Create Author
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {authors.length === 0 ? (
          <div className="col-span-full bg-white rounded-lg border border-gray-200 p-12 text-center text-gray-500">
            No authors yet. Add your first author.
          </div>
        ) : (
          authors.map((author) => (
            <div
              key={author.id}
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => router.push(`/authors/${author.id}`)}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden flex-shrink-0">
                  {author.avatar_url ? (
                    <img
                      src={author.avatar_url}
                      alt={author.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-lg font-medium">
                      {author.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{author.name}</p>
                  <p className="text-sm text-gray-500 truncate">{author.slug}</p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteId(author.id);
                  }}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  Delete
                </Button>
              </div>
              {author.bio && (
                <p className="mt-3 text-sm text-gray-600 line-clamp-2">{author.bio}</p>
              )}
            </div>
          ))
        )}
      </div>

      <ConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Author"
        message="Are you sure you want to delete this author?"
        confirmLabel="Delete"
        isLoading={isPending}
      />
    </div>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );
}
