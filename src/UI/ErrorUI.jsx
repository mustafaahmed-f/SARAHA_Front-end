function ErrorUI({ errMsg }) {
  return (
    <div className="flex flex-col gap-3 py-8 md:gap-6">
      <p className="text-center text-red-600 dark:text-red-400">{errMsg}</p>
      <div className="flex w-full justify-center">
        <img
          alt="Error"
          src="../../public/6029646.jpg"
          className="w-[90%] sm:w-[40%]"
        />
      </div>
    </div>
  );
}

export default ErrorUI;
