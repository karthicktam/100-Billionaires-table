import React, { useEffect, useState } from "react";
import "./styles.css";

function TableData(props) {
  const { name, squareImage } = props.person;
  return (
    <tr>
      <td>
        <img src={squareImage} alt="" />
      </td>
      <td>{name}</td>
      <td>{props.rank}</td>
      <td>{props.countryOfCitizenship}</td>
      <td>{props.source}</td>
    </tr>
  );
}

export default function App() {
  const [billionaires, setBillionaires] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://forbes400.herokuapp.com/api/forbes400/real-time?limit=10", {
      method: "GET"
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
        setLoading(false);
        setBillionaires(data);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className={loading === true ? "container load" : "container"}>
      <h1>Top 10 Billionaires in the world.</h1>
      {loading === true ? (
        <div className="loader"></div>
      ) : (
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Rank</th>
              <th>Nationality</th>
              <th>Source(s) of weath</th>
            </tr>
          </thead>
          <tbody>
            {billionaires.map((el) => (
              <TableData
                person={el.person}
                rank={el.rank}
                countryOfCitizenship={el.countryOfCitizenship}
                source={el.source}
                key={el.rank}
              />
            ))}
          </tbody>
        </table>
      )}
      <small>
        Source:{" "}
        <a href="https://en.wikipedia.org/wiki/List_of_richest_people_in_the_world">
          Wikipedia
        </a>
      </small>
    </div>
  );
}
