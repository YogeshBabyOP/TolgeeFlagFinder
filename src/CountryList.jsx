import React, { useState, useEffect } from "react";
import axios from "axios";
import { T } from "@tolgee/react";
import LanguageSelector from "./LanguageSelector";

const CountryList = () => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    useEffect(() => {
        axios
          .get("https://restcountries.com/v3.1/all")
          .then((response) => {
            const sortedCountries = response.data.sort((a, b) =>
              a.name.common.localeCompare(b.name.common)
            );
            setCountries(sortedCountries);
          })
          .catch((error) => {
            console.error("Error fetching countries:", error);
          });
      }, []);
    const TolgeeHelper = (event) => {
        const countryCode = event.target.value;
        const country = countries.find((c) => c.cca2 === countryCode);
        setSelectedCountry(country);
      };
    return (
        <div style={styles.container}>
        <h1 style={styles.title}>Flag Country Finder 🌍</h1>
        <div style={styles.flexContainer}>
            <div>
                <LanguageSelector />
            </div>
            <div>
            <div style={styles.selectorContainer}>
          <select
            onChange={TolgeeHelper}
            defaultValue=""
            style={styles.dropdown}
          >
            <option value="" disabled>
              Select a country
            </option>
            {countries.map((country) => (
              <option key={country.cca2} value={country.cca2}>
                {country.name.common}
              </option>
            ))}
          </select>
        </div>

        {selectedCountry && (
          <div style={styles.countryInfo}>
            <h2 style={styles.countryName}>{selectedCountry.name.common}</h2>
            <img
              src={selectedCountry.flags.png}
              alt="Flag"
              style={styles.flag}
            />
            <p>
              <strong>
                <T keyName="capkey" defaultValue="Region" /> :
              </strong>{" "}
              {selectedCountry.capital ? selectedCountry.capital[0] : "N/A"}
            </p>
            <p>
              <strong>
                <T keyName="popkey" defaultValue="Region" /> :
              </strong>

              {selectedCountry.population.toLocaleString()}
            </p>
            <p>
              <strong>
                <T keyName="regkey" defaultValue="Region" /> :
              </strong>{" "}
              {selectedCountry.region}
            </p>
          </div>
        )}
      </div>
            </div>
        </div>
    )
}

const styles = {
    flexContainer: {
        display: "flex",
        gap: 30,
    },
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "linear-gradient(135deg, #1f1c2c, #928dab)",
      color: "#fff",
      fontFamily: "'Poppins', sans-serif",
      overflow: "hidden",
      textAlign: "center",
    },
    title: {
      fontSize: "3rem",
      margin: "20px 0",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
      letterSpacing: "1.5px",
    },
    selectorContainer: {
      marginBottom: "20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "20px",
      width: "100%",
    },
    dropdown: {
      padding: "12px 20px",
      fontSize: "1.1rem",
      borderRadius: "8px",
      border: "none",
      backgroundColor: "#444",
      color: "#fff",
      outline: "none",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    },
    dropdownHover: {
      backgroundColor: "#666",
    },
    countryInfo: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "30px",
      borderRadius: "15px",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      color: "#fff",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)",
      maxWidth: "400px",
      width: "90%",
      marginTop: "30px",
      textAlign: "center",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    countryName: {
      fontSize: "2rem",
      marginBottom: "15px",
      textTransform: "uppercase",
      letterSpacing: "2px",
    },
    flag: {
      width: "180px",
      height: "auto",
      borderRadius: "10px",
      marginBottom: "20px",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
      transition: "transform 0.2s ease",
    },
    flagHover: {
      transform: "scale(1.1)",
    },
  };

export default CountryList