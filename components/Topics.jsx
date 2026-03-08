import { Link } from "react-router";
import TopicCard from "./TopicCard";
import { useEffect, useState } from "react";

function Topics() {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    async function getTopics() {
      try {
        const response = await fetch(
          `https://back-end-nc-news-5cp2.onrender.com/api/topics`,
        );
        if (!response.ok) {
          throw new Error("new comment not registering");
        }

        const data = await response.json();
        setTopics(data.topics);
        console.log(data);
      } catch (err) {}
    }
    getTopics();
  }, []);

  return (
    <div className="topics-main">
      <div>
        {topics.map((topic) => (
          <Link key={topic.topic_id} to={`/topics/${topic.topic_id}`}>
            <TopicCard
              key={topic.topic_id}
              slug={topic.slug}
              description={topic.description}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
export default Topics;
