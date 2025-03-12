import { useRouter } from "vue-router";
import { useQueryClient } from "@tanstack/vue-query";
import { getMeQueryOptions } from "@/features/user/service/user.client";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  try {
    // Пробуем получить данные пользователя
    await queryClient.fetchQuery(getMeQueryOptions);
  } catch (error: any) {
    if (error.response?.status === 401) {
      // Если 401 — редиректим на страницу логина
      return router.push("/auth/login");
    }
  }
});
