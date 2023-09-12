import { useState } from "react";
import axios from "axios";
import styles from "../styles/responseDisplay.module.css";
import getCombinedData from "./api/getCustomer.js";

export default function ResponseDisplay() {
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await getCombinedData(email);

      // const response = await axios.get(`/api/email_stage?email=${encodeURIComponent(email)}`);
      setResponse(response);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Email:
          <input
            type="text"
            value={email}
            onChange={handleInputChange}
            className={styles.input}
          />
        </label>
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>

      {loading && <p className={styles.loading}>Loading...</p>}

      {response && (
        <div className={styles.response}>
          <p className={styles.responseTitle}>Response:</p>
          <pre className={styles.responseData}>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
