export type Profile = {
  name: string
  about: string
  avatar: string
  _id: string
  cohort: string
}

export type CardData = {
  likes: Profile[] | []
  _id: string
  name: string
  link: string
  owner: Profile
  createdAt: string
}

export type CardElement = HTMLElement & {
  querySelector(selector: string): HTMLElement | null
}
