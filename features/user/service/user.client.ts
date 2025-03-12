// import { queryOptions } from "@tanstack/vue-query";
// import type { User } from "@/models";
// import { FetchError } from "@/utils/fetch";

// export const getMeQueryOptions = queryOptions({
//   queryKey: ["secured", "me"] as const,
//   queryFn: async () => {
//     const res = await fetch("/api/secured/me", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//     });

//     if (!res.ok) {
//       throw new FetchError(res);
//     }

//     const user = (await res.json()) as User;
//     if (!user) {
//       throw new Error("User data is undefined.");
//     }

//     return user;
//   },
// });

import { queryOptions } from "@tanstack/vue-query";
import type { User } from "@/models";
// import { FetchError } from "@/utils/fetch";
import { refresh } from "@/utils/refresh";

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
