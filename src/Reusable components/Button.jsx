function Button({ children }) {
  return (
    <button className="w-full rounded-full bg-teal-400 px-7 py-2 hover:bg-teal-600 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-800 sm:w-fit">
      {children}
    </button>
  );
}

export default Button;
