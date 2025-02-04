import axios from "axios";
import useSessionStore from "../zustand/session";
import * as SecureStore from "expo-secure-store";
import { ModalOpener$ } from "./helpers";

const http = axios.create({
  baseURL: process.env.API_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.code === "ECONNABORTED") {
      ModalOpener$.next({
        name: "ALERT",
        extra: {
          type: "ERROR",
          title: "Oops...",
          description:
            "El tiempo de espera fue demasiado. Revisa tu conexión a internet o intentalo mas tarde.",
        },
      });
      return;
    }

    if (
      error?.response?.status === 401 &&
      useSessionStore?.getState()?.session
    ) {
      error["message"] =
        "Ha ocurrido un error inesperado, inténtalo más tarde.";

      ModalOpener$.next({
        name: "ALERT",
        extra: {
          type: "ERROR",
          title: "Oops...",
          description: "Su session ha expirado, vuelva a iniciar sesión.",
        },
      });
      await SecureStore.deleteItemAsync("SESSION");
      useSessionStore.setState({ session: null });
    }

    if (error?.response?.data?.status === 404) {
      error["message"] =
        "Ha ocurrido un error de conexión, inténtalo más tarde.";
    }

    if (error?.response?.data?.responseCode === 500) {
      error["message"] =
        "Ha ocurrido un error en uno de nuestros servicios, inténtalo más tarde.";
    }

    return Promise.reject(error);
  }
);

export default http;
