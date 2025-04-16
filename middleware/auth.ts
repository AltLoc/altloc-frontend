import { useRouter } from "vue-router";
import { useQueryClient } from "@tanstack/vue-query";
import { getMeQueryOptions } from "@/features/user/service/user.client";

// export default defineNuxtRouteMiddleware(async (to, from) => {
//   const queryClient = useQueryClient();
//   const router = useRouter();

//   try {
//     await queryClient.fetchQuery(getMeQueryOptions);
//   } catch (error: any) {
//     if (error.response?.status === 401) {
//       return router.push("/auth/login");
//     }
//     if (error.response?.status === 500) {
//       return router.push("/");
//     }
//   }
// });

export default defineNuxtRouteMiddleware(async (to, from) => {
  const queryClient = useQueryClient();

  try {
    await queryClient.fetchQuery(getMeQueryOptions);
  } catch (error: any) {
    if (error.response?.status === 401) {
      return "/auth/login"; // просто строка
    }
    if (error.response?.status === 500) {
      return "/"; // тоже строка
    }
  }
});
