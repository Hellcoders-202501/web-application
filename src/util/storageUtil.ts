"use-client";

const fp_token =
  process.env.NEXT_PUBLIC_ENV === "production"
    ? "fp_token"
    : "fp_token_dev";

const ISSERVER = typeof window === "undefined";

/* localStorage */
export const saveLocalToken = (token: string) => {
  if (!ISSERVER) localStorage.setItem(fp_token, token);
};

/* return any string */
export const getLocalToken = () => {
  if (!ISSERVER) return localStorage.getItem(fp_token);
};

export const removeLocalToken = () => {
  if (!ISSERVER) localStorage.removeItem(fp_token);
};
/* localStorage - end */
