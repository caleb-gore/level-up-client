import React, { useEffect, useState } from "react"
import { getEvents } from "../../managers/EventManager"


export const EventList = (props) => {
    const [ events, setEvents ] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__organizer">Hosted by {event.organizer.user.username}</div>
                        <div className="event__game">Game: {event.game.title}</div>
                        <div className="event__date">Date: {event.date}</div>
                        <div className="event__time">Time: {event.time}</div>
                    </section>
                })
            }
        </article>
    )
}