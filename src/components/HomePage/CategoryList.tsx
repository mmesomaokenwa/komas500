import CategoryItemsCard, { GetFor } from "./CategoryItemsCard";
import CustomSlider from "@/components/General/CustomSlider";
import { EmblaOptionsType } from "embla-carousel";
import { NextArrow, PrevArrow } from "./CustomArrows";
import { Category } from "@/lib/types";

const settings: EmblaOptionsType = {
  loop: true,
  align: "start",
  slidesToScroll: 1,
  skipSnaps: true,
  breakpoints: {
    "(min-width: 640px)": {
      slidesToScroll: 1,
    },
    "(min-width: 1024px)": {
      slidesToScroll: 2,
    },
    "(min-width: 1280px)": {
      slidesToScroll: 3,
    },
  },
};

type PropsType = {
  title?: string
  categories: Category[]
  selectedCategory: string
  baseRoute: string
  stopNavigateScroll?: boolean
  getItemsLengthFor: GetFor
  vendorId?: string
};

const CategoryList = ({title, categories, getItemsLengthFor, selectedCategory, baseRoute, stopNavigateScroll, vendorId }: PropsType) => {
  return (
    <section className="w-full px-2">
      <div className="max-w-6xl mx-auto">
        {title && <h2 className="text-xl ml-2 mb-3 font-semibold">{title}</h2>}
        {categories.length ? (
          <CustomSlider
            options={settings}
            customArrows={{
              prev: <PrevArrow />,
              next: <NextArrow />,
            }}
            classNames={{
              innerWrapperItem:
                "w-1/3 sm:w-1/4 md:w-[calc(100%/5)] lg:w-[calc(100%/7)] px-2 pb-2",
            }}
          >
            {categories.map((category) => (
              <CategoryItemsCard
                key={category._id}
                category={category}
                getItemsLengthFor={getItemsLengthFor}
                stopNavigateScroll={stopNavigateScroll}
                baseRoute={baseRoute}
                isSelected={selectedCategory === category._id}
                vendorId={vendorId}
              />
            ))}
          </CustomSlider>
        ) : (
          <div className="w-[calc(100%-16px)] h-[200px] mx-auto flex items-center justify-center rounded-md bg-gray-100">
            <p className="font-medium text-center">No categories here</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryList;
