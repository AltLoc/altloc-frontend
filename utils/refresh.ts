export async function refresh<T>(url: string, options: any = {}): Promise<T> {
  try {
    return await $fetch<T>(url, {
      credentials: "include",
      ...options,
    });
  } catch (error: any) {
    if (error?.status === 401) {
      try {
        await $fetch("/api/auth/password/refresh", {
          method: "POST",
          credentials: "include",
        });
        return await $fetch<T>(url, {
          credentials: "include",
          ...options,
        });
      } catch (refreshError) {
        navigateTo("/auth/login");
        throw refreshError;
      }
    }
    throw error;
  }
}
