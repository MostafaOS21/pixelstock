const prepareHeaders = (headers: Headers, { getState }: any) => {
  headers.set("Authorization", "Bearer ");

  headers.set("Authorization", import.meta.env.VITE_API_KEY as string);

  return headers;
};

export default prepareHeaders;
