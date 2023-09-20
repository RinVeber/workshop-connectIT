import React, { children } from "react";
import ContentText from "../../pages/event-page-default/content-text";

export default function Tab({selectedEvent, linkData}) {
  const [content, setContent] = React.useState("21 сентября будет проходить воркшоп");

  const currentContent = (e, item) => {
    e.preventDefault();
    setContent(item.content);
  };
  return (
    <section className="navbar">
      <div className="navbar__container-menu">
        <ul className="navbar__menu">
          {linkData.map((item) => {
            return (
              <li
                key={item.id}
                className="navbar__link"
                onClick={(e) => currentContent(e, item)}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="navbar__content">
        <ContentText content={content} />
        {children}
      </div>
    </section>
  );
}
