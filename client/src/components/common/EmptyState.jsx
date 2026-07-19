const EmptyState = ({
  title = "No Data Found",
  message = "Nothing to display.",
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">

      <div className="text-7xl mb-5">
        📦
      </div>

      <h2 className="text-3xl font-bold">
        {title}
      </h2>

      <p className="text-gray-500 mt-4 max-w-md">
        {message}
      </p>

      {buttonText && (

        <button
          onClick={onButtonClick}
          className="mt-8 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
        >
          {buttonText}
        </button>

      )}

    </div>
  );
};

export default EmptyState;