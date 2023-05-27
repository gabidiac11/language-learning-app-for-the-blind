export type ApiDataResponse404 = {
  message: "Not found.";
};
export type ApiDataResponseError = {
  message: string;
};

export type IsValidHeader<Header> = keyof Header extends string | number
  ? Header[keyof Header] extends string | string[] | undefined
    ? {}
    : "Header values must be string or string[]"
  : "Header names must be of type string";

export type CustomHeaderType = {
  headerName: string;
  headerValue: string | string[];
};

export type ExtendedHeaderType = CustomHeaderType & {
  // Additional properties specific to your custom header type
  someExtraProperty: number;
};

// Example usage
const header: IsValidHeader<CustomHeaderType> = {
  headerName: "Content-Type",
  headerValue: "application/json",
  someExtraProperty: 42,
};
