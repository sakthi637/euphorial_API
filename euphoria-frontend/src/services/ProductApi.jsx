import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const DataContext = createContext();

export default function ProductApi({ children }) {
  const [data, setData] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null); 

  useEffect(() => {
    
    axios
      .get("http://127.0.0.1:8000/api/v1/products/") 
      .then((response) => {
        setData(response.data.data);  
        setLoading(false);  
      })
      .catch((err) => {
        console.error("Error fetching data:", err.response ? err.response.data : err.message);
        setError(err.response ? err.response.data : "Failed to fetch data");
        setLoading(false);  
      });
  }, []);  

  return (
    <DataContext.Provider value={{ data, loading, error }}>
      {children}  
    </DataContext.Provider>
  );
}
