"use client";
import { useState } from "react";

const images = [
  "/img1.jpg",
  "/img2.jpg",
  "/img3.jpg",
  "/img4.jpg",
  "/img5.jpg",
  "/img6.jpg",
];

const ImageGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string>(images[0]);

  return (
    <div className="max-w-[1200px] mx-auto my-12 px-4">
      <div className="flex flex-col md:flex-row md:items-start md:justify-center">
        {/* Image principale */}
        <div className="w-full h-[300px] md:h-[600px] md:w-3/4 ">
          <img
            src={selectedImage}
            alt="Selected"
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        {/* Miniatures */}
        <div className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-4 mt-4 md:mt-0 md:ml-4 overflow-x-auto md:overflow-x-visible">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className={`w-full h-16 object-cover rounded-md cursor-pointer transition-all duration-300 ${
                selectedImage === image ? "ring-2 ring-yellow-500" : ""
              }`}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
