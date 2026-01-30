function QuestionCard({ data }) {
  return (
    <div className="flip-wrapper perspective">
      <div
        className="
          flip-card
          w-72 h-44
          sm:w-80 sm:h-48
          md:w-96 md:h-52
          lg:w-[28rem] lg:h-60
        "
      >
        {/* FRONT */}
        <div className="flip-front bg-white rounded-2xl shadow-xl
                        flex items-center justify-center p-6 text-center">
          <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
            {data.question}
          </p>
        </div>

        {/* BACK */}
        <div className="flip-back bg-blue-600 text-white rounded-2xl shadow-xl
                        flex items-center justify-center p-6 text-center">
          <p className="text-sm sm:text-base md:text-lg">
            {data.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
