const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://api-service-ac2r6xiana-uc.a.run.app/api/v1"

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error.error ?? `Request failed: ${res.status}`)
  }

  return res.json()
}

export type User = {
  id: number
  phone: string
  name: string | null
  created_at: string
  last_verified_at: string | null
}

export type AuthResponse = {
  token: string
  user: User
}

export const api = {
  auth: {
    sendOTP: (phone: string) =>
      request<{ message: string; phone: string }>("/auth/send-otp", {
        method: "POST",
        body: JSON.stringify({ phone }),
      }),

    verifySignup: (phone: string, code: string) =>
      request<AuthResponse>("/auth/verify-signup", {
        method: "POST",
        body: JSON.stringify({ phone, code }),
      }),

    verifyLogin: (phone: string, code: string) =>
      request<AuthResponse>("/auth/verify-login", {
        method: "POST",
        body: JSON.stringify({ phone, code }),
      }),
  },
}
