function InputField({ placeholder, onChange, errMsg, myRef, myType, myName }) {
  // console.log(ref);

  return (
    <div className="mt-8 flex flex-col">
      <input
        className={`rounded-full bg-gray-300 px-4 py-1 focus:outline-0 dark:bg-gray-700 dark:text-slate-100`}
        placeholder={placeholder}
        ref={myRef}
        onChange={onChange}
        type={myType}
        name={myName}
      />
      <p className="mb-0 mt-1 text-red-600 dark:text-red-300">{errMsg}</p>
    </div>
  );
}

export default InputField;
