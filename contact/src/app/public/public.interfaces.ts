export interface IUser {
  id?: number,
  email?: string,
  user?: string,
  password?: string,
}

export interface  ILoginResponse {
  token : string,
  status: number,
  success: string,
  message: string
}
