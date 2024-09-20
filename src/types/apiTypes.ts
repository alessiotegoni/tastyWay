import { AxiosError } from "axios"

export type ApiError = AxiosError<{ message: string }>

export type AuthRes = string

export type LogoutRes = { message: string }
