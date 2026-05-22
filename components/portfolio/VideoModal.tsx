"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { PortfolioProject } from "@/lib/data/portfolio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getYouTubeEmbedUrl } from "@/lib/utils/video-url";

type VideoModalProps = {
  project: PortfolioProject | null;
  onClose: () => void;
};

export function VideoModal({ project, onClose }: VideoModalProps) {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [project, onClose]);

  if (!project) return null;
  const youtubeEmbedUrl = getYouTubeEmbedUrl(project.videoUrl);
  const hasPlayableVideo = Boolean(project.videoUrl?.trim());

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/75 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="max-h-[90vh] w-full max-w-4xl overflow-auto rounded-2xl bg-white p-4 sm:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
              {project.category}
            </p>
            <h3 className="text-xl font-semibold text-slate-900">{project.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{project.description}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-slate-700 hover:bg-slate-100"
            aria-label="Close video modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
          {!hasPlayableVideo ? (
            <div className="flex h-64 items-center justify-center p-6 text-center text-sm text-slate-600">
              Add a YouTube or MP4 video URL in admin to preview this project directly in the
              modal.
            </div>
          ) : youtubeEmbedUrl ? (
            <div className="aspect-video w-full">
              <iframe
                src={youtubeEmbedUrl}
                title={`${project.title} video preview`}
                className="h-full w-full"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          ) : (
            <video
              controls
              className="h-full max-h-[520px] w-full"
              preload="metadata"
              poster={project.thumbnailUrl}
              src={project.videoUrl}
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        <div className="mt-4 grid gap-2 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-700 sm:grid-cols-3">
          <p>
            <span className="font-semibold text-slate-900">Industry:</span> {project.industry}
          </p>
          <p>
            <span className="font-semibold text-slate-900">Service:</span> {project.serviceType}
          </p>
          <p>
            <span className="font-semibold text-slate-900">Duration:</span> {project.duration}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <Link href="/#contact" className="mt-5 inline-block">
          <Button size="sm">Book a Free Strategy Call</Button>
        </Link>
      </div>
    </div>
  );
}
