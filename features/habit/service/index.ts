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

export type UpdateDomainBody = z.infer<typeof updateHabitBodySchema>;

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

export const useHabitMutation = () =>
  useMutation({
    mutationFn: async (options: { body: UpdateDomainBody }) => {
      const res = await fetch("/api/app/domain/habit", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(data),
        body: JSON.stringify(options.body),
      });
      if (!res.ok) {
        const errors = errorSchema.parse(await res.json()).errors;
        throw new Error(errors.at(0)?.message);
      }
      return;
    },
  });

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

// export const fetchHabitsByDayPart = (dayPart: string) =>
//   queryOptions({
//     queryKey: ["api", "app", "habits", "daypart", dayPart],
//     queryFn: async ({ signal }) => {
//       const res = await fetch(`/api/app/habits/day-part/${dayPart}`, {
//         signal,
//       });

//       if (!res.ok) {
//         throw new FetchError(res);
//       }

//       return res.json() as Promise<Habit[]>;
//     },
//   });

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

// export const getHabitByIdQuery = (domainId: string) =>
//   queryOptions({
//     queryKey: ["api", "app", "domain", domainId],
//     queryFn: async ({ signal }) => {
//       const res = await fetch(`/api/app/domain/${domainId}`, {
//         signal,
//       });
//       if (!res.ok) {
//         throw new FetchError(res);
//       }
//       return res.json() as Promise<Habit>;
//     },
//   });

export function useDeleteHabitMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (habitId: string) => {
      const res = await fetch(`/api/app/habit/${habitId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new FetchError(res);
      }
    },
    onSuccess: (_, domainId: string) => {
      queryClient.invalidateQueries(fetchHabitsByDomain(domainId));
      // queryClient.removeQueries(categoriesQuery(categoryId));
    },
  });
}

export function useCompletedHabitkMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (habitId: string) => {
      console.log(
        "useCompleteTaskMutation Sending request to complete task with ID:",
        habitId
      );
      const res = await fetch(`/api/app/habit/${habitId}/completed`, {
        method: "PUT",
      });

      if (!res.ok) {
        throw new FetchError(res);
      }

      if (res.ok) {
        console.log("Task done!!!");
      }

      return res.json() as Promise<Habit>;
    },
    onSuccess: (task) => {
      queryClient.invalidateQueries(fetchHabitsByDomain(task.domainId));
      queryClient.invalidateQueries(fetchHabits);
    },
  });
}

// export function useCompletedHabitkMutation() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (habitId: string) => {
//       console.log(
//         "useCompletedHabitMutation: Sending request to complete habit with ID:",
//         habitId
//       );

//       const res = await fetchWithErrorHandling(
//         `/api/app/habit/${habitId}/completed`,
//         {
//           method: "PUT",
//         }
//       );

//       console.log("Habit completed successfully!");
//       return res.json() as Promise<Habit>;
//     },

//     onSuccess: (habit) => {
//       queryClient.invalidateQueries(fetchHabitsByDomain(habit.domainId));
//       queryClient.invalidateQueries(fetchHabits);
//     },

//     onError: (err) => {
//       if (err instanceof FetchError) {
//         const detail = err.problemDetails?.detail;
//         // if (detail === "Habit already completed today.") {
//         //   alert("Ты уже выполнил привычку сегодня ✨");
//         // } else {
//         //   console.error(
//         //     "Ошибка при завершении привычки:",
//         //     detail || err.message
//         //   );
//         //   alert(detail || "Произошла ошибка при завершении привычки.");
//         // }
//       } else {
//         console.error("Неизвестная ошибка:", err);
//         // alert("Произошла непредвиденная ошибка.");
//       }
//     },
//   });
// }
