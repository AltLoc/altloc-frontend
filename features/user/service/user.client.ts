import { queryOptions, useMutation, useQueryClient } from "@tanstack/vue-query";
import type { User } from "@/features/user/model";
import { refresh } from "@/utils/refresh";
import { z } from "zod";
import { FetchError } from "@/utils/fetch";

const errorSchema = z.object({
  errors: z.array(
    z.object({
      message: z.string(),
    })
  ),
});

export const updateUserBodySchema = z.object({
  id: z.string().optional(),
  username: z.string().min(6).max(32),
  avatar: z
    .instanceof(File)
    .refine((file) => file.size < 4 * 1024 * 1024, {
      message: "The image is too large, max size is 4 MB",
    })
    .refine((file) => file.type.startsWith("image/"), {
      message: "The file must be an image",
    })
    .optional(),
  avatarKey: z.string().optional(),
});

export type UpdateUserBody = z.infer<typeof updateUserBodySchema>;

export const getMeQueryOptions = queryOptions({
  queryKey: ["secured", "me"] as const,
  queryFn: async () => {
    const user = await refresh<User>("/api/secured/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!user) {
      throw new Error("User data is undefined.");
    }

    return user;
  },
});

export const useUpdateCurrentUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: (typeof updateUserBodySchema)["_output"]) => {
      const formData = new FormData();
      Object.entries(body).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value);
        }
      });

      const res = await fetch("/api/secured/user/profile", {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        throw new FetchError(res);
      }

      if (!res.ok) {
        const errors = errorSchema.parse(await res.json()).errors;
        throw new Error(errors.at(0)?.message);
      }
      return res.json() as Promise<User>;
    },
    onSuccess: (_) => {
      queryClient.invalidateQueries(getMeQueryOptions);
      // queryClient.removeQueries(categoriesQuery(categoryId));
    },
  });
};
