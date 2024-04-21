import { Link, useParams } from "react-router-dom";
import Spinner from "../../components/Loaders/Spinner/Spinner";
import { searchByName as WeebSearch } from "../../Api/weeb-e-fied";
import { searchByName as KitsuSearch } from "../../Api/Kitsu";
import SearchError from "../../components/Errors/SearchError/SearchError";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { GetPopularSearches } from "../../hooks/useHooks";
const SearchResults = ({ animes, hasMore, isError, isLoading, nextPage }) => {
  return (
    <InfiniteScroll
      dataLength={animes.length}
      next={nextPage}
      hasMore={hasMore}
      loader={<Spinner />}
      className="p-2 justify-center flex flex-wrap  gap-2 min-h-[90svh]  "
    >
      {animes.map((anime, idx) => {
        return <SearchCard key={anime.id} anime={anime} />;
      })}
    </InfiniteScroll>
  );
};
const SearchCard = ({ anime }) => {
  const id = anime?.id;
  const title =
    anime?.attributes?.titles?.en ||
    anime?.attributes?.titles?.en_jp ||
    anime?.attributes?.titles?.ja_jp ||
    null;
  const image =
    anime?.attributes?.posterImage?.small ||
    anime?.attributes?.posterImage?.tiny ||
    anime?.attributes?.posterImage?.medium ||
    null;
  const type = anime.attributes?.subtype;
  const epLen = anime.attributes?.episodeLength;
  return (
    <Link to={`/details/${id}?provider=kitsu`}>
      <div className="w-40 h-60 md:w-60 md:h-[21rem] p-2 cursor-pointer">
        <div className="relative w-full h-[calc(100%-2rem)]">
          <img
            src={image}
            alt="title"
            className="absolute  w-full h-full object-cover"
          />
        </div>
        <span className="line-clamp-1">{title}</span>
        <span>
          {type} <span className="ml-2">{epLen}m</span>
        </span>
      </div>
    </Link>
  );
};
const Search = () => {
  const param = useParams();
  const provider = param?.provider || "kitsu";
  const key = param?.key;
  const popularSearches = GetPopularSearches();
  const search = useInfiniteQuery({
    queryKey: ["search", key, provider],
    queryFn: async ({ pageParam = 1 }) => {
      return provider === "weeb-e-fied"
        ? WeebSearch(key)
        : KitsuSearch(key, pageParam);
    },
    enabled: !!key,
    getNextPageParam: (lastPage) => {
      if (!lastPage?.links?.next) return undefined;
      const url = lastPage.links.next;
      const page = url.match(/page%5Bnumber%5D=(\d+)/);
      return page[1];
    },
  });

  if (search.error) {
    console.log(search.error);
    return (
      <div className="search__animes" style={{ height: "90svh" }}>
        <SearchError />
      </div>
    );
  }
  if (search.isLoading || search.isPending) {
    return (
      <div className="search__animes" style={{ height: "90svh" }}>
        <Spinner />
      </div>
    );
  }
  return (
    <div className=" grid lg:grid-cols-[3fr_1fr] gap-2 grid-cols-1">
      <div>
        <div role="alert" className="alert alert-success w-fit m-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Searched for {key} found {search.data?.pages[0]?.meta?.count} results</span>
        </div>
        <SearchResults
          animes={search.data.pages.flatMap((page) => page.data)}
          hasMore={search.hasNextPage}
          isError={search.isError}
          isLoading={search.isLoading}
          nextPage={search.fetchNextPage}
        />
      </div>
      <div className="p-2 w-full overflow-hidden ">
        <h1 className="text-3xl mb-3">Popular Searches</h1>
        {popularSearches.data?.map((anime) => {
          const id = anime?.id;
          const title =
            anime?.attributes?.titles?.en ||
            anime?.attributes?.titles?.en_jp ||
            anime?.attributes?.titles?.ja_jp ||
            null;
          const image =
            anime?.attributes?.posterImage?.small ||
            anime?.attributes?.posterImage?.tiny ||
            anime?.attributes?.posterImage?.medium ||
            null;
          return (
            <Link
              to={`/details/${id}?provider=kitsu`}
              key={anime.id}
              className=""
            >
              <div className="w-full h-20 flex gap-2 items-center mb-2">
                <img
                  src={image}
                  alt="title"
                  className="w-16 h-20 object-cover"
                />
                <span className="line-clamp-1">{title} </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
