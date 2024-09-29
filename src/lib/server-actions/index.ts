'use server'

import { FetchResult, LoginResponse } from "../types";
import { JWT } from "next-auth/jwt";
import { auth } from "@/auth";

export const refreshAccessToken = async (token: JWT): Promise<JWT | null> => {
  try {
    const res = await customFetch("/refresh-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.refreshToken}`,
      },
    });

    const { hasError, data } = await res.json() as LoginResponse;

    if (hasError || !data) return null

    const { accessToken, refreshToken } = data

    return {
      ...token,
      accessToken,
      refreshToken,
    }
  } catch (error) {
    return null;
  }
}

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
  const session = await auth()

  const headers = {
    ...init?.headers,
    Authorization: `Bearer ${session?.accessToken}`,
  };

  return await customFetch(input, { ...init, headers });
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
