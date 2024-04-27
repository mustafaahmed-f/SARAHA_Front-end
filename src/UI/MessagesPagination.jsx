import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";
import PropTypes from "prop-types";
import { usePagination } from "../Hooks/usePagination";
import { useTranslation } from "react-i18next";

MessagesPagination.propTypes = {
  totalPages: PropTypes.number,
};

//TODO: Make the component reusable ( Make the max length of currentArray come from prop,
//TODO: number of elements in one page & API used )

function MessagesPagination({
  numOfMessages,
  numOfPageElements,
  setPage,
  loading,
  page,
}) {
  //// numOfPageElements is the number of page numbers appear in the pagination component

  const {
    handleChangePage,
    handleLastNumber,
    handleFirstNumber,
    currentArray,
    numOfPages,
  } = usePagination({
    numOfMessages,
    numOfPageElements,
    setPage,
    page,
  });
  const { t, i18n } = useTranslation();

  //================================================================================
  //================================================================================

  return currentArray.length ? (
    <div
      className={`m-auto flex w-fit flex-row flex-wrap items-center justify-between gap-3 rounded-md bg-slate-300 p-3 align-middle text-black dark:bg-slate-700 dark:text-white ${loading ? "pointer-events-none opacity-60" : ""}`}
    >
      <div
        className={`cursor-pointer text-xs hover:text-teal-500 hover:dark:text-teal-400 md:text-base ${i18n.language === "ar" && "rotate-180"}`}
        onClick={() => handleChangePage(page - 1)}
      >
        <ArrowBackIcon
          color="inherit"
          sx={{ fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" } }}
        />
      </div>

      <div className="flex flex-row flex-wrap items-center justify-center gap-1 sm:gap-2 md:gap-3">
        {currentArray[0] !== 1 && (
          <span
            className={`numOfPagination ${page === 1 && "activePage"}`}
            onClick={handleFirstNumber}
          >
            1
          </span>
        )}

        {currentArray[0] >= 3 && <span>....</span>}

        {currentArray.map((item, index) => (
          <div
            onClick={() => handleChangePage(item)}
            className={`numOfPagination ${page === item && "activePage"}`}
            key={item}
          >
            <span>{item}</span>
          </div>
        ))}

        {currentArray[currentArray.length - 1] <= numOfPages - 2 && (
          <span>....</span>
        )}

        {currentArray[currentArray.length - 1] !== numOfPages && (
          <span
            className={`numOfPagination ${page === numOfPages && "activePage"}`}
            onClick={handleLastNumber}
          >
            {numOfPages}
          </span>
        )}
      </div>

      <div
        className={`cursor-pointer hover:text-teal-500 hover:dark:text-teal-400 ${i18n.language === "ar" && "rotate-180"}`}
      >
        <ArrowForwardIcon
          color="inherit"
          sx={{ fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" } }}
          onClick={() => handleChangePage(page + 1)}
        />
      </div>
    </div>
  ) : null;
}

export default MessagesPagination;
