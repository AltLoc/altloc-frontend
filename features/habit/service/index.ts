import { queryOptions, useMutation, useQueryClient } from "@tanstack/vue-query";
import { z } from "zod";
import type { Habit } from "@/features/habit/model";
import { FetchError } from "@/utils/fetch";

const errorSchema = z.object({
  errors: z.array(
    z.object({
      message: z.string(),
    })
  ),
});

export const updateHabitBodySchema = z.object({
  id: z.string().optional(),
  domainId: z.string(),
  name: z.string().min(6).max(32),
  runtime: z.number().min(1).max(18000),
  targetNumberOfCompletions: z.number().min(1).max(10000),
  dayPart: z.enum(["MORNING", "AFTERNOON", "EVENING", "NIGHT"]),
});

export type UpdateHabitBody = z.infer<typeof updateHabitBodySchema>;

export const fetchHabitDayPartSchema = z.object({
  dayPart: z.enum(["MORNING", "AFTERNOON", "EVENING", "NIGHT"]),
});

export type fetchHabitDayPartBody = z.infer<typeof fetchHabitDayPartSchema>;

export const completedHabitBodySchema = z.object({
  habitId: z.string(),
  domainId: z.string(),
  userId: z.string(),
});
export type CompletedHabitBody = z.infer<typeof completedHabitBodySchema>;

export const fetchHabitsByDomain = (domainId: string) =>
  queryOptions({
    queryKey: ["api", "app", "domain", "habits", domainId],
    queryFn: async ({ signal }) => {
      const res = await fetch(`/api/app/domain/${domainId}/habits`, {
        signal,
      });

      if (!res.ok) {
        throw new FetchError(res);
      }

      return res.json() as Promise<Habit[]>;
    },
  });

export const fetchHabit = (habitId: string) =>
  queryOptions({
    queryKey: ["api", "app", "habits", habitId],
    queryFn: async ({ signal }) => {
      const res = await fetch(`/api/app/habit/${habitId}`, {
        signal,
      });

      if (!res.ok) {
        throw new FetchError(res);
      }

      return res.json() as Promise<Habit>;
    },
  });

export function useCreateHabitMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (options: { body: UpdateHabitBody }) => {
      const res = await fetch("/api/app/domain/habit", {
        method: "POST",
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
      return res.json() as Promise<Habit>;
    },
    onSuccess: async (_, domain) => {
      queryClient.invalidateQueries(fetchHabitsByDomain(domain.body.domainId));
    },
  });
}

export function useUpdateHabitMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (options: { body: UpdateHabitBody }) => {
      console.log("Updating habit", options.body);
      const res = await fetch(`/api/app/domain/habit/${options.body.id}`, {
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
      return res.json() as Promise<Habit>;
    },
    onSuccess: async (_, domain) => {
      queryClient.invalidateQueries(fetchHabitsByDomain(domain.body.domainId));
    },
  });
}

export const fetchHabitsByDayPart = (dayPart: Ref<string>) =>
  queryOptions({
    queryKey: computed(() => [
      "api",
      "app",
      "habits",
      "daypart",
      dayPart.value,
    ]),
    queryFn: async ({ signal }) => {
      const res = await fetch(`/api/app/habits/day-part/${dayPart.value}`, {
        signal,
      });

      if (!res.ok) {
        throw new FetchError(res);
      }

      return res.json() as Promise<Habit[]>;
    },
  });

export const fetchHabits = queryOptions({
  queryKey: ["api", "app", "habits"],
  queryFn: async ({ signal }) => {
    const res = await fetch("/api/app/habits", { signal });

    if (!res.ok) {
      throw new FetchError(res);
    }

    return res.json() as Promise<Habit[]>;
  },
});

type DeleteHabitRaw = {
  habitId: string;
  domainId: string;
};

export function useDeleteHabitMutation() {
  const queryClient = useQueryClient();

  const deleteHabit = async ({
    habitId,
    domainId,
  }: DeleteHabitRaw): Promise<DeleteHabitRaw> => {
    const res = await fetch(`/api/app/habit/${habitId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new FetchError(res);
    }

    return { habitId, domainId };
  };

  return useMutation<DeleteHabitRaw, Error, DeleteHabitRaw>({
    mutationFn: deleteHabit,
    onSuccess: (_, { domainId }) => {
      queryClient.invalidateQueries(fetchHabitsByDomain(domainId));
    },
  });
}

export function useCompletedHabitMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      habitId,
      dayPart,
    }: {
      habitId: string;
      dayPart: string;
    }) => {
      const res = await fetch(`/api/app/habit/${habitId}/completed`, {
        method: "PUT",
      });

      if (!res.ok) {
        throw new FetchError(res);
      }

      return res.json() as Promise<Habit>;
    },
    onSuccess: async (_, habit) => {
      await Promise.all([
        queryClient.invalidateQueries(fetchHabits),
        queryClient.invalidateQueries(fetchHabitsByDayPart(ref(habit.dayPart))),
      ]);
    },
  });
}
