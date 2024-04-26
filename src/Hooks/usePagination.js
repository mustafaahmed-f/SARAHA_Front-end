import { useEffect, useMemo, useState } from "react";

export function usePagination({
  numOfMessages,
  numOfPageElements,
  setPage,
  page,
}) {
  //// Here I used the useEffect to make currentArray calculated synchronously after getting
  //// num. of pages from the API in the useMessages hook
  //// I also used the useMemo twice here so I can avoid infinite re-renders caused by
  //// the useEffect.

  //// The problem here was that getting the number of messages from the API is done after
  //// the full render of the FinalMessages component because it is done using useEffect()
  //// os the initial currentArray was [1] which is not the desired array and to make it
  //// syncronous we used the useMemo() and the useEffect() so after getting the num. of
  //// messages from the API the useEffect will be called and the currentArray will be
  //// calculated synchronously.

  const numOfPages = useMemo(
    () => Math.ceil(numOfMessages / numOfPageElements),
    [numOfMessages, numOfPageElements],
  );
  //   console.log("numOfPages", numOfPages);
  const arrayOfNumbers = useMemo(
    () => Array.from({ length: numOfPages }, (_, i) => i + 1),
    [numOfPages],
  );
  const [currentArray, setCurrentArray] = useState([]);

  useEffect(
    function () {
      //// A condition to handle the case where the last page number is included in currentArray
      if (currentArray.includes(numOfPages)) {
        setCurrentArray(
          (prevArray) => (prevArray = prevArray.map((el) => el - 1)),
        );

        return;
      }

      //// A condition to keep the current array without changing it if the page is already in it
      //// and length of currentArray is greater than 1 (To make sure it isn't the first calculation)
      if (currentArray.includes(page) && currentArray.length > 1) return;

      setCurrentArray(
        arrayOfNumbers.length > numOfPageElements
          ? arrayOfNumbers.slice(0, numOfPageElements)
          : arrayOfNumbers,
      );
    },
    [arrayOfNumbers, numOfPageElements],
  );

  function handleChangePage(page) {
    if (page > numOfPages || page < 1) return;
    if (page === currentArray[0] && page !== arrayOfNumbers[0]) {
      let subtructionValue = page === 3 ? 2 : 1;
      setCurrentArray((prevArray) =>
        prevArray.map((el) => el - subtructionValue),
      );
    }
    if (
      page === currentArray[currentArray.length - 1] &&
      page !== arrayOfNumbers[arrayOfNumbers.length - 1]
    ) {
      let additionValue = page === numOfPages - 2 ? 2 : 1;
      setCurrentArray((prevArray) => prevArray.map((el) => el + additionValue));
    }
    setPage(page);
  }

  function handleLastNumber() {
    let newArr = Array.from(
      { length: numOfPageElements },
      (_, i) => numOfPages - i,
    ).reverse();
    setCurrentArray(newArr);
    setPage(numOfPages);
  }

  function handleFirstNumber() {
    let newArr = Array.from({ length: numOfPageElements }, (_, i) => i + 1);
    console.log("First number handled");
    setCurrentArray(newArr);
    setPage(1);
  }

  return {
    handleChangePage,
    handleLastNumber,
    handleFirstNumber,
    currentArray,
    numOfPages,
  };
}
