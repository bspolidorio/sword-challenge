import { Repo } from "../../../@types/types";

const BASE_URL = "https://api.github.com/search";

interface Result {
  total_count: number;
  incomplete_results: boolean;
  items: Repo[];
}

interface FetchReposProps {
  language: string;
  sortBy?: string;
}

export const fetchRepos = async ({
  language,
  sortBy = "stars",
}: FetchReposProps): Promise<Repo[]> => {
  const result = await fetch(
    `${BASE_URL}/repositories?q=language%3A${language}%20stars%3A%3E1000%20license%3Amit&per_page=10&page=1&sort=${sortBy}`
  );
  const body: Result = await result.json();
  if (!body.items || !body.items.length) {
    throw new Error("Result not found");
  }
  return body.items;
};
