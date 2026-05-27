const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://api-service-ac2r6xiana-uc.a.run.app/api/v1"

function getToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("token")
}

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

async function authRequest<T>(path: string, options?: RequestInit): Promise<T> {
  const token = getToken()
  return request<T>(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers ?? {}),
    },
  })
}

export type EventRegistrationOption = {
  type: string
  openDate: string
  closeDate: string
}

export type RaceEvent = {
  id: number
  name: string
  distance: string
  city: string
  state: string
  country: string
  price: number | null
  url: string
  img: string
  raceDate: string
  tags: string[]
  registration: EventRegistrationOption[]
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

export type Reminder = {
  id: number
  user_id: number
  race_id: number
  created_at: string
}

export const api = {
  races: {
    getAll: () => request<RaceEvent[]>("/races"),
  },
  reminders: {
    getAll: () => authRequest<Reminder[]>("/reminders"),
    create: (raceId: number) =>
      authRequest<Reminder>("/reminders", {
        method: "POST",
        body: JSON.stringify({ race_id: raceId }),
      }),
    delete: (raceId: number) =>
      authRequest<void>(`/reminders/${raceId}`, { method: "DELETE" }),
  },
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
