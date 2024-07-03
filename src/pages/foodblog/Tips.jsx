import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the CSS for the carousel
import { Carousel } from "react-responsive-carousel";
import data from "../../data/tips.json";

export default function Tips() {
  return (
    <div className="bg-gray-100 p-8">
      <h2 className="text-4xl font-bold mb-8 text-center">
        Cooking Tips and Tricks
      </h2>
      <div className="max-w-xl mx-auto">
        <Carousel
          showThumbs={false}
          showStatus={false}
          autoPlay
          interval={3000}
          infiniteLoop
        >
          {data.map((tip, index) => (
            <div key={index}>
              <img
                src={tip.image}
                alt={tip.title}
                className="h-64 w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                <h3 className="text-xl font-bold">{tip.title}</h3>
                <p>{tip.content}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
