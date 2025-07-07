import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Fact } from "../types/types";

export const numbersApi = createApi({
  reducerPath: "numbersApi",
  tagTypes: ["Numbers"],
  baseQuery: fetchBaseQuery(
    {
      baseUrl: "https://corsproxy.io/?http://numbersapi.com/",
    },
  ),
  endpoints: (builder) => ({
    getFact: builder.query<Fact, string>({
      query: (queryString) => `${queryString}?json`,
      providesTags: ["Numbers"],
    }),
  }),
});

export const { useLazyGetFactQuery } = numbersApi;
