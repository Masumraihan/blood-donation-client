"use client";
import { Pagination, TablePagination } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const DonorPagination = ({ count }: { count?: number }) => {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const initialPage = parseInt(params.get("page") || "1");
  const [page, setPage] = useState(Number(initialPage));
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    const newParams = new URLSearchParams(params);
    if (value === 1) {
      newParams.delete("page");
      router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
    } else {
      newParams.set("page", value.toString());
      router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
    }
  };
  return (
    <Pagination
      count={count || 10}
      page={page}
      onChange={handleChange}
      sx={{ display: "flex", justifyContent: "center" }}
      variant='outlined'
      shape='rounded'
      showFirstButton
      showLastButton
    />
  );
};

export default DonorPagination;
