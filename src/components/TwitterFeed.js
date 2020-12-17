import React, { useEffect, useState } from "react";
import { TwitterHashtagButton } from "react-twitter-embed";
import ErrorMessage from "./ErrorMessage";
import Spinner from "./Spinner";


const TwitterFeed = () => {

const [trending_topics, set_trending_topics] = useState([]);
const [isLoading, setIsLoading ] = useState(true);

const getTopics = async () => {
    const response = await fetch('http://localhost:3001/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Finished getTopics")
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
        set_trending_topics(res[0].trends.slice(0, 10));
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, []);
  

  const displayFeed = () => {
      if (trending_topics.length > 0) {
          return (
              <React.Fragment>
                  {trending_topics.map((x) => (
                      <TwitterHashtagButton tag={x.name}/>
                  ))}
              </React.Fragment>
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