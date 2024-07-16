export default function FoodIntro() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-center min-h-screen p-8 bg-white dark:bg-gray-800">
        <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0 ">
          <img
            src="https://via.placeholder.com/300"
            alt="Profile"
            className="w-64 h-64 rounded-full shadow-lg"
          />
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-bold mb-4 dark:text-gray-100">
            If you can read, you can cook
          </h1>
          <br />
          <p className="text-lg text-gray-700 dark:text-gray-300">
            I believe cooking is an invaluable life skill that everyone should
            have and honestly I personally think that it is not hard as well.
            Cooking at its simplest is essentially just reading and following a
            recipe step-by-step.
          </p>
          <br />
          <p className="text-lg text-gray-700 dark:text-gray-300">
            This food blog will showcase several tips and tricks I've picked up
            from online videos and articles ever since the Covid-19 pandemic
            which prompted my self-teaching homecooking journey. Included will
            also be some of my go-to recipes for meals I personally cook at
            home. Enjoy!
          </p>
          <br />
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Disclaimer: Most of the recipes do not have exact steps or
            measurements as I mainly cook of feel and vibes.
          </p>
        </div>
      </div>
    </div>
  );
}
