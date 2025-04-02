import { queryOptions, useMutation, useQueryClient } from "@tanstack/vue-query";
import { z } from "zod";
import type { IdentityMatrix } from "@/features/identityMatrix/model";
import { FetchError } from "@/utils/fetch";

const errorSchema = z.object({
  errors: z.array(
    z.object({
      message: z.string(),
    })
  ),
});

export const updateIdentityMatrixBodySchema = z.object({
  name: z.string().min(6).max(32),
  description: z.string().min(6).max(255),
});

export type UpdateIdentityMatrixBody = z.infer<
  typeof updateIdentityMatrixBodySchema
>;

export const useIdentityMarixMutation = () =>
  useMutation({
    mutationFn: async (data: { name: string }) => {
      const res = await fetch("/api/app/identity-matrix", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errors = errorSchema.parse(await res.json()).errors;
        throw new Error(errors.at(0)?.message);
      }
      return;
    },
  });

export const fetchIdentityMatrices = queryOptions({
  queryKey: ["api", "app", "identity-matrices"],
  queryFn: async ({ signal }) => {
    const res = await fetch("/api/app/identity-matrices", { signal });

    if (!res.ok) {
      throw new FetchError(res);
    }

    return res.json() as Promise<IdentityMatrix[]>;
  },
});

export const getIdentityMatrixQuery = (matrixId: string) =>
  queryOptions({
    queryKey: ["api", "app", "identity-matrix", matrixId],
    queryFn: async ({ signal }) => {
      const res = await fetch(`/api/app/identity-matrix/${matrixId}`, {
        signal,
      });
      if (!res.ok) {
        throw new FetchError(res);
      }
      return res.json() as Promise<IdentityMatrix>;
    },
  });

export function useDeleteIdentityMatrixMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (matrixId: string) => {
      const res = await fetch(`/api/app/identity-matrix/${matrixId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new FetchError(res);
      }
    },
    onSuccess: (_) => {
      queryClient.invalidateQueries(fetchIdentityMatrices);
      // queryClient.removeQueries(categoriesQuery(categoryId));
    },
  });
}

export function useUpdateIdentityMatrixMutation() {
  return useMutation({
    mutationFn: async (options: { body: UpdateIdentityMatrixBody }) => {
      const res = await fetch(`/api/app/identity-matrix`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options.body),
      });

      if (!res.ok) {
        throw new FetchError(res);
      }

      return res.json();
    },
  });
}
