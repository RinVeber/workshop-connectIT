import React from 'react'
import Card from './Card'

export default function CardList({title, events}) {
  return (
    <section className="cardlist">
        <h2 className="cardlist__title">
            {title}
        </h2>
        <ul className="cardlist__list">
        {events?.map((event) => (
          <Card key={event.id} event={event} />
        ))}
        </ul>

    </section>
  )
}
