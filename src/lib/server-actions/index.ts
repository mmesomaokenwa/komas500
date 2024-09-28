'use server'

import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { FetchResult } from "../types";

export const getCookie = async (name: string) => {
  const cookieStore = cookies();
  return cookieStore.get(name);
};

export const setCookie = (
  name: string,
  value: string,
  options: Partial<ResponseCookie>
) => {
  const cookieStore = cookies();
  cookieStore.set(name, value, { path: "/", ...options });
};

export const deleteCookie = (name: string) => {
  const cookieStore = cookies();
  cookieStore.delete(name);
};

export const saveAccessToken = (accessToken: string) => {
  setCookie("token", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  });
};

export const saveRefreshToken = (refreshToken: string) => {
  setCookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  });
};

// use customFetch instead of fetch for interacting with the backend
export const customFetch = async (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${input}`,
    {
      cache: !init?.method || init.method === "GET" ? "force-cache" : "default",
      ...init,
    }
  );
};

export const fetchWithAuth = async (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> => {
  const token = await getCookie("token");
  const refreshToken = await getCookie("refreshToken");

  const headers = {
    ...init?.headers,
    Authorization: `Bearer ${token?.value || ""}`,
  };

  let res = await customFetch(input, { ...init, headers });

  if (res.status === 401) {
    const refreshRes = await customFetch("/refresh-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken?.value || ""}`,
      },
    });

    if (refreshRes.ok) {
      const { accessToken } = await refreshRes.json();
      saveAccessToken(accessToken);

      // Recursively call fetchWithAuth with the new token
      return fetchWithAuth(input, {
        ...init,
        headers: { ...headers, Authorization: `Bearer ${accessToken}` },
      });
    } else {
      // If refresh token fails, return the original 401 response
      return res;
    }
  }

  return res;
};

export const getImageSrc = async ({
  fileName,
  folderName,
}: {
  fileName: string;
  folderName: string;
}): Promise<FetchResult<string | null>> => {
  try {
    const res = await customFetch(`/file/get/${folderName}/${fileName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await res.json();
  } catch (error: any) {
    return {
      statusCode: error.code,
      hasError: true,
      message: "Failed to fetch image",
      data: null,
    };
  }
};
