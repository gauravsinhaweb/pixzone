import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "../../redux/reducers/dataSlice";

export const SidebarCard = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state);
  return (
    <>
      <ul className="pl-0 flex flex-col justify-center items-end px-24">
        <li>
          <button
            onClick={() =>
              dispatch(
                dataActions.setShowPopular({
                  showPopular: !data.showPopular,
                })
              )
            }
            className="py-2 cursor-pointer focus:text-white text-gray-600 capitalize"
          >
            popular
          </button>
        </li>
        <li>
          <button
            onClick={() =>
              dispatch(
                dataActions.setShowRecent({
                  showRecent: !data.showRecent,
                })
              )
            }
            className="py-2 cursor-pointer focus:text-white text-gray-600 capitalize"
          >
            recent
          </button>
        </li>
        <li>  
          <button
            onClick={() =>
              dispatch(
                dataActions.setShowTrending({
                  showTrending: !data.showTrending,
                })
              )
            }
            className="py-2 cursor-pointer focus:text-white text-gray-600 capitalize"
          >
            trending
          </button>
        </li>
      </ul>
    </>
  );
};
