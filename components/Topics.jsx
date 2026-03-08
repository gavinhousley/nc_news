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
          <Link
            key={topic.slug}
            className="topic-card-link"
            to={`/articles/topic/${topic.slug}`}
          >
            <TopicCard slug={topic.slug} description={topic.description} />
          </Link>
        ))}
      </div>
    </div>
  );
}
export default Topics;
