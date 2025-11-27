"use client";

import React from "react";

interface LinkData {
  title: string;
  summary: string;
  bulletPoints: string[];
  url: string;
  dateAdded: string;
}

function LinkCard({ link, onDelete }: { link: LinkData; onDelete: (url: string) => void }) {
  const [deleting, setDeleting] = React.useState(false);

  const handleClick = () => {
    window.open(link.url, "_blank", "noopener,noreferrer");
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this link?")) return;

    setDeleting(true);
    onDelete(link.url);
  };

  return (
    <div className="bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow group relative">
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
        title="Delete link"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
      <h3 className="text-lg font-semibold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors pr-8">
        {link.title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-3">
        {link.summary}
      </p>
      {link.bulletPoints && link.bulletPoints.length > 0 && (
        <ul className="list-disc list-inside text-gray-600 text-sm mb-4 space-y-1">
          {link.bulletPoints.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      )}
      <button
        onClick={handleClick}
        className="flex items-center text-blue-500 text-sm font-medium hover:text-blue-700 transition-colors"
      >
        <span>Visit Link</span>
        <svg
          className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </button>
      <p className="text-xs text-gray-400 mt-3">
        Added: {new Date(link.dateAdded).toLocaleDateString()}
      </p>
    </div>
  );
}

export default function Links() {
  const [links, setLinks] = React.useState<LinkData[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [newUrl, setNewUrl] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");

  const loadLinks = React.useCallback(async () => {
    try {
      const response = await fetch("/api/links");
      if (response.ok) {
        const loadedLinks = await response.json();
        // Sort by date, newest first
        loadedLinks.sort(
          (a: LinkData, b: LinkData) =>
            new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        );
        setLinks(loadedLinks);
      }
    } catch (err) {
      console.error("Failed to load links:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadLinks();
  }, [loadLinks]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) return;

    setSubmitting(true);
    setError("");

    try {
      // Basic validation
      const url = new URL(newUrl);

      const linkData: LinkData = {
        title: url.hostname,
        summary: "Click to visit link",
        bulletPoints: [],
        url: newUrl,
        dateAdded: new Date().toISOString(),
      };

      const response = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(linkData),
      });

      if (response.ok) {
        // Reload links
        await loadLinks();
        setNewUrl("");
      } else {
        setError("Failed to add link");
      }
    } catch (err) {
      setError("Failed to add link - invalid URL");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (url: string) => {
    try {
      const response = await fetch("/api/links", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        await loadLinks();
      } else {
        console.error("Failed to delete link");
      }
    } catch (err) {
      console.error("Failed to delete link:", err);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Links</h1>
        <p className="text-sm text-gray-500 mb-4">Version: 1.0 | Last Updated: 2025-11-25</p>
        <p className="text-gray-600 mb-6">
          A curated collection of resources, tools, and organizations relevant
          to water management and development.
        </p>

        {/* Add Link Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border rounded-lg p-4 mb-6"
        >
          <label
            htmlFor="newUrl"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Add New Link
          </label>
          <div className="flex gap-3">
            <input
              type="url"
              id="newUrl"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="https://example.com/article"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              disabled={submitting}
            />
            <button
              type="submit"
              disabled={submitting || !newUrl.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {submitting ? "Adding..." : "Add Link"}
            </button>
          </div>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          <p className="text-xs text-gray-500 mt-2">
            Paste a URL to automatically save it. You can edit the summary and
            bullet points in the JSON file.
          </p>
        </form>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading links...</div>
        </div>
      ) : links.length === 0 ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
          <p className="text-gray-600">No links yet. Add your first link above!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((link, index) => (
            <LinkCard key={index} link={link} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
