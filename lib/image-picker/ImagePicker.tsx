import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";

import ReactCrop, {
  centerCrop,
  Crop,
  makeAspectCrop,
  PixelCrop,
} from "react-image-crop";

import { Button, Input } from "@/components";
import { useToast } from "@/context/ToastContext";
import { CursorArrowRaysIcon, XCircleIcon } from "@heroicons/react/24/outline";
import "react-image-crop/dist/ReactCrop.css";
import { getCroppedImage, isValidHttpUrl } from "./utils";

interface Props {
  aspect: number;
  children: React.ReactNode;
  onChange: (croppedSrc: string | null) => void;
}

const centerAspectCrop = (
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) => {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 100,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
};

const ImagePicker: React.FC<Props> = ({ aspect, children, onChange }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [imageLink, setImageLink] = useState("");
  const [src, setSrc] = useState("");
  const [crop, setCrop] = useState<Crop>();
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [fetchingImage, setFetchingImage] = useState(false);

  const { addToast } = useToast();

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined);
      setImageLink("");
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setSrc(reader.result?.toString() || "");
        onChange(reader.result?.toString() || "");
      });
      reader.readAsDataURL(e.target.files[0]);
    }
    e.target.value = "";
    e.target.files = null;
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  };

  // function to fetch image data from image link
  const getBase64FromUrl = async () => {
    if (isValidHttpUrl(imageLink)) {
      try {
        setFetchingImage(true);
        let blob = await fetch(imageLink).then((r) => r.blob());

        let dataUrl = await new Promise((resolve) => {
          let reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });

        if (typeof dataUrl === "string") {
          setSrc(dataUrl);
          setTimeout(() => {
            getBase64FromCanvas();
          });
        }
      } catch (error) {
        addToast({
          message: "Failed to fetch image!",
          description:
            "Seems like the url that you have entered is invalid or corrupted. Please check once.",
          type: "error",
        });
      } finally {
        setFetchingImage(false);
      }
    } else {
      addToast({
        message: "Please enter a valid url",
        type: "error",
      });
    }
  };

  const getBase64FromCanvas = async () => {
    if (
      completedCrop?.width &&
      completedCrop?.height &&
      imgRef.current &&
      previewCanvasRef.current
    ) {
      getCroppedImage(imgRef.current, previewCanvasRef.current, completedCrop)
        .then((cropped) => {
          onChange(cropped);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const resetImageSelection = () => {
    setSrc("");
    setImageLink("");
    onChange(null);
  };

  useEffect(() => {
    getBase64FromCanvas();
  }, [completedCrop]);

  return (
    <>
      <Menu as="div" className="relative">
        <Menu.Button as="div">{children}</Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute md:w-96 w-72 p-3 right-0 z-30 top-full mt-2 origin-top-right dark:bg-black bg-white overflow-auto text-sm rounded-sm outline outline-[1px] dark:outline-zinc-400 outline-zinc-300 dark:dark:text-white text-zinc-900">
            <div className="flex md:flex-row flex-col justify-start items-end w-full gap-2 mb-4">
              <Input
                label="Image url"
                className="w-full"
                containerClassName="w-full"
                placeholder="Enter image url..."
                value={imageLink}
                onChange={(e) => {
                  setImageLink(e.target.value);
                }}
              />
              <Button
                disabled={fetchingImage}
                className="mb-[1px]"
                onClick={getBase64FromUrl}
              >
                {fetchingImage ? "Fetching..." : "Upload"}
              </Button>
            </div>
            <label
              role={"button"}
              className="w-full inline-flex items-center text-center dark:border-zinc-400 border-zinc-400 rounded-sm px-2 py-1 border-[1px] text-zinc-900 dark:text-white"
              htmlFor="image-picker"
            >
              <CursorArrowRaysIcon className="h-4 w-4 mr-2" /> Choose image
            </label>
            <input
              type="file"
              className="hidden"
              id="image-picker"
              accept="image/*"
              onChange={onSelectFile}
            />
            {!!src && (
              <div className="w-full flex flex-col justify-start items-end">
                <button onClick={resetImageSelection}>
                  <XCircleIcon className="h-6 w-6 my-2 dark:text-white text-zinc-900" />
                </button>
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  aspect={aspect}
                  onComplete={setCompletedCrop}
                  className="border-[1px]"
                >
                  <img
                    ref={imgRef}
                    alt="Crop me"
                    src={src}
                    onLoad={onImageLoad}
                  />
                </ReactCrop>
              </div>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
      <div className="absolute hidden">
        {!!completedCrop && (
          <canvas
            ref={previewCanvasRef}
            style={{
              border: "1px solid black",
              objectFit: "contain",
              width: completedCrop.width,
              height: completedCrop.height,
            }}
          />
        )}
      </div>
    </>
  );
};

export default ImagePicker;
