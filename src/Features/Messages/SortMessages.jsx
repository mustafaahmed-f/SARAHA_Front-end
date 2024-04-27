import { useTranslation } from "react-i18next";

function SortMessages({ setSort, sort }) {
  const { t, i18n } = useTranslation();
  return (
    <div className="inline-flex flex-row flex-wrap gap-5 rounded-md bg-slate-300 p-2 align-middle text-black dark:bg-slate-700 dark:text-white">
      <span className="flex flex-col justify-center text-center">
        {t("Sort option")} :{" "}
      </span>
      <select
        defaultValue={sort}
        onChange={(e) => setSort(e.target.value)}
        className="cursor-pointer rounded-lg bg-slate-400 p-1 text-xs dark:bg-slate-500 md:text-lg"
      >
        <option value={"new"} className="text-center ">
          {t("Newest to oldest")}
        </option>
        <option value={"old"} className="text-center ">
          {t("Oldest to newest")}
        </option>
      </select>
    </div>
  );
}

export default SortMessages;
