import {
  queryOptions,
  useMutation,
  useQueryClient,
  type UseMutationReturnType,
} from "@tanstack/vue-query";
import { z } from "zod";
import type { Domain } from "@/features/domain/model";
import { FetchError } from "@/utils/fetch";

const errorSchema = z.object({
  errors: z.array(
    z.object({
      message: z.string(),
    })
  ),
});

export const updateDomainBodySchema = z.object({
  id: z.string().optional(),
  identityMatrixId: z.string(),
  name: z.string().min(6).max(32),
});

export type UpdateDomainBody = z.infer<typeof updateDomainBodySchema>;

type DeleteDomainInput = {
  domainId: string;
  identityMatrixId: string;
};

type DeleteDomainOutput = DeleteDomainInput;

export const fetchDomainsByIdentityMatrix = (matrixId: string) =>
  queryOptions({
    queryKey: ["api", "app", "identity-matrix", "domains", matrixId],
    queryFn: async ({ signal }) => {
      const res = await fetch(`/api/app/identity-matrix/${matrixId}/domains`, {
        signal,
      });

      if (!res.ok) {
        throw new FetchError(res);
      }

      return res.json() as Promise<Domain[]>;
    },
  });

export const fetchDomains = queryOptions({
  queryKey: ["api", "app", "domains"],
  queryFn: async ({ signal }) => {
    const res = await fetch("/api/app/domains", { signal });

    if (!res.ok) {
      throw new FetchError(res);
    }

    return res.json() as Promise<Domain[]>;
  },
});

export const getDomainQuery = (domainId: string) =>
  queryOptions({
    queryKey: ["api", "app", "domain", domainId],
    queryFn: async ({ signal }) => {
      const res = await fetch(`/api/app/domain/${domainId}`, {
        signal,
      });
      if (!res.ok) {
        throw new FetchError(res);
      }
      return res.json() as Promise<Domain>;
    },
  });

export function useDomainMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (options: { body: UpdateDomainBody }) => {
      const res = await fetch("/api/app/identity-matrix/domain", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options.body),
      });

      if (!res.ok) {
        const errors = errorSchema.parse(await res.json()).errors;
        throw new Error(errors.at(0)?.message);
      }

      return res.json() as Promise<Domain>;
    },
    onSuccess: async (_, domain) => {
      queryClient.invalidateQueries(
        fetchDomainsByIdentityMatrix(domain.body.identityMatrixId)
      );
    },
  });
}

export function useDeleteDomainMutation() {
  const queryClient = useQueryClient();

  const deleteDomain = async ({
    domainId,
    identityMatrixId,
  }: DeleteDomainInput): Promise<DeleteDomainOutput> => {
    const res = await fetch(`/api/app/domain/${domainId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new FetchError(res);
    }

    return { domainId, identityMatrixId };
  };

  return useMutation<DeleteDomainOutput, Error, DeleteDomainInput>({
    mutationFn: deleteDomain,
    onSuccess: (_, { identityMatrixId }) => {
      queryClient.invalidateQueries(
        fetchDomainsByIdentityMatrix(identityMatrixId)
      );
    },
  });
}
