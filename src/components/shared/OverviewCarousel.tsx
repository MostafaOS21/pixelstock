import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { signal } from "@preact/signals-react";
import { IoIosArrowRoundForward } from "react-icons/io";

function BannerLayout({
  children,
  headerText,
  paragraphText,
  linkRoute,
  gradientColors,
  darkColor,
}: {
  children: React.ReactNode;
  headerText: string[];
  paragraphText: string;
  linkRoute: string;
  gradientColors: string;
  darkColor?: string;
}) {
  return (
    <div className="relative h-full w-full">
      <div className="banner-layout">{children}</div>
      <div
        className={
          `absolute bg-gradient-to-t xl:bg-gradient-to-r  from-20% via-20% left-0 top-1/2 -translate-y-1/2 h-[102%]
      flex flex-col justify-end items-center text-center xl:text-left xl:items-start xl:justify-center pb-10 xl:pb-0 xl:ps-32 w-full gap-3 dark:text-black ` +
          gradientColors
        }
      >
        <h2 className="text-[2.2rem] xl:text-[3.2rem]">
          {headerText.map((text, index, arr) => {
            return (
              <div key={index + text}>
                {text}
                {index !== arr.length - 1 && <br />}
              </div>
            );
          })}
        </h2>
        <p>{paragraphText}</p>
        <Button
          className={"btn mx-auto xl:ms-0 xl:me-auto text-lg " + darkColor}
        >
          <Link to={linkRoute} className="flex items-center gap-1">
            Explore Now <IoIosArrowRoundForward className="text-3xl" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function ImagesBanner() {
  const path = "src/assets/images/photo-banner-";
  let content = [];

  for (let i = 1; i <= 6; i++) {
    const imgPath = `${path}${i}.jpg`;
    content.push(
      <div
        style={{
          gridArea: `b${i}`,
        }}
        key={imgPath}
      >
        <img src={`${imgPath}`} alt="banner" className="rounded-2xl" />
      </div>
    );
  }

  return (
    <BannerLayout
      headerText={["High quality stock ", "photos for free!"]}
      paragraphText="Explore our exceptional collection of high quality stock images."
      linkRoute="/curated-photos"
      gradientColors={"from-[#6ef6f3] to-[#6ef6f44d]"}
    >
      {content}
    </BannerLayout>
  );
}

function VideosBanner() {
  const vidPath = "src/assets/videos/video-banner-";
  let content = [];
  for (let i = 1; i <= 6; i++) {
    const videoPath = `${vidPath}${i}.mp4`;
    content.push(
      <div
        style={{
          gridArea: `b${i}`,
        }}
        key={videoPath}
        className="rounded-2xl"
      >
        <video
          src={`${videoPath}`}
          autoPlay
          muted
          loop
          key={videoPath}
          className="rounded-2xl h-full"
        />
      </div>
    );
  }
  //
  return (
    <BannerLayout
      headerText={["Top rated stock ", " videos for free!"]}
      paragraphText="Our curated videos is sure to inspire and captivate."
      linkRoute="/popular-videos"
      gradientColors={"from-[#ffdbb4] to-[#ffdbb46f]"}
    >
      {content}
    </BannerLayout>
  );
}

function CollectionsBanner() {
  const collectionPaths = [
    "src/assets/images/collection-banner-1.jpg",
    "src/assets/videos/collection-banner-2.mp4",
    "src/assets/images/collection-banner-3.jpg",
    "src/assets/images/collection-banner-4.jpg",
    "src/assets/videos/collection-banner-5.mp4",
    "src/assets/videos/collection-banner-6.mp4",
  ];
  let content = [];

  for (let i = 1; i <= collectionPaths.length; i++) {
    const current = collectionPaths[i - 1];

    if (current.endsWith(".mp4")) {
      content.push(
        <div
          style={{
            gridArea: `b${i}`,
          }}
          key={current}
        >
          <video
            src={`${current}`}
            autoPlay
            muted
            loop
            key={current}
            className="rounded-2xl h-full"
          />
        </div>
      );
    } else {
      content.push(
        <div
          style={{
            gridArea: `b${i}`,
          }}
          key={current}
        >
          <img src={`${current}`} alt="banner" className="rounded-2xl" />
        </div>
      );
    }
  }

  return (
    <BannerLayout
      headerText={["Best collections ", "with best medias!"]}
      paragraphText="Discover a treasure trove of stunning images, captivating videos."
      linkRoute="/collections"
      gradientColors={"from-[#d3c4ff] to-[#d3c4ff4d]"}
    >
      {content}
    </BannerLayout>
  );
}

const currentTimeout = signal<NodeJS.Timeout | null>(null);
const cameFromTimeout = signal<boolean>(false);
export default function OverviewCarousel() {
  const [api, setApi] = useState<any>();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      if (scrollRef?.current) {
        const target = scrollRef.current;
        if (api?.selectedScrollSnap() === 0) {
          target.scrollTo(0, 0);
        } else if (api?.selectedScrollSnap() === 1) {
          target.scrollTo(140, 0);
        } else if (api?.selectedScrollSnap() === 2) {
          target.scrollTo(280, 0);
        }
      }
    });
  }, [api]);

  // Handle Scroll bar
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (currentTimeout.value) clearTimeout(currentTimeout.value);
    if (cameFromTimeout.value) return (cameFromTimeout.value = false);

    const { currentTarget: target } = e;
    const horizontalScrollValue = target.scrollLeft;

    currentTimeout.value = setTimeout(() => {
      if (horizontalScrollValue <= 93) {
        api?.scrollTo(0);
        target.scrollTo(0, 0);
      } else if (horizontalScrollValue <= 187) {
        api?.scrollTo(1);
        target.scrollTo(140, 0);
      } else if (horizontalScrollValue <= 280) {
        api?.scrollTo(2);
        target.scrollTo(280, 0);
      }

      cameFromTimeout.value = true;
    }, 250);
  };

  return (
    <>
      <div className="p-3 h-[500px]">
        <Carousel className="max-w-xl mx-auto" setApi={setApi}>
          <CarouselContent>
            <CarouselItem className="carousel-item">
              <div className="p-1 h-full">
                <Card className="h-full border-0">
                  <CardContent className="p-0 flex items-center justify-center h-full overflow-hidden rounded-3xl">
                    <ImagesBanner />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem className="carousel-item">
              <div className="p-1 h-full">
                <Card className="h-full border-0">
                  <CardContent className="p-0 flex items-center justify-center h-full overflow-hidden rounded-3xl">
                    <VideosBanner />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem className="carousel-item">
              <div className="p-1 h-full">
                <Card className="h-full border-0">
                  <CardContent className="p-0 flex items-center justify-center h-full overflow-hidden rounded-3xl">
                    <CollectionsBanner />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
      <div className="carousel-slider" onScroll={handleScroll} ref={scrollRef}>
        <div></div>
      </div>
    </>
  );
}
