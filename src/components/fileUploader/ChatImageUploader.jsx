"use client";
import { ImagePlus } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

const ChatImageUploader = ({ onImageUpload }) => {
  const [image, setImage] = useState();
  const inputRef = useRef(null);

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    if (onImageUpload) {
      onImageUpload(file); // Pass the image to the parent
    }
  };

  return (
    <div onClick={handleImageClick}>
      {image ? (
        <div className="relative w-[50px] h-[50px] overflow-hidden">
          <Image src={URL.createObjectURL(image)} alt={"image"} fill />
        </div>
      ) : (
        <ImagePlus className="text-[#98A2B3]" size={20}/>
      )}
      <input
        type="file"
        ref={inputRef}
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default ChatImageUploader;
