import { Params } from "./types";

export function buildEndpoint(base: string, params: Params): string {
  const { search, ...rest } = params;
  const searchParam = search ? `search=${search}` : "";
  const restParams = Object.entries(rest).reduce(
    (acc, [key, value]) => `${acc}&${key}=${value}`,
    searchParam
  );
  const resolvedEndpoint = `${base}/?${restParams}`;
  return resolvedEndpoint;
}
