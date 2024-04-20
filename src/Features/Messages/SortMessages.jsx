function SortMessages({ setSort, sort }) {
  return (
    <div className="inline-flex flex-row flex-wrap gap-5 rounded-md bg-slate-300 p-2 align-middle text-black dark:bg-slate-700 dark:text-white">
      <span className="flex flex-col justify-center text-center">
        Sort option :{" "}
      </span>
      <select
        defaultValue={sort}
        onChange={(e) => setSort(e.target.value)}
        className="rounded-lg bg-slate-400 p-1 dark:bg-slate-500"
      >
        <option value={"new"}>Newest to oldest</option>
        <option value={"old"}>Oldest to newest</option>
      </select>
    </div>
  );
}

export default SortMessages;
