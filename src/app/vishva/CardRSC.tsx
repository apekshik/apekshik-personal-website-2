import React, { useState, useCallback } from "react";
import { Skeleton } from "@nextui-org/react";
import ImageGrid from "./ImageGrid";
import YouTubePreview from "./YouTubePreview"; // Import the new YouTubePreview component
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import { readStreamableValue } from "ai/rsc";
import { generate } from "@/utils/openaiStream";
import PulseDiv from "./PulseDiv";
import GridLoader from "react-spinners/GridLoader";

interface CardRSCProps {
  query: string;
  websiteName: string;
  url: string;
  title: string;
  snippet: string;
  imageUrl: string;
}

const CardRSC: React.FC<CardRSCProps> = ({
  query,
  websiteName,
  url,
  title,
  snippet,
  imageUrl,
}) => {
  const [isHovered, setIsHovered] = useState(false); // Track hover state
  const [summary, setSummary] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]); // Store fetched images
  const [loading, setLoading] = useState(false); // Track loading state
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [loadingImages, setLoadingImages] = useState(false);

  // Utility function to check if the URL is a YouTube link and extract the video ID
  const getYouTubeVideoId = (url: string): string | null => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    );
    return match ? match[1] : null;
  };

  const videoId = getYouTubeVideoId(url);

  const fetchStreamingSummary = useCallback(async () => {
    setLoadingSummary(true);
    setSummary("");

    try {
      const { output } = await generate(query, url);
      for await (const delta of readStreamableValue(output)) {
        setSummary((currentSummary) => `${currentSummary}${delta}`);
      }
    } catch (error) {
      console.error("Error fetching streaming summary:", error);
    } finally {
      setLoadingSummary(false);
    }
  }, [query, url]);

  const fetchImages = useCallback(async () => {
    setLoadingImages(true);
    try {
      const response = await fetch("/api/fetch-images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      setImages(data.images || []);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoadingImages(false);
    }
  }, [url]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (!summary && !loadingSummary && !videoId) {
      fetchStreamingSummary();
      fetchImages();
    }
  }, [summary, loadingSummary, videoId, fetchStreamingSummary, fetchImages]);

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="w-full max-w-full overflow-hidden text-white transition-all duration-300 ease-in-out"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col">
        <div className="flex-grow">
          <h2 className="mb-1 break-words text-xl font-bold text-blue-400">
            {title}
          </h2>
          <p className="mb-1 text-sm text-gray-400">{websiteName}</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-2 inline-block break-all text-sm text-blue-500 hover:underline"
          >
            {url}
          </a>

          {/* Expandable content with dynamic height */}
          <div
            className={`text-gray-300 transition-all duration-300 ease-in-out ${
              isHovered ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            {videoId && isHovered ? (
              <YouTubePreview videoId={videoId} />
            ) : (
              <>
                {loadingSummary || summary ? (
                  <div className="w-full max-w-full">
                    <p className="bg-gradient-to-r from-yellow-400 to-red-800 bg-clip-text text-lg font-bold text-transparent">
                      Intent Based Summary
                    </p>
                    <div className="mt-2 overflow-auto rounded-md border-2 border-yellow-400 p-4">
                      {summary ? (
                        <ReactMarkdown
                          rehypePlugins={[
                            rehypeRaw,
                            rehypeSanitize,
                            rehypeHighlight,
                          ]}
                          className="markdown-content break-words"
                        >
                          {summary}
                        </ReactMarkdown>
                      ) : (
                        <PulseDiv duration={1.5} easing="easeInOut">
                          <div className="flex items-center justify-center space-x-2">
                            <GridLoader
                              aria-label="Loading Spinner"
                              color="#ffffff"
                              size={4}
                            />
                            <div className="text-lg font-bold">Thinking</div>
                          </div>
                        </PulseDiv>
                      )}
                    </div>
                  </div>
                ) : null}

                {loadingImages ? (
                  <div className="mt-4">
                    <p className="font-bold">LOADING IMAGES</p>
                    <div className="mt-2 flex w-full max-w-full flex-row justify-center gap-2">
                      <Skeleton className="h-32 w-32 rounded-lg" />
                      <Skeleton className="h-32 w-32 rounded-lg" />
                      <Skeleton className="h-32 w-32 rounded-lg" />
                    </div>
                  </div>
                ) : (
                  <div className="mt-4">
                    {images.length > 0 && <ImageGrid images={images} />}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardRSC;
