"use client";

import { useEffect, useMemo, useState } from "react";
import { portfolioCategories } from "@/lib/data/portfolio";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type AdminProject = {
  id: string;
  title: string;
  slug: string;
  category: string;
  industry: string | null;
  serviceType: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  cloudinaryPublicId: string | null;
  duration: string | null;
  tags: string[];
  isFeatured: boolean;
  sortOrder: number;
};

type ProjectForm = {
  title: string;
  slug: string;
  category: string;
  industry: string;
  serviceType: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  cloudinaryPublicId: string;
  duration: string;
  tagsText: string;
  isFeatured: boolean;
  sortOrder: number;
};

const categoryOptions = portfolioCategories.filter((category) => category !== "All");

const defaultForm: ProjectForm = {
  title: "",
  slug: "",
  category: categoryOptions[0] ?? "Website Projects",
  industry: "",
  serviceType: "",
  description: "",
  thumbnailUrl: "",
  videoUrl: "",
  cloudinaryPublicId: "",
  duration: "",
  tagsText: "",
  isFeatured: false,
  sortOrder: 0
};

function toForm(project: AdminProject): ProjectForm {
  return {
    title: project.title,
    slug: project.slug,
    category: project.category,
    industry: project.industry ?? "",
    serviceType: project.serviceType,
    description: project.description,
    thumbnailUrl: project.thumbnailUrl,
    videoUrl: project.videoUrl,
    cloudinaryPublicId: project.cloudinaryPublicId ?? "",
    duration: project.duration ?? "",
    tagsText: project.tags.join(", "),
    isFeatured: project.isFeatured,
    sortOrder: project.sortOrder
  };
}

function parseTags(tagsText: string) {
  return tagsText
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

type ApiResult = {
  success: boolean;
  message?: string;
  projects?: AdminProject[];
  project?: AdminProject;
};

export function AdminPortfolioManager() {
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [form, setForm] = useState<ProjectForm>(defaultForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "idle" | "success" | "error"; message: string }>({
    type: "idle",
    message: ""
  });

  const sortedProjects = useMemo(
    () => [...projects].sort((a, b) => a.sortOrder - b.sortOrder),
    [projects]
  );

  const setValue = <K extends keyof ProjectForm>(key: K, value: ProjectForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(defaultForm);
  };

  const reloadProjects = async () => {
    const response = await fetch("/api/admin/video-projects", { cache: "no-store" });
    const result = (await response.json()) as ApiResult;
    if (response.ok && result.success && result.projects) {
      setProjects(result.projects);
    }
  };

  useEffect(() => {
    void reloadProjects();
  }, []);

  const submitProject = async () => {
    setLoading(true);
    setStatus({ type: "idle", message: "" });

    const payload = {
      ...form,
      tags: parseTags(form.tagsText),
      sortOrder: Number(form.sortOrder)
    };

    const isEdit = Boolean(editingId);
    const url = isEdit ? `/api/admin/video-projects/${editingId}` : "/api/admin/video-projects";
    const method = isEdit ? "PATCH" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = (await response.json()) as ApiResult;

      if (!response.ok || !result.success) {
        setStatus({
          type: "error",
          message: result.message ?? "Unable to save project."
        });
        return;
      }

      await reloadProjects();
      resetForm();
      setStatus({
        type: "success",
        message: isEdit ? "Project updated." : "Project created."
      });
    } catch {
      setStatus({ type: "error", message: "Network error while saving project." });
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (projectId: string) => {
    const confirmed = window.confirm("Delete this project?");
    if (!confirmed) return;

    setLoading(true);
    setStatus({ type: "idle", message: "" });
    try {
      const response = await fetch(`/api/admin/video-projects/${projectId}`, {
        method: "DELETE"
      });
      const result = (await response.json()) as ApiResult;

      if (!response.ok || !result.success) {
        setStatus({
          type: "error",
          message: result.message ?? "Unable to delete project."
        });
        return;
      }

      await reloadProjects();
      if (editingId === projectId) {
        resetForm();
      }
      setStatus({ type: "success", message: "Project deleted." });
    } catch {
      setStatus({ type: "error", message: "Network error while deleting project." });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4">
        <h1 className="text-2xl font-bold text-slate-900">Admin Video Projects</h1>
        <Button variant="outline" onClick={signOut}>
          Sign out
        </Button>
      </div>

      <Card className="border-slate-200 bg-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-slate-900">
              {editingId ? "Edit Project" : "Add New Project"}
            </h2>
            {editingId ? (
              <Button variant="ghost" onClick={resetForm}>
                Cancel edit
              </Button>
            ) : null}
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Title</label>
              <Input value={form.title} onChange={(e) => setValue("title", e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Slug</label>
              <Input value={form.slug} onChange={(e) => setValue("slug", e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Category</label>
              <Select value={form.category} onChange={(e) => setValue("category", e.target.value)}>
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Industry</label>
              <Input value={form.industry} onChange={(e) => setValue("industry", e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Service Type</label>
              <Input
                value={form.serviceType}
                onChange={(e) => setValue("serviceType", e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Duration (optional)
              </label>
              <Input value={form.duration} onChange={(e) => setValue("duration", e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Thumbnail URL</label>
              <Input
                value={form.thumbnailUrl}
                onChange={(e) => setValue("thumbnailUrl", e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Video URL</label>
              <Input value={form.videoUrl} onChange={(e) => setValue("videoUrl", e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Cloudinary Public ID (optional)
              </label>
              <Input
                value={form.cloudinaryPublicId}
                onChange={(e) => setValue("cloudinaryPublicId", e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Sort Order (number)
              </label>
              <Input
                type="number"
                value={String(form.sortOrder)}
                onChange={(e) => setValue("sortOrder", Number(e.target.value))}
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Description
              </label>
              <Textarea
                value={form.description}
                onChange={(e) => setValue("description", e.target.value)}
                className="min-h-[120px]"
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Tags (comma separated)
              </label>
              <Input value={form.tagsText} onChange={(e) => setValue("tagsText", e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) => setValue("isFeatured", e.target.checked)}
                />
                Show in featured portfolio section
              </label>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <Button disabled={loading} onClick={submitProject}>
              {loading ? "Saving..." : editingId ? "Update Project" : "Create Project"}
            </Button>
            <Button type="button" variant="outline" onClick={resetForm} disabled={loading}>
              Reset
            </Button>
          </div>

          {status.type !== "idle" ? (
            <p className={`mt-3 text-sm ${status.type === "success" ? "text-emerald-600" : "text-red-600"}`}>
              {status.message}
            </p>
          ) : null}
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {sortedProjects.map((project) => (
          <Card key={project.id} className="border-slate-200 bg-white">
            <CardContent className="pt-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{project.title}</h3>
                  <p className="text-sm text-slate-600">
                    {project.category} | {project.serviceType} | sort: {project.sortOrder}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{project.slug}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingId(project.id);
                      setForm(toForm(project));
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={() => deleteProject(project.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
