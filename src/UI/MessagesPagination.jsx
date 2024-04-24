import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";

const array = [1, 2, 3, 4, 5, 6, 7, 8];

function MessagesPagination({ totalPages }) {
  const [currentPage, setCurrentPage] = useState(1);
  const numOfPages = Math.ceil(totalPages / 6);
  const arrayOfNumbers = Array.from({ length: numOfPages }, (_, i) => i + 1);
  const [currentArray, setCurrentArray] = useState(
    arrayOfNumbers.length > 6 ? arrayOfNumbers.slice(0, 6) : arrayOfNumbers,
  );

  console.log(totalPages);
  console.log(numOfPages);
  console.log(currentArray);

  function handleChangePage() {}

  function nextPage() {}

  function prevPage() {}

  //================================================================================
  //================================================================================

  return (
    <div className="m-auto flex w-fit flex-row flex-wrap items-center justify-between gap-3 rounded-md bg-slate-300 p-3 align-middle text-black dark:bg-slate-700 dark:text-white">
      <div className="cursor-pointer text-xs hover:text-teal-500 hover:dark:text-teal-400 md:text-base">
        <ArrowBackIcon
          color="inherit"
          sx={{ fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" } }}
        />
      </div>
      <div className="flex flex-row flex-wrap items-center justify-center gap-1 sm:gap-2 md:gap-3">
        {array.map((item) => (
          <div
            className={`numOfPagination ${currentPage === item && "activePage"}`}
          >
            <span className="">{item}</span>
          </div>
        ))}
        <span>....</span>
        <span className="numOfPagination">{numOfPages}</span>
      </div>
      <div className="cursor-pointer hover:text-teal-500 hover:dark:text-teal-400">
        <ArrowForwardIcon
          color="inherit"
          sx={{ fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" } }}
        />
      </div>
    </div>
  );
}

export default MessagesPagination;
