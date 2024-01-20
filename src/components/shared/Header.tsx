import { Moon, Search, Sun } from "react-feather";
import MobileNav from "./MobileNav";
import Logo from "../ui/Logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdHistory } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HISTORY_KEY, THEME_KEY } from "@/constants";
import {
  selectMediaType,
  selectSingleItem,
} from "@/redux/features/single_item/singleItemSlice";
import { IImageInterface } from "@/redux/features/photos/photosSlice";
import { IVideoInterface } from "@/redux/features/videos/videosSlice";
import {
  addFavorite,
  removeFavorite,
  selectFavorites,
} from "@/redux/features/favorites/favoritesSlice";
import { useState } from "react";
import { IoImageOutline, IoVideocamOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { signal } from "@preact/signals-react";

const filter = signal<"video" | "photo">("photo");
// Tabs Component
function SearchFilterTabs() {
  return (
    <div className="tabs-container">
      <div>
        <input
          type="radio"
          name="filter"
          value="photos"
          id="photo"
          onClick={() => {
            filter.value = "photo";
          }}
          defaultChecked
        />
        <label htmlFor="photo">
          <IoImageOutline /> photos
        </label>
      </div>
      <div>
        <input
          type="radio"
          name="filter"
          value="videos"
          id="video"
          onClick={() => {
            filter.value = "video";
          }}
        />
        <label htmlFor="video">
          <IoVideocamOutline /> videos
        </label>
      </div>
    </div>
  );
}

type history = {
  query: string;
  filter: string;
};

const history = signal<history[]>([]);
// Search history component
function SearchHistory({ isShown }: { isShown: boolean }) {
  const historyStorage = window.localStorage.getItem(HISTORY_KEY);

  if (historyStorage) {
    try {
      history.value = JSON.parse(historyStorage).slice(0, 6);
    } catch (error) {
      history.value = [];
    }
  }

  // Blur the form input
  const handleFormBlur = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement;
    if (!form) return;
    form.classList.remove("active");

    form.blur();
  };

  // Change order of history items
  const handleClickHistoryItem = (currItem: Link) => {
    const searchHistory = window.localStorage.getItem(HISTORY_KEY);
    if (searchHistory) {
      const parsedSearchHistory = JSON.parse(searchHistory) as Link[];
      const newSearchHistory = parsedSearchHistory.filter((item) => {
        return item.query !== currItem.query;
      });

      window.localStorage.setItem(
        HISTORY_KEY,
        JSON.stringify([currItem, ...newSearchHistory])
      );
    }

    handleFormBlur();
  };

  // Delete history item
  const handleDeleteHistory = (query: string) => {
    const searchHistory = window.localStorage.getItem(HISTORY_KEY);

    if (searchHistory) {
      try {
        const parsedSearchHistory = (
          JSON.parse(searchHistory) as {
            query: string;
            filter: string;
          }[]
        ).filter((item) => {
          return item.query !== query;
        });

        window.localStorage.setItem(
          HISTORY_KEY,
          JSON.stringify(parsedSearchHistory)
        );
      } catch (error) {
        window.localStorage.setItem(HISTORY_KEY, JSON.stringify([]));
      }
    }

    handleFormBlur();
  };

  let commandItems = history.value.map((item, index) => {
    if (item?.query && item?.filter) {
      return (
        <CommandItem key={item.query + index} className="command-item p-0">
          <Link
            to={`/search/${item.filter}/${item.query}`}
            className="history-item"
            onClick={() => {
              handleClickHistoryItem(item);
            }}
          >
            <MdHistory />
            {item.query.toLowerCase()}
          </Link>
          <Button
            variant={"link"}
            className="delete-item-button rounded-full p-3 h-fit"
            type="button"
            onClick={() => handleDeleteHistory(item.query)}
          >
            <RxCross1 />
          </Button>
        </CommandItem>
      );
    }
  });

  return (
    <Command className={`search-command hidden ${isShown && "block"}`}>
      <SearchFilterTabs />
      <CommandList className="h-full">
        <CommandEmpty>No history found.</CommandEmpty>
        <CommandGroup className="history-container">
          {commandItems}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

// Search Bar
type Link = {
  query: string;
  filter: string;
};

function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  // handle Submitting Search
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const filter = (formData.get("filter") as string) ?? "photos";
    const query = formData.get("query") as string;
    const searchHistory = window.localStorage.getItem(HISTORY_KEY);

    const link: Link = {
      query,
      filter,
    };
    if (searchHistory) {
      try {
        const parsedSearchHistory = JSON.parse(searchHistory) as Link[];
        const isAlreadyInHistory = parsedSearchHistory.some((item) => {
          return item.query === link.query;
        });

        if (!isAlreadyInHistory) {
          window.localStorage.setItem(
            HISTORY_KEY,
            JSON.stringify([link, ...parsedSearchHistory])
          );
        } else {
          const newHistory = parsedSearchHistory.filter(
            (item) => item.query !== link.query
          );
          window.localStorage.setItem(
            HISTORY_KEY,
            JSON.stringify([link, ...newHistory])
          );
        }
      } catch (error) {
        window.localStorage.setItem(HISTORY_KEY, JSON.stringify([link]));
      }
    } else {
      window.localStorage.setItem(HISTORY_KEY, JSON.stringify([link]));
    }
    if (filter === "photos") navigate(`/search/photos/${query}`);
    else if (filter === "videos") navigate(`/search/videos/${query}`);

    // Blur the form input
    const searchInput = document.querySelector(
      ".search-form input"
    ) as HTMLInputElement;
    searchInput.blur();

    // Remove active from the form
    const form = document.querySelector(".search-form") as HTMLFormElement;
    form.classList.remove("active");
  };

  return (
    <>
      <form
        className="search-form"
        tabIndex={0}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          const { currentTarget, relatedTarget } = e;

          const item =
            relatedTarget?.id === "video" ||
            relatedTarget?.id === "photo" ||
            relatedTarget?.classList[0] === "history-item" ||
            relatedTarget?.classList?.contains("delete-item-button");
          const tagName =
            relatedTarget?.tagName === "INPUT" ||
            relatedTarget?.tagName === "A" ||
            relatedTarget?.tagName === "BUTTON";
          const isInForm = currentTarget?.contains(relatedTarget);

          if (item && tagName && isInForm) {
            return currentTarget.focus();
          }

          setIsFocused(false);
        }}
        onSubmit={handleSubmit}
      >
        <Search />
        <input
          placeholder="Search..."
          className="bg-transparent outline-0 w-[300px] md:w-[400px] lg:w-[500px] py-1 "
          id="searchInput"
          name="query"
          required
          autoComplete="off"
        />

        {<SearchHistory isShown={isFocused} />}
      </form>
      <div
        className="overlay"
        onClick={() => {
          const form = document.querySelector(".search-form");

          if (!form) return;
          form.classList.remove("active");
        }}
      ></div>
    </>
  );
}

export default function Header({ isIsolated }: { isIsolated?: boolean }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const singleItem = useSelector(selectSingleItem);
  const mediaType = useSelector(selectMediaType);
  const isInFavorites = useSelector(selectFavorites).some(
    (fav: { id?: number }) => {
      return fav?.id === singleItem?.id;
    }
  );
  const [isFavorite, setIsFavorite] = useState(isInFavorites);
  let downloadButton, downloadLinks;
  const circleButtonClasses =
    "relative hover:bg-white-50 hover:dark:bg-dark-50 dark:text-white-PURE bg-transparent text-black rounded-full p-1 lg:p-3 transition-colors text-xl";

  // Download button and links selector
  if (singleItem) {
    downloadButton =
      mediaType === "photo" ? (
        <a href={(singleItem as IImageInterface).src.original} target="_blank">
          Download
        </a>
      ) : (
        <a
          href={
            (singleItem as IVideoInterface).video_files.filter(
              (file) => file.quality === "hd"
            )[0]?.link
          }
          target="_blank"
        >
          Download
        </a>
      );

    downloadLinks =
      mediaType === "photo"
        ? Object.entries((singleItem as IImageInterface).src).map(
            ([key, value]) => (
              <DropdownMenuItem
                key={value}
                className="text-lg dark:hover:bg-dark-50"
              >
                <a
                  href={value}
                  className="flex justify-between items-center w-full h-full px-10"
                  target="_blank"
                >
                  {key}
                </a>
              </DropdownMenuItem>
            )
          )
        : (singleItem as IVideoInterface).video_files.map((link) => (
            <DropdownMenuItem key={link.id} className="text-lg">
              <a
                href={link.link}
                className="flex justify-start items-center gap-4 text-left w-full h-full pe-10"
                target="_blank"
              >
                <p className="font-medium">{link.quality.toUpperCase()}</p>
                <p>
                  {link.width}x{link.height}
                </p>
              </a>
            </DropdownMenuItem>
          ));
  }

  let selector = downloadButton && (
    <div className="flex items-center h-[35px] md:h-[40px] gap-[1px] text-white-PURE dark:text-white-100 relative md:ml-auto">
      <Button className="bg-primary dark:bg-primary-100 h-full rounded-s-full rounded-e-none px-2 md:px-3 ">
        {downloadButton}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-0 h-full bg-primary dark:bg-primary-100 px-2 rounded-e-full ms-auto me-1 md:me-3 flex items-center">
          <IoMdArrowDropdown />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="-ms-12 dark:bg-dark-100">
          {downloadLinks}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  // Favorites button and adding/removing from favorites
  const handleRemovingFromFavorites = (id: number) => {
    if (!id) return;

    setIsFavorite(false);
    dispatch(removeFavorite(id));
  };

  const handleAddingToFavorites = (item: IImageInterface | IVideoInterface) => {
    if (!item) return;

    setIsFavorite(true);
    dispatch(addFavorite({ item, type: mediaType }));
  };

  let favoritesButton = downloadButton && (
    <Button
      className={
        circleButtonClasses + " text-2xl text-primary dark:text-primary-100"
      }
      onClick={() => {
        if (isFavorite) {
          handleRemovingFromFavorites(singleItem?.id);
        } else {
          handleAddingToFavorites(
            singleItem as IImageInterface | IVideoInterface
          );
        }
      }}
    >
      {isFavorite ? <IoHeartSharp /> : <IoHeartOutline />}
    </Button>
  );

  // Handle dark mode
  const handleDarkMode = () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      localStorage.setItem(THEME_KEY, "true");
    } else {
      localStorage.removeItem(THEME_KEY);
    }
  };

  // Go back to previous page
  const goBack = () => {
    navigate(-1);
  };

  return (
    <header
      className={` ${
        !isIsolated && "fixed"
      }  w-full bg-white-PURE dark:bg-dark-100 z-[999]`}
    >
      <div className="wrapper flex justify-between">
        <div className="flex items-center gap-8">
          {isIsolated && (
            <button className={circleButtonClasses} onClick={goBack}>
              <FaArrowLeft />
            </button>
          )}
          {!isIsolated && <MobileNav />}
          <Logo />
        </div>

        {!isIsolated && <SearchBar />}

        {isIsolated && selector}
        {isIsolated && favoritesButton}
        {!isIsolated && (
          <button
            className={circleButtonClasses + " ms-auto me-3 lg:hidden"}
            onClick={() => {
              const form = document.querySelector(
                ".search-form"
              ) as HTMLFormElement;

              const searchInput = document.getElementById(
                "searchInput"
              ) as HTMLInputElement;

              if (!form && !searchInput) return;
              form.classList.add("active");
              searchInput.focus();
            }}
          >
            <Search />
          </button>
        )}

        <button className={circleButtonClasses} onClick={handleDarkMode}>
          <Moon className="dark:hidden" />
          <Sun className="hidden dark:block" />
        </button>
      </div>
    </header>
  );
}
