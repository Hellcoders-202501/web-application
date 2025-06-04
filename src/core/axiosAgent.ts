/* eslint-disable no-case-declarations */
/* eslint-disable no-var */
/* eslint-disable prefer-const */
import axios, { AxiosResponse } from "axios";

const responseBody = <T>(response: AxiosResponse<T>) => response;

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL || "";

const requests = {
  get: <T>(url: string) =>
    axios.get<T>(url, { withCredentials: true }).then(responseBody),
  getBlob: <T>(url: string) =>
    axios
      .get<T>(url, { withCredentials: true, responseType: "blob" })
      .then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body, { withCredentials: true }).then(responseBody),
  put: <T>(url: string, body: {}) =>
    axios.put<T>(url, body, { withCredentials: true }).then(responseBody),
  patch: <T>(url: string, body: {}) =>
    axios.patch<T>(url, body, { withCredentials: true }).then(responseBody),
  delete: <T>(url: string) =>
    axios.delete<T>(url, { withCredentials: true }).then(responseBody),
};

export { requests };