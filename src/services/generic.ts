import http from "../utils/http";

export async function genericGet<TYPE>(
  params: any,
  endpoint: string,
  dataField?: string
): Promise<TYPE> {
  const response = await http.get(endpoint, {
    params,
  });

  if (response?.data?.error) {
    throw response?.data;
  }

  if (dataField) {
    return response?.data?.[dataField];
  }

  return response?.data;
}

export async function genericPost<TYPE>(
  data: any,
  endpoint: string,
  dataField?: string
): Promise<TYPE> {
  const response = await http.post(endpoint, data);

  if (
    response?.data?.error ||
    (response?.data?.code && response?.data?.code !== "OK")
  ) {
    throw response?.data;
  }

  if (dataField) {
    return response?.data?.[dataField];
  }

  return response?.data;
}

export async function genericDelete<TYPE>(
  data: any,
  endpoint: string,
  dataField?: string
): Promise<TYPE> {
  const response = await http.delete(endpoint, {
    data,
  });

  if (
    response?.data?.error ||
    (response?.data?.code && response?.data?.code !== "OK")
  ) {
    throw response?.data;
  }

  if (dataField) {
    return response?.data?.[dataField];
  }

  return response?.data;
}

export async function genericPut<TYPE>(
  data: any,
  endpoint: string,
  dataField?: string
): Promise<TYPE> {
  const response = await http.put(endpoint, data);

  if (
    response?.data?.error ||
    (response?.data?.code && response?.data?.code !== "OK")
  ) {
    throw response?.data;
  }

  if (dataField) {
    return response?.data?.[dataField];
  }

  return response?.data;
}
