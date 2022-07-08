import { useSelector } from "react-redux";
import { PostCard, SidebarCard, WidgetCard } from "../components";

export const Hero = () => {
  const { data } = useSelector((state) => state);

  return (
    <>
      <div className="flex justify-around  flex-start md:px-8 ">
        <section className="hidden md:block w-3/12">
          <SidebarCard />
        </section>
        <section className="w-full md:w-6/12 feed justify-start h-88 overflow-y-scroll items-center flex-col  px-4">
          <div
            className={`${
              data.theme
                ? "bg-white text-black border-gray-200"
                : "bg-black text-white border-gray-800"
            } max-w-lg rounded border  break-words`}
          >
            <PostCard />
          </div>
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
