// MÓDULOS EXTERNOS
import { useEffect, useState } from "react";

// MÓDULOS LOCALES
import { format } from "@/src/utils/helpers";
import { ErrorProps } from "@/src/types";

// SERVICIOS LOCALES
import {
  genericDelete,
  genericGet,
  genericPost,
  genericPut,
} from "../services/generic";

export function useGet<TYPE, PRESET = any>(config: {
  initialState: any;
  params?: any;
  endpoint: string;
  dataField?: string;
  noAutoGet?: boolean;
  preSet?: (data: PRESET) => TYPE;
}): [TYPE, boolean, ErrorProps | null, () => void] {
  const [data, setData] = useState<TYPE>(config?.initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorProps | null>(null);

  useEffect(() => {
    if (!config?.noAutoGet) {
      handler();
    }
  }, []);

  async function handler() {
    try {
      setLoading(true);
      setError(null);
      setData(config?.initialState);

      const response = await genericGet<TYPE>(
        config?.params,
        config?.endpoint,
        config?.dataField
      );

      if (config?.preSet) {
        const data = config?.preSet?.(response as PRESET);
        setData(data);
        return;
      }

      setData(response);
    } catch (err: any) {
      setError(format.error(err));
    } finally {
      setLoading(false);
    }
  }

  return [data, loading, error, handler];
}

export function usePost<TYPE, RESPONSE>(config: {
  endpoint: string;
  dataField?: string;
}): [
  (values?: TYPE, onDone?: (res: RESPONSE) => void) => void,
  boolean,
  ErrorProps | null
] {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorProps | null>(null);

  async function handler(values?: TYPE, onDone?: (res: RESPONSE) => void) {
    try {
      setLoading(true);
      setError(null);

      const response = await genericPost<RESPONSE>(
        values,
        config?.endpoint,
        config?.dataField
      );
      onDone?.(response);
    } catch (err: any) {
      setError(format.error(err));
    } finally {
      setLoading(false);
    }
  }

  return [handler, loading, error];
}

export function useDelete<TYPE, RESPONSE>(config: {
  endpoint: string;
  dataField?: string;
}): [
  (values?: TYPE, onDone?: (res: RESPONSE) => void) => void,
  boolean,
  ErrorProps | null
] {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorProps | null>(null);

  async function handler(values?: TYPE, onDone?: (res: RESPONSE) => void) {
    try {
      setLoading(true);
      setError(null);

      const response = await genericDelete<RESPONSE>(
        values,
        config?.endpoint,
        config?.dataField
      );
      onDone?.(response);
    } catch (err: any) {
      setError(format.error(err));
    } finally {
      setLoading(false);
    }
  }

  return [handler, loading, error];
}
export function usePut<TYPE, RESPONSE>(config: {
  endpoint: string;
  dataField?: string;
}): [
  (values?: TYPE, onDone?: (res: RESPONSE) => void) => void,
  boolean,
  ErrorProps | null
] {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorProps | null>(null);

  async function handler(values?: TYPE, onDone?: (res: RESPONSE) => void) {
    try {
      setLoading(true);
      setError(null);

      const response = await genericPut<RESPONSE>(
        values,
        config?.endpoint,
        config?.dataField
      );
      onDone?.(response);
    } catch (err: any) {
      setError(format.error(err));
    } finally {
      setLoading(false);
    }
  }

  return [handler, loading, error];
}
