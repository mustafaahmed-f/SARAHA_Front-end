function SortMessages({ setSort, sort }) {
  return (
    <div className="inline-flex flex-row flex-wrap gap-5 rounded-md bg-slate-300 p-2 align-middle text-black dark:bg-slate-700 dark:text-white">
      <span className="flex flex-col justify-center text-center">
        Sort option :{" "}
      </span>
      <select
        defaultValue={sort}
        onChange={(e) => setSort(e.target.value)}
        className="cursor-pointer rounded-lg bg-slate-400 p-1 text-xs dark:bg-slate-500 md:text-lg"
      >
        <option value={"new"} className="text-center ">
          Newest to oldest
        </option>
        <option value={"old"} className="text-center ">
          Oldest to newest
        </option>
      </select>
    </div>
  );
}

export default SortMessages;
