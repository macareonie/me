export default function FoodIntro() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      {/* Top Section */}
      <div className="relative min-h-screen flex items-center justify-center p-8 bg-white dark:bg-gray-800">
        <div className="w-full md:w-1/2 text-center md:text-center">
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
            from Youtube and various online recipes ever since the Covid-19
            pandemic which prompted my self-teaching homecooking journey.
            Included will be some of my go-to recipes for meals I personally
            cook at home, as well as some more adventurous recipes I've
            attempted. Enjoy!
          </p>
          <br />
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Disclaimer: Most of the recipes do not have exact steps or
            measurements as I mainly cook of feel and vibes. The pictures used
            below are also mostly from online sources. The ones that I took
            myself shoudl be pretty obvious 🥲. Food photography is clearly
            something I have not learnt yet. Hopefully, one day...
          </p>
        </div>
      </div>
    </div>
  );
}
