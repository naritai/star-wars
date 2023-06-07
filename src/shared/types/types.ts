export enum NODE_ENVS {
  DEV = 'development',
  PROD = 'production',
  TEST = 'test'
}

export type JSONValue =
    | string
    | number
    | boolean
    | { [x: string]: JSONValue }
    | Array<JSONValue>;