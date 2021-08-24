export interface User {
  email: string,
  password: string,
  returnSecureToken?: boolean,
  id?: string
}
export interface FBAuthResponse {
  idToken: string,
  expiresIn: string
}
export interface Post {
  name: string,
  content: string,
  author: string,
  date: Date,
  id?: string
}
export interface FbCreateResponse {
  name: string
}
