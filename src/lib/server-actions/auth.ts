'use server'

import { z } from "zod";
import { registerSchema } from "../schemas";
import { FetchResult, LoginResponse, RegisterResponse, VerifyUserResponse } from "../types";
import { customFetch, deleteCookie, fetchWithAuth, saveAccessToken, saveRefreshToken } from ".";

export const createUser = async (
  data: z.infer<typeof registerSchema>
): Promise<RegisterResponse> => {
  try {
    const res = await customFetch("/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  } catch (error: any) {
    return {
      statusCode: error.code,
      hasError: true,
      message: error.message,
      data: null,
    };
  }
};

export const loginUser = async (data: {
  username: string;
  password: string;
}): Promise<LoginResponse> => {
  try {
    const res = await customFetch("/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resData = (await res.json()) as LoginResponse;

    if (!resData.data) return resData;

    const { accessToken, refreshToken } = resData.data;

    // Set accessToken and refreshToken in cookies
    saveAccessToken(accessToken);

    saveRefreshToken(refreshToken);

    // Remove accessToken and refreshToken from response
    resData.data = {
      ...resData.data,
      accessToken: "",
      refreshToken: "",
    };

    return resData;
  } catch (error: any) {
    return {
      statusCode: error.code,
      hasError: true,
      message: error.message,
      data: null,
    };
  }
};

export const verifyUser = async (data: {
  username: string;
  code: string;
}): Promise<VerifyUserResponse> => {
  try {
    const res = await customFetch("/user/otp/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resData: VerifyUserResponse = await res.json();

    if (resData.hasError) return resData;

    const { accessToken, refreshToken } = resData.data;

    // Set accessToken and refreshToken in cookies
    saveAccessToken(accessToken);

    saveRefreshToken(refreshToken);

    // Remove accessToken and refreshToken from response
    resData.data = {
      ...resData.data,
      accessToken: "",
      refreshToken: "",
    };

    return resData;
  } catch (error: any) {
    return {
      statusCode: error.code,
      hasError: true,
      message: error.message,
      data: {
        accessToken: "",
        refreshToken: "",
      },
    };
  }
};

export const sendPasswordResetCode = async (username: string): Promise<FetchResult<null>> => {
  try {
    const res = await customFetch("/user/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    return await res.json();
  } catch (error: any) {
    return {
      statusCode: error.code,
      hasError: true,
      message: error.message,
      data: null,
    }
  }
}

export const resetPassword = async (data: {
  username: string;
  code: string;
  password: string;
}): Promise<FetchResult<null>> => {
  try {
    const res = await customFetch("/user/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  } catch (error: any) {
    return {
      statusCode: error.code,
      hasError: true,
      message: error.message,
      data: null,
    }
  }
}

export const logout = () => {
  deleteCookie("token");
  deleteCookie("refreshToken");
};

export const enable2FA = async (): Promise<FetchResult<null>> => {
  try {
    const res = await fetchWithAuth("/profile/enable-two-fa", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await res.json();
  } catch (error: any) {
    return {
      statusCode: error.code,
      hasError: true,
      message: "Failed to enable 2FA",
      data: null,
    };
  }
};

export const disable2FA = async (): Promise<FetchResult<null>> => {
  try {
    const res = await fetchWithAuth("/profile/disable-two-fa", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await res.json();
  } catch (error: any) {
    return {
      statusCode: error.code,
      hasError: true,
      message: "Failed to disable 2FA",
      data: null,
    };
  }
};