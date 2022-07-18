import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "../../redux/reducers/dataSlice";

export const SidebarCard = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state);
  return (
    <>
      <ul className="pl-0 cursor-pointer flex flex-col justify-center items-end px-24">
        <li
          onClick={() =>
            dispatch(
              dataActions.setShowPopular({
                showPopular: !data.showPopular,
              })
            )
          }
          className="py-2 cursor-pointer"
        >
          popular
        </li>
        <li
          onClick={() =>
            dispatch(
              dataActions.setShowRecent({
                showRecent: !data.showRecent,
              })
            )
          }
          className="py-2 cursor-pointer"
        >
          recent
        </li>
        <li
          onClick={() =>
            dispatch(
              dataActions.setShowTrending({
                showTrending: !data.showTrending,
              })
            )
          }
          className="py-2 cursor-pointer"
        >
          {" "}
          trending{" "}
        </li>
      </ul>
    </>
  );
};
