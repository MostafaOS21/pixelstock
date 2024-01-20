import { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { orientationsList, sizesList } from "@/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { RxCross1 } from "react-icons/rx";
import { CiFilter } from "react-icons/ci";

// Sheet
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Filter Results Component
interface IFilterResultsProps {
  setCurrentColor?: Dispatch<SetStateAction<string | null>>;
  setCurrentOrientation: Dispatch<SetStateAction<string | null>>;
  setCurrentSize: Dispatch<SetStateAction<string | null>>;
  orientation: string | null;
  color?: string | null;
  size: string | null;
  isFull?: boolean;
  type: "photo" | "video";
}

// Select Filters Component
function SelectFilters({
  setCurrentColor,
  setCurrentSize,
  setCurrentOrientation,
  orientation,
  color,
  size,
  isFull,
  type,
}: IFilterResultsProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const selectStylesClass = `text-base font-medium  capitalize ${
    isFull ? "w-full" : "w-[180px]"
  }`;

  return (
    <>
      {/* Orientation */}
      <Select
        onValueChange={(value) => {
          setCurrentOrientation(value === "default" ? null : value);
          const searchParams = new URLSearchParams(location.search);

          if (value === "default") {
            searchParams.delete("orientation");
          } else {
            searchParams.set("orientation", value);
          }

          navigate(`${location.pathname}?${searchParams.toString()}`);
        }}
        defaultValue={orientation || "default"}
      >
        <SelectTrigger className={selectStylesClass}>
          <SelectValue placeholder="Orientation" />
        </SelectTrigger>
        <SelectContent className="z-[1000]">
          {orientationsList.map((item) => (
            <SelectItem value={item} className="text-lg capitalize" key={item}>
              {item === "default" ? "Orientation" : item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Size */}
      <Select
        onValueChange={(value) => {
          setCurrentSize(value === "default" ? null : value);
          const searchParams = new URLSearchParams(location.search);

          if (value === "default") {
            searchParams.delete("size");
          } else {
            searchParams.set("size", value);
          }

          navigate(`${location.pathname}?${searchParams.toString()}`);
        }}
        defaultValue={size || "default"}
      >
        <SelectTrigger className={selectStylesClass}>
          <SelectValue placeholder="Orientation" />
        </SelectTrigger>
        <SelectContent className="z-[1000]">
          {sizesList.map((item) => (
            <SelectItem value={item} className="text-lg capitalize" key={item}>
              {item === "default" ? "size" : item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Color */}
      {type === "photo" && (
        <div className="flex gap-1 items-center">
          <Button
            variant={"outline"}
            className={`relative w-[150px] !text-base text-left flex justify-start ${
              isFull && "flex-1"
            }`}
          >
            {color ? color : "Color"}
            <input
              type="color"
              className="absolute left-0 w-full h-full opacity-0"
              onChange={(e) => {
                if (!setCurrentColor) return;
                setCurrentColor(e.target.value);
                const searchParams = new URLSearchParams(location.search);

                if (e.target.value === "#000000") {
                  searchParams.delete("color");
                } else {
                  searchParams.set("color", e.target.value);
                }

                navigate(`${location.pathname}?${searchParams.toString()}`);
              }}
            />
          </Button>
          {color && (
            <Button
              variant={"outline"}
              onClick={() => {
                if (!setCurrentColor) return;
                setCurrentColor(null);

                const searchParams = new URLSearchParams(location.search);

                searchParams.delete("color");

                navigate(`${location.pathname}?${searchParams.toString()}`);
              }}
            >
              <RxCross1 />
            </Button>
          )}
        </div>
      )}
    </>
  );
}

export default function FilterResults({
  setCurrentColor,
  setCurrentSize,
  setCurrentOrientation,
  orientation,
  color,
  size,
  type,
}: IFilterResultsProps) {
  return (
    <div className="mx-auto w-fit lg:mx-0">
      <div className="px-4 py-3 mb-4 hidden lg:flex items-center gap-4">
        <SelectFilters
          size={size}
          setCurrentSize={setCurrentSize}
          setCurrentOrientation={setCurrentOrientation}
          setCurrentColor={setCurrentColor}
          orientation={orientation}
          color={color}
          type={type}
        />
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="w-[330px] mx-auto mb-6 flex justify-start gap-7 lg:hidden"
          >
            <CiFilter /> Filter
          </Button>
        </SheetTrigger>
        <SheetContent side={"bottom"} className="z-[1000]">
          <div className="py-7 flex flex-col gap-6">
            <SelectFilters
              size={size}
              setCurrentSize={setCurrentSize}
              setCurrentOrientation={setCurrentOrientation}
              setCurrentColor={setCurrentColor}
              orientation={orientation}
              color={color}
              isFull={true}
              type={type}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
