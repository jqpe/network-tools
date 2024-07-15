export interface IanaTld {
  unicode: string
  punycode?: string
}

export interface IanaResponse {
  updatedAt: Date
  tlds: IanaTld[]
}
