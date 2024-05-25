// utils/getSearchParams.ts
import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";

const getSearchParams = (): ParsedUrlQuery => {
  const router = useRouter();
  const { query } = router;

  return query;
};

export default getSearchParams;
