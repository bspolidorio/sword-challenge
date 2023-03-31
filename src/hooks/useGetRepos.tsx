import { fetchRepos } from "@/services/api/fetchRepos";
import { useQuery } from "react-query";

interface UseGetReposProps {
  language: string;
  sortBy?: string;
}

const useGetRepos = ({ language, sortBy }: UseGetReposProps) => {
  const repos = useQuery([language, sortBy], () =>
    fetchRepos({ language, sortBy })
  );

  return repos;
};
export default useGetRepos;
