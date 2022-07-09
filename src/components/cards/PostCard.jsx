import { useRef, useState } from "react";
import { FaRegImages, FaRegSmile } from "../../assets/icons";
import defaultImg from "../../assets/user.png";
import { postHandler, uploadImageHandler } from "../../utils";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";

export const PostCard = () => {
  const id = uuid();
  const [showEmojis, setShowEmojis] = useState(false);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [inputText, setInputText] = useState("");
  const selectedImageRef = useRef();
  const dispatch = useDispatch();
  const { data, auth } = useSelector((state) => state);

  const showEmojisHandler = (e) => {
    setShowEmojis(!showEmojis);
    if (e.target.classList.contains("backdrop")) {
      setShowEmojis(false);
    }
  };
  const emojis = [
    "🙂",
    "😊",
    "🤗",
    "😄",
    "😅",
    "😆",
    "😂",
    "🤣",
    "😋",
    "😜",
    "🙃",
    "😴",
    "🤯",
    "🥳",
    "🥰",
    "😘",
    "😍",
    "🤩",
    "😇",
    "😎",
  ];
  return (
    <>
      <div className="flex justify-between gap-6 pt-8 px-4">
        <div className="bg-gray-300 h-10 w-10  rounded-full overflow-hidden ">
          <img
            src={auth.isAuthenticated ? auth.user.photoURL : defaultImg}
            alt={auth.user?.displayName}
          />
        </div>
        <div className="flex-1 flex flex-col ">
          <textarea
            rows={2}
            cols={50}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="What's happening?"
            id="input-text"
            autoComplete="off"
            type="text"
            className="w-full resize-none bg-transparent border-none focus:outline-none focus:shadow-none text-xl "
          />
          <label className="" htmlFor="input-text"></label>
          <div className="flex justify-between items-baseline">
            <div className="flex items-baseline gap-4 text-xl text-sky-400">
              <input
                id="input-image"
                type="file"
                ref={selectedImageRef}
                className="hidden"
                onChange={(e) =>
                  uploadImageHandler(
                    selectedImageRef,
                    setImageUploadProgress,
                    e,
                    dispatch
                  )
                }
              />
              <label htmlFor="input-image" className="cursor-pointer z-10">
                <FaRegImages />
              </label>
              <button
                onClick={() => setShowEmojis(!showEmojis)}
                className="cursor-pointer z-10"
              >
                <FaRegSmile />
              </button>
              {showEmojis && (
                <div
                  onClick={(e) => showEmojisHandler(e)}
                  className="backdrop fixed inset-0"
                >
                  <div className="absolute w-fit md:right-72 top-24 md:top-36 md:pt-4 inset-0 m-auto bg-transparent">
                    <div className="flex w-28 bg-gray-700 rounded flex-wrap">
                      {emojis.map((emoji, index) => (
                        <span
                          onClick={() => setInputText(inputText + emoji)}
                          key={index}
                          className="text-sky-400 cursor-pointer"
                        >
                          {emoji}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div>
              <button
                disabled={!inputText}
                onClick={() =>
                  postHandler(
                    auth,
                    id,
                    inputText,
                    data,
                    setInputText,
                    setImageUploadProgress,
                    selectedImageRef,
                    dispatch
                  )
                }
                className={`${
                  inputText
                    ? "font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600 text-white"
                    : "text-gray-600 font-bold"
                } p-1 px-4 rounded-lg`}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        {imageUploadProgress > 0 && (
          <div className="w-full bg-gray-900 h-0.5">
            <div
              className={`bg-green-400 h-0.5 mt-2`}
              style={{ width: imageUploadProgress + "%" }}
            ></div>
          </div>
        )}
      </div>
    </>
  );
};
