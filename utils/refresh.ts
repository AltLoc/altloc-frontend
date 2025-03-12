export async function refresh<T>(url: string, options: any = {}): Promise<T> {
  try {
    return await $fetch<T>(url, {
      credentials: "include", // отправляем куки
      ...options,
    });
  } catch (error: any) {
    if (error?.status === 401) {
      try {
        await $fetch("/api/auth/password/refresh-token", {
          method: "POST",
          credentials: "include",
        });
        // После успешного рефреша повторяем оригинальный запрос
        return await $fetch<T>(url, {
          credentials: "include",
          ...options,
        });
      } catch (refreshError) {
        // Рефреш не сработал — отправляем на логин
        navigateTo("/auth/login");
        throw refreshError;
      }
    }
    throw error;
  }
}
