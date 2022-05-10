import React from "react";
import { Button, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { writeNewLog } from "../../bll/reducers/reducerUser";
import Details from "./Details";
import { card, img, btn, txt } from "./index"


function NewsItem(props) {
  const { imageUrl, alt, description, title, author, channel, date, urlNews } = props
  const params = useLocation()
  , dispatch = useDispatch()
  const user = useSelector((state) => state.reducerUser.user)

  const writeLog = () => {
    if(user){
      dispatch(writeNewLog(user.id, {category: params.pathname.substring(1, params.pathname.length), url: urlNews, source: channel}))
    }
    
  }

  return (
    <>
      <Card style={card}>
        <Card.Img style={img} variant="top" src={imageUrl} alt={alt} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text style={txt}>
            {description}
          </Card.Text>
          <Details author={author} channel={channel} date={date} />
          <Button onClick={() => writeLog()} href={urlNews} target="_blank" style={btn}>Читать далее →</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default NewsItem;
