import React, { useState, useCallback } from "react";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import { motion as m } from "framer-motion";
import styles from "./styles.scss";
import { TagSection } from "it-events-frontend";
import { useFilter } from "it-events-frontend";
import { useEventsContext } from "it-events-frontend";
import { useInitialFilter } from "../../../utils/hooks/useInitialFilter";
import { useFiltersContext } from "it-events-frontend";
import {
  SearchInput,
  InputCheckbox,
  InputDate,
  InputRadio,
  PrimaryButton,
  TagButton,
} from "it-events-frontend";

dayjs.extend(weekday);

export const FilterLeftBar = () => {
  const [showAllDates, setShowAllDates] = useState(false);
  const [showAllTopics, setShowAllTopics] = useState(false);
  const { dataLists } = useInitialFilter();
  const { handleSearch } = useEventsContext();
  const {
    values,
    setValues,
    findValues,
    setFindValues,
    closeFilters,
    getValuesArray,
    filters,
    setFilters,
    getFilterValues,
    resetValues,
    resetFilters,
  } = useFiltersContext();

  const {
    handleQueryChange,
    handleInputChange,
    handleDateChange,
    handleDateBlur,
    handleButtonChange,
    setItemOnClick,
  } = useFilter({
    values,
    setValues,
    findValues,
    setFindValues,
  });

  //console.log( values)
  const handleSearchClick = () => {
    handleSearch(getFilterValues());
    closeFilters();
    resetValues();
    resetFilters();
  };

  const toggleShowAllDates = () => {
    setShowAllDates(!showAllDates);
  };

  const toggleShowAllTopics = () => {
    setShowAllTopics(!showAllTopics);
  };

  const renderDateOptions = () => {
    const dateOptions = [
      {
        id: "today",
        value: "Today",
        label: "Сегодня",
        filterFields: {
          date__gte: dayjs().format("YYYY-MM-DD"),
          date__lte: dayjs().format("YYYY-MM-DD"),
        },
      },
      {
        id: "tomorrow",
        value: "Tomorrow",
        label: "Завтра",
        filterFields: {
          date__gte: dayjs().add(1, "d").format("YYYY-MM-DD"),
          date__lte: dayjs().add(1, "d").format("YYYY-MM-DD"),
        },
      },
      {
        id: "thisweekend",
        value: "This weekend",
        label: "В эти выходные",
        filterFields: {
          date__gte: dayjs().weekday(6).format("YYYY-MM-DD"),
          date__lte: dayjs().weekday(7).format("YYYY-MM-DD"),
        },
      },
      { id: "pickdate", value: "Pick date", label: "Выбрать дату" },
    ];

    if (showAllDates) {
      dateOptions.push(
        {
          id: "thisweek",
          value: "This week",
          label: "На этой неделе",
          filterFields: {
            date__gte: dayjs().format("YYYY-MM-DD"),
            date__lte: dayjs().weekday(7).format("YYYY-MM-DD"),
          },
        },
        {
          id: "thismonth",
          value: "This month",
          label: "В этом месяце",
          filterFields: {
            date__gte: dayjs().format("YYYY-MM-DD"),
            date__lte: dayjs().add(1, "M").date(0).format("YYYY-MM-DD"),
          },
        },
        {
          id: "nextmonth",
          value: "Next month",
          label: "В следующем месяце",
          filterFields: {
            date__gte: dayjs().add(2, "M").date(1).format("YYYY-MM-DD"),
            date__lte: dayjs().add(2, "M").date(0).format("YYYY-MM-DD"),
          },
        }
      );
    }

    return dateOptions.map((option) => (
      <div key={option.id}>
        <InputRadio
          label={option.id}
          value={option.label}
          name="date"
          checked={
            option.label.includes(values.date) ||
            (option.label === "Выбрать дату" && !isNaN(Date.parse(values.date)))
          }
          onChange={(event) => {
            handleInputChange(event);
            setFilters({ ...filters, ...option.filterFields });
          }}
        >
          {option.id === "pickdate" && (
            <InputDate
              onChange={(event) => {
                handleDateChange(event);
                setFilters({
                  ...filters,
                  date__gte: dayjs(event.currentTarget.value)
                    .subtract(1, "d")
                    .format("YYYY-MM-DD"),
                  date__lte: dayjs(event.currentTarget.value)
                    .add(1, "d")
                    .format("YYYY-MM-DD"),
                });
              }}
              onBlur={handleDateBlur}
            />
          )}
        </InputRadio>
      </div>
    ));
  };

  const renderSpecialityList = () => {
    return dataLists?.topics
      ?.slice(0, showAllTopics ? dataLists.topics.length : 4)
      .map((item, index) => (
        <InputCheckbox
          key={index}
          label={item.id}
          name="specialities"
          value={item}
          checked={values.specialities.includes(item)}
          onChange={handleInputChange}
        />
      ));
  };

  const FiltersListItem = useCallback(
    ({ title, children }) => (
      <li className={styles.listItem}>
        <p className="itemTitle">{title}</p>
        {children}
      </li>
    ),
    []
  );

  return (
    <m.section
      initial="hidden"
      animate="visible"
      className={styles.filterForm}
    >
      <h2 className={styles.filterTitle}>Фильтры</h2>
      <ul className="filter__filter-list">
        <FiltersListItem title="Название">
          <SearchInput
            placeholder="Разработка"
            name="query"
            value={values.query}
            onChange={(event) => {
              handleQueryChange(event);
              setFilters({ ...filters, q: event.target.value });
            }}
            onSubmit={(e) => e.preventDefault()}
          />
        </FiltersListItem>

        <FiltersListItem title="Формат">
          <InputCheckbox
            label="online"
            value="Online"
            name="status"
            checked={values.status.includes("Online")}
            onChange={(event) => {
              handleQueryChange(event);
              setFilters({
                ...filters,
                formats: event.target.value.toLowerCase(),
              });
            }}
          />
          <InputCheckbox
            label="offline"
            value="Offline"
            name="status"
            checked={values.status.includes("Offline")}
            onChange={(event) => {
              handleQueryChange(event);
              setFilters({
                ...filters,
                formats: event.target.value.toLowerCase(),
              });
            }}
          />
        </FiltersListItem>

        <FiltersListItem title="Город">
          <SearchInput
            placeholder="Поиск города"
            name="city"
            value={values.city}
            onChange={(event) => {
              handleInputChange(event);
              setFilters({
                ...filters,
                city__name: event.target.value.toLowerCase(),
              });
            }}
            onSubmit={(e) => e.preventDefault()}
          />
          {findValues && findValues.city && findValues.city !== "" && (
            <div className={styles.serchContainer}>
              {findValues.city.map((item, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => {
                      setItemOnClick({ city: item });
                      setFilters({ ...filters, city__name: item });
                    }}
                    className={styles.findItem}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          )}
        </FiltersListItem>

        <FiltersListItem title="Дата">
          {renderDateOptions()}
          <button onClick={toggleShowAllDates} className="filter__showMore">
            {showAllDates ? "Показать меньше" : "Показать больше"}
          </button>
        </FiltersListItem>

        <FiltersListItem title="Направление">
          {renderSpecialityList()}
          {dataLists?.topics?.length > 3 && (
            <button onClick={toggleShowAllTopics} className="filter__showMore">
              {showAllTopics ? "Показать меньше" : "Показать больше"}
            </button>
          )}
        </FiltersListItem>

        <FiltersListItem title="Цена">
          <InputRadio
            label="free"
            value="Бесплатно"
            name="price"
            checked={values.price === "Бесплатно"}
            onChange={(event) => {
              handleQueryChange(event);
              setFilters({ ...filters, price__lte: 0 });
            }}
          />
          <InputRadio
            label="paid"
            value="Платно"
            name="price"
            checked={values.price === "Платно"}
            onChange={(event) => {
              handleQueryChange(event);
              setFilters({ ...filters, price__gte: 1 });
            }}
          />
        </FiltersListItem>

        <FiltersListItem title="Теги">
          <SearchInput
            placeholder="Поиск тега"
            name="findTags"
            value={values.findTags}
            //onChange={handleInputChange}
            onChange={(event) => {
              handleQueryChange(event);
              setFilters({ ...filters, tag: event.target.value });
            }}
            onSubmit={(e) => e.preventDefault()}
          />
          {findValues && findValues.findTags && findValues.findTags !== "" && (
            <div className={styles.serchContainer}>
              <div className="filter__tagsList">
                {findValues.findTags.map((item, index) => {
                  return (
                    <TagButton
                      key={index}
                      value={item}
                      //isEnabled={values.tags.includes(item.label)}
                      //isEnabled={findValues.findTags.includes(item)}
                      onChange={() => {
                        handleButtonChange(item);
                        setFilters({ ...filters, tag: item });
                      }}
                    />
                  );
                })}
              </div>
            </div>
          )}
          <span className={styles.popularTags}>Популярные теги</span>
        </FiltersListItem>
      </ul>
      <div className="filter__tags-container">
      <TagSection handleChange={handleButtonChange} tags={dataLists.allTags} />
      </div>
     
      <PrimaryButton onClick={handleSearchClick} title="Найти" />
    </m.section>
  );
};
