import React from "react";
import Skeleton from "react-loading-skeleton";
import { useStore } from "../../context/ModalContext";
const Photos = ({ photos }) => {
  const { setImageSrc, setToggleModal } = useStore();
  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {!photos ? (
          <Skeleton
            containerClassName="flex gap-1"
            count={4}
            height={300}
            width={240}
          />
        ) : photos.length > 0 ? (
          photos.map((photo) => {
            return (
              <div
                onClick={() => {
                  setImageSrc(photo.imageSrc);
                  setToggleModal(true);
                }}
                className="w-[15rem] cursor-pointer"
                key={photo.docId}
              >
                <img
                  className="w-full"
                  src={photo.imageSrc}
                  alt="profiles images"
                />
              </div>
            );
          })
        ) : (
          <p>No posts yet</p>
        )}
      </div>
    </>
  );
};

export default Photos;
