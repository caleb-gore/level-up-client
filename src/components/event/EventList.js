import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteEvent, getEvents } from "../../managers/EventManager";

export const EventList = (props) => {
    const navigate = useNavigate()
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then((data) => setEvents(data));
  }, []);

  return (
    <article className="events">
      <button
        className="btn btn-2 btn-sep icon-create"
        onClick={() => {
          navigate({ pathname: "/events/new" });
        }}
      >
        Schedule New Event
      </button>
      {events.map((event) => {
        return (
          <section key={`event--${event.id}`} className="event">
            <div className="event__organizer">
              Hosted by {event.organizer.user.username}
            </div>
            <div className="event__game">Game: {event.game.title}</div>
            <div className="event__date">Date: {event.date}</div>
            <div className="event__time">Time: {event.time}</div>
            <button onClick={()=>navigate(`/events/update/${event.id}`)}>edit</button>
            <button onClick={()=>{
              deleteEvent(event.id)
              .then(()=>getEvents())
              .then(setEvents)}}>delete</button>
          </section>
        );
      })}
    </article>
  );
};
