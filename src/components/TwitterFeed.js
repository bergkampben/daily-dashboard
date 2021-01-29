import React, { useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import Spinner from "./Spinner";

const NUM_TOPIC_RESULTS = 10;

const TwitterFeed = () => {

const [trending_topics, set_trending_topics] = useState([]);
const [isLoading, setIsLoading ] = useState(true);

const getTopics = async () => {
    const response = await fetch('/api/twitter-results');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  const loadingMessage = () => {
      const message = {
          title: "Loading Topics",
          detail: "..."
      }

      if (isLoading) {
          return (
              <React.Fragment>
                  <div>
                      <ErrorMessage
                          key={message.title}
                          error={message}
                          styleType="success"
                      />
                  </div>
                  <Spinner />
              </React.Fragment>
          );
      }
  };

    useEffect(() => {
      getTopics()
      .then(res => {
        set_trending_topics(res[0].trends.slice(0, NUM_TOPIC_RESULTS));
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, []);
  

  const displayFeed = () => {
      if (trending_topics.length > 0) {
          return (
            <div>
                <div style={{height: "30px", "margin-top": "20px", "margin-bottom":"20px"}}>
                    Trending in: Chicago
                </div>
              <React.Fragment>
                  {trending_topics.map((x) => (
                      <div className="list-element">
                        {x.name}
                    </div>
                  ))}
              </React.Fragment>
             </div>
          )
      }
  }

  return (
      <div>
          {loadingMessage()}
          {displayFeed()}
      </div>
  )
}


  export default TwitterFeed;