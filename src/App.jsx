import { useEffect, useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [countryCapital, setCountryCapital] = useState("");
  const [population, setPopulation] = useState("");
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [showCard, setShowCard] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  // To fetch all country data to find countries, capital, and population
  useEffect(() => {
    async function fetchCountries() {
      try {
        setLoading(true);
        // If using localhost uncomment below line
        // const response = await fetch("/api/country")
        const response = await fetch("https://www.apicountries.com/countries");
        const data = await response.json();
        setCountryData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCountries();
  }, []);

  // To get all country names to show for country select options
  useEffect(() => {
    if (countryData.length > 0) {
      const names = countryData.map((c) => c.name);
      setCountries(names);
    }
  }, [countryData]);

  // To find capital and population of selected country
  useEffect(() => {
    const selected = countryData.find((c) => c.name === country);
    if (selected) {
      setCountryCapital(selected.capital);
      setPopulation(selected.population);
    } else {
      setCountryCapital("");
      setPopulation("");
    }
  }, [country, countryData]);

  // Handles form submissions
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData({
      name,
      email,
      country,
      countryCapital,
      population,
    });
    setShowCard(true);
    setName("");
    setEmail("");
    setCountry("");
    setCountryCapital("");
    setPopulation("");
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="form-title">Sparxsys Task</h1>

        <div className="form-container">
          <div className="inputs">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="inputs">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="inputs">
            <label>Country</label>
            <input
              list="countryList"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Select or type country"
              required
            />
            <datalist id="countryList">
              {countries.map((c, i) => (
                <option key={i} value={c} />
              ))}
            </datalist>
          </div>

          <div className="inputs">
            <label>City (Capital)</label>
            <input type="text" readOnly value={countryCapital} />
          </div>

          <div className="inputs">
            <label>Population</label>
            <input type="text" readOnly value={population} />
          </div>

          <div className="submit-btn">
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>

      {/* ==================== POPUP CARD ==================== */}
      {showCard && submittedData && (
        <div className="popup-bg">
          <div className="popup-card">
            <button className="close-btn" onClick={() => setShowCard(false)}>
              ✖
            </button>

            <h2>Submitted Details</h2>
            <p>
              <strong>Name:</strong> {submittedData.name}
            </p>
            <p>
              <strong>Email:</strong> {submittedData.email}
            </p>
            <p>
              <strong>Country:</strong> {submittedData.country}
            </p>
            <p>
              <strong>Capital:</strong> {submittedData.countryCapital}
            </p>
            <p>
              <strong>Population:</strong> {submittedData.population}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
