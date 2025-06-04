import { useMutation } from "@tanstack/vue-query";
import { z } from "zod";
import { FetchError } from "@/utils/fetch";

const errorSchema = z.object({
  errors: z.array(
    z.object({
      message: z.string(),
    })
  ),
});

export const useRegisterMutation = () =>
  useMutation({
    mutationFn: async (data: {
      username: string;
      email: string;
      password: string;
    }) => {
      const res = await fetch("/api/auth/password/registration", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new FetchError(res);
      }
    },
  });

export const useLoginMutation = () =>
  useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await fetch("/api/auth/password/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new FetchError(res);
      }

      return res.json();
    },
  });

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/auth/password/logout", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        const errors = errorSchema.parse(await res.json()).errors;
        throw new Error(errors.at(0)?.message);
      }
      // Обновляем статус аутентификации через Pinia
      // authStore.isAuthenticated = false;
      // localStorage.setItem("isAuthenticated", "false");
      // console.log("logout pinia", authStore.isAuthenticated);
      return;
    },
  });
};

export const useVerifyEmailMutation = () => {
  return useMutation({
    mutationFn: async (data: { activation_token: string }) => {
      const res = await fetch(
        `/api/auth/password/verify-email/${data.activation_token}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
        }
      );
      // if (!res.ok) {
      //   throw new Error(await res.text());
      // }
      if (!res.ok) {
        const errors = errorSchema.parse(await res.json()).errors;
        throw new Error(errors.at(0)?.message);
      }
      return;
    },
  });
};

export const useRecoveryPasswordMutation = () =>
  useMutation({
    mutationFn: async (data: { email: string }) => {
      const res = await fetch("/api/auth/password/recovery_password", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errors = errorSchema.parse(await res.json()).errors;
        throw new Error(errors.at(0)?.message);
      }
      return;
    },
  });

export const useResetPasswordEmailMutation = () => {
  return useMutation({
    mutationFn: async (data: {
      user_id: string;
      reset_token: string;
      password: string;
    }) => {
      const res = await fetch(
        `/api/auth/password/email-reset-password/${data.user_id}/${data.reset_token}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!res.ok) {
        throw new Error(await res.text());
      }
      return;
    },
  });
};

export const refresAuthToken = async () => {
  const res = await fetch("/api/auth/password/refresh", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new FetchError(res);
  }

  return res.json();
};
