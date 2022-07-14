import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  FeedCard,
  PostCard,
  ProfileCard,
  SidebarCard,
  WidgetCard,
} from "../components";
import { dataActions } from "../redux/reducers/dataSlice";

export const Hero = () => {
  const { data } = useSelector((state) => state);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      dataActions.setUserID({
        userID: id,
      })
    );
  }, [dispatch, id]);

  return (
    <>
      <div className="flex justify-around  flex-start md:px-8 ">
        <section className="hidden md:block w-3/12">
          <SidebarCard />
        </section>
        <section className="w-full md:w-6/12 feed justify-start h-88 overflow-y-scroll items-center flex-col  md:px-4">
          {id ? (
            <div
              className={`${
                data.theme
                  ? "bg-white text-black border-gray-200"
                  : "bg-black text-white border-gray-800"
              } max-w-lg rounded border  break-words`}
            >
              <ProfileCard />
            </div>
          ) : (
            <div
              className={`${
                data.theme
                  ? "bg-white text-black border-gray-200"
                  : "bg-black text-white border-gray-800"
              } max-w-lg rounded border  break-words`}
            >
              <PostCard id={id} />
            </div>
          )}
          {data.feed &&
            data.feed.map((post) => (
              <div
                key={post.id}
                className={`${
                  data.theme
                    ? "bg-white text-black border-gray-200 hover:bg-gray-100"
                    : "bg-black text-white border-gray-800 hover:bg-gray-900"
                } max-w-lg border break-words p-4 `}
              >
                <FeedCard post={post} data={data} />
              </div>
            ))}
        </section>
        <section className="hidden md:block w-3/12">
          <div
            className={`${
              data.theme
                ? "bg-white text-black border-gray-200"
                : "bg-black text-white border-gray-800"
            } w-4/5 rounded-br-xl rounded-bl-xl border p-4`}
          >
            <WidgetCard />
          </div>
        </section>
      </div>
    </>
  );
};
