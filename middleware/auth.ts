// import { useQueryClient } from "@tanstack/vue-query";
// import { getMeQueryOptions } from "@/features/user/service/user.client";

// export default defineNuxtRouteMiddleware(async (to, from) => {
//   const queryClient = useQueryClient();

//   try {
//     await queryClient.fetchQuery(getMeQueryOptions);
//   } catch (error: any) {
//     if (error.response?.status === 401) {
//       return "/auth/login";
//     }
//     if (error.response?.status === 500) {
//       return "/";
//     }
//   }
// });

import { useQueryClient } from "@tanstack/vue-query";
import { getMeQueryOptions } from "@/features/user/service/user.client";
import { refresAuthToken } from "@/features/auth/service/authPassword";

export default defineNuxtRouteMiddleware(async () => {
  const queryClient = useQueryClient();

  try {
    // Пробуем получить пользователя
    await queryClient.fetchQuery(getMeQueryOptions);
  } catch (error: any) {
    // Если токен истёк — пробуем обновить
    if (error?.response?.status === 401 || error?.status === 401) {
      try {
        await refresAuthToken();

        // Повторяем запрос
        await queryClient.fetchQuery(getMeQueryOptions);
      } catch (refreshError: any) {
        // Если и refresh не сработал — уводим на логин
        return "/auth/login";
      }
    }

    // Если серверная ошибка
    if (error?.response?.status === 500 || error?.status === 500) {
      return "/";
    }
  }
});
