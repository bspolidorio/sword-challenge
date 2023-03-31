import usePreferredTopics from "@/hooks/usePreferredTopics";

interface TopicsRowProps {
  topics: string[];
}

const TopicsRow = ({ topics }: TopicsRowProps) => {
  const { preferredTopics, deleteTopic, setTopic } = usePreferredTopics();

  const isSelected = (topic: string) =>
    preferredTopics &&
    preferredTopics.findIndex((result) => result.topic === topic) !== -1;

  const handleTopics = async (topic: string) => {
    if (isSelected(topic)) {
      deleteTopic(topic);
      return;
    }

    setTopic(topic);
  };

  return (
    <div className="px-6 space-y-3 md:px-12">
      <h2 className="text-sm font-semibold md:text-md">
        Toggle topics to show
      </h2>
      <div className="flex gap-2 flex-wrap md:gap-4">
        {topics.map((topic) => (
          <button
            key={topic}
            className={`text-[12px] rounded ${
              isSelected(topic) ? "bg-[#e50914]" : "bg-[#471012]"
            } py-1 px-4 font-semibold transition md:text-md`}
            onClick={() => handleTopics(topic)}
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopicsRow;
