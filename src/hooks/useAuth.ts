// MÓDULOS EXTERNOS
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

// MÓDULOS LOCALES
import { format } from "@/src/utils/helpers";
import { ErrorProps, UserProps } from "@/src/types";

// UTILIDADES LOCALES
import { getData } from "../utils/storage";
import useSessionStore from "../zustand/session";
import { SignupProps } from "../types";
import { genericGet, genericPost } from "../services/generic";

type UseSigninProps = [
  (email: string, password: string, onDone?: () => void) => void,
  boolean,
  ErrorProps | null
];

export function useSignin(): UseSigninProps {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorProps | null>(null);

  async function handler(email: string, password: string, onDone?: () => void) {
    try {
      setLoading(true);
      setError(null);

      await handleSignin(email, password, undefined, onDone);
    } catch (err: any) {
      console.log(Object.keys(err));
      console.log(err.response.data);

      setLoading(false);
      setError(format.error(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleSignin(
    email: string,
    password: string,
    notificationToken?: string,
    onDone?: () => void
  ) {
    console.log("error");
    const session = await genericPost<UserProps>(
      { email, password, notificationToken },
      "/auth/signin"
    );
    await SecureStore.setItemAsync("SESSION", JSON.stringify(session));

    useSessionStore.setState({ session });

    onDone?.();
  }

  return [handler, loading, error];
}

type UseLoadUserProps = [session: UserProps | null, boolean, ErrorProps | null];

export function useLoadSession(): UseLoadUserProps {
  const [session, setSession] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorProps | null>(null);

  useEffect(() => {
    handle();
  }, []);

  async function handle() {
    try {
      setLoading(true);
      setError(null);

      const data = await genericGet<UserProps>({}, `/auth/session`);

      useSessionStore.setState({ session: data });
      setSession(session);
    } catch (err: any) {
      setLoading(false);

      setError(format.error(err));
    } finally {
      setLoading(false);
    }
  }

  return [session, loading, error];
}

type UseSignupProps = [
  (values: SignupProps, onDone?: () => void) => void,
  boolean,
  ErrorProps | null
];

export function useSignup(): UseSignupProps {
  const { setSession } = useSessionStore(({ setSession }) => ({
    setSession,
  }));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorProps | null>(null);

  async function handleSignup(values: SignupProps, onDone?: () => void) {
    try {
      setLoading(true);
      setError(null);

      const data = await genericPost<UserProps>(values, "auth/signup");
      await SecureStore.setItemAsync("SESSION", JSON.stringify(data));

      // useSessionStore.setState({ session: data });
      setSession(data);
      // setSession(data);

      onDone?.();
    } catch (err: any) {
      setLoading(false);
      setError(format.error(err));
    } finally {
      setLoading(false);
    }
  }

  return [handleSignup, loading, error];
}

type UseGetExpoTokenProps = [
  string | undefined,
  boolean,
  ErrorProps | null,
  () => void
];
export function useGetExpoToken(): UseGetExpoTokenProps {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorProps | null>(null);
  const [token, setToken] = useState<string>();

  useEffect(() => {
    handler();
  }, []);

  async function handler() {
    try {
      const storeToken = await getData("NOTIFICATION_TOKEN");

      if (storeToken) {
        setToken(storeToken);
        return;
      }
    } catch (err: any) {
      setLoading(false);
      setError(format.error(err));
    } finally {
      setLoading(false);
    }
  }

  return [token, loading, error, handler];
}
