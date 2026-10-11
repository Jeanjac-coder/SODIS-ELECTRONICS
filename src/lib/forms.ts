"use client";

import { useMutation } from "@tanstack/react-query";
import type { FormKind } from "./schemas";

export type FormResult = { ok: boolean; ref?: string; delivered?: boolean; error?: string };

export async function submitForm(kind: FormKind, data: unknown): Promise<FormResult> {
  const res = await fetch("/api/forms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ kind, data }),
  });
  const json = (await res.json().catch(() => ({ ok: false }))) as FormResult;
  if (!res.ok || !json.ok) throw new Error(json.error ?? "Envoi impossible, réessayez.");
  return json;
}

export const useFormSubmit = (kind: FormKind) => useMutation({ mutationFn: (data: unknown) => submitForm(kind, data) });
