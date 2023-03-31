import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { Repo } from "../../../@types/types";

interface ThumbnailProps {
  repo: Repo;
  starred?: boolean;
  onClickStar: () => void;
}

const Thumbnail = ({ repo, starred, onClickStar }: ThumbnailProps) => (
  <div className="relative h-24 min-w-[180px] shadow-md cursor-pointer transition duration-200 ease-out md:h-32 md:min-w-[260px] md:hover:scale-125 hover:z-20">
    <a href={repo.html_url} target="_blank">
      <Image
        src={`https://opengraph.githubassets.com/123abc/${repo.full_name}`}
        alt={`${repo.full_name} image`}
        fill
        className="rounded-sm object-cover md:rounded"
        priority
      />
    </a>
    {!starred ? (
      <StarIcon
        className="absolute top-1 right-1  m-auto h-6 w-6 text-black cursor-pointer transition hover:scale-125 z-20"
        onClick={onClickStar}
      />
    ) : (
      <StarIconSolid
        className="absolute top-1 right-1  m-auto h-6 w-6 text-[#FFDF00] cursor-pointer transition hover:scale-125 z-20"
        onClick={onClickStar}
      />
    )}
  </div>
);

export default Thumbnail;
