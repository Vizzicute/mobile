import { useMemo } from "react";
import axios from "axios";
import * as Sentry from "@sentry/react-native";

export const useApi = () => {
  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: process.env.EXPO_PUBLIC_API_URL,
      withCredentials: true, // 🔑 required for better-auth cookies
      headers: {
        "Content-Type": "application/json",
      },
    });

    // response interceptor (registered once per instance)
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          Sentry.logger.error(
            Sentry.logger
              .fmt`API request failed: ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
            {
              status: error.response.status,
              endpoint: error.config?.url,
              method: error.config?.method,
            },
          );
        } else if (error.request) {
          Sentry.logger.warn("API request failed - no response", {
            endpoint: error.config?.url,
            method: error.config?.method,
          });
        }

        return Promise.reject(error);
      },
    );

    return instance;
  }, []);

  return { api };
};
