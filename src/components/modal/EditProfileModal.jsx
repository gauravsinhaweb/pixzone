import { useRef } from "react";
import { useSelector } from "react-redux";
import { submitEditUser } from "../../utils";

export const EditProfileModal = ({ setIsOpen, isOpen }) => {
  const { data } = useSelector((state) => state);
  const nameRef = useRef();
  const usernameRef = useRef();
  const bioRef = useRef();
  const linkRef = useRef();

  const inputData = [
    {
      name: "name",
      label: "Name",
      type: "text",
      id: "name",
      value: "",
      placeholder: "John Doe",
      required: true,
      ref: nameRef,
    },
    {
      name: "username",
      label: "Username",
      type: "text",
      id: "username",
      value: "",
      placeholder: "@johndoe",
      required: true,
      ref: usernameRef,
    },
    {
      name: "bio",
      label: "bio",
      type: "text",
      id: "bio",
      value: "",
      placeholder: "Proident reprehenderit dolore.",
      required: false,
      ref: bioRef,
    },
    {
      name: "link",
      label: "Link",
      type: "text",
      id: "link",
      value: "",
      placeholder: "www.johndoe.com",
      required: false,
      ref: linkRef,
    },
  ];

  return (
    <div className="w-96">
      <h1 className="text-center font-medium text-xl">Edit Profile</h1>
      <form
        className="mt-4"
        onSubmit={(e) =>
          submitEditUser(
            e,
            data,
            nameRef,
            usernameRef,
            bioRef,
            linkRef,
            setIsOpen,
            isOpen
          )
        }
      >
        {inputData.map((item, ind) => (
          <div key={ind} className="flex gap-2 py-4">
            <label className="text-lg capitalize" htmlFor={item.id}>
              {item.label + ":"}
            </label>
            <input
              className="w-full resize-none bg-transparent border-b-2 border-indigo-500 px-2 focus:outline-none focus:shadow-none  text-lg"
              type={item.type}
              id={item.id}
              name={item.name}
              placeholder={item.placeholder}
              ref={
                item.name === "name"
                  ? nameRef
                  : item.name === "username"
                  ? usernameRef
                  : item.name === "bio"
                  ? bioRef
                  : linkRef
              }
              required={item.required}
            />
          </div>
        ))}
        <div className="flex items-center justify-end">
          {/* <button type="button">Submit</button> */}
          <input
            type="submit"
            value="Submit"
            onSubmit={(e) =>
              submitEditUser(
                e,
                data,
                nameRef,
                usernameRef,
                bioRef,
                linkRef,
                setIsOpen,
                isOpen
              )
            }
            className={`px-2 py-2 cursor-pointer text-sm font-bold rounded-full ${
              data.theme ? "bg-gray-600 text-white" : "bg-white text-black"
            }`}
          />
        </div>
      </form>
    </div>
  );
};
