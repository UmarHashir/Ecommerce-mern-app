const ErrorState = ({
  title = "Something went wrong!",
  message = "Failed to load data.",
  buttonText = "Retry",
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">

      <div className="text-6xl mb-5">
        ⚠️
      </div>

      <h2 className="text-3xl font-bold">
        {title}
      </h2>

      <p className="text-gray-500 mt-3">
        {message}
      </p>

      <button
        onClick={onRetry}
        className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition"
      >
        {buttonText}
      </button>

    </div>
  );
};

export default ErrorState;