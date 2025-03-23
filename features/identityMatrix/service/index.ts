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

// export const getIdentityMatrixQuery = (matrixId: string) =>
//   queryOptions({
//     queryKey: ["api", "app", "identity-matrix", "detail", matrixId],
//     queryFn: async ({ signal }) => {
//       const res = await fetch(`/api/app/identity-matrix/${matrixId}`, {
//         signal,
//         method: "GET",
//       });
//       if (!res.ok) {
//         throw new FetchError(res);
//       }
//       console.log(res.json());

//       return res.json() as Promise<IdentityMatrix[]>;
//     },
//   });

// export const getIdentityMatrixQuery = (matrixId: string) =>
//   queryOptions({
//     queryKey: ["api", "app", "identity-matrix", matrixId],
//     queryFn: async ({ signal }) => {
//       const res = await fetch(`/api/app/identity-matrix/${matrixId}`, {
//         signal,
//       });
//       if (!res.ok) {
//         throw new FetchError(res);
//       }
//       return res.json() as Promise<IdentityMatrix>;
//     },
//   });

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
