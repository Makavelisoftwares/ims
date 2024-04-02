"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export const useFetch = ( url ) => {
  const [data, setdata] = useState([]);
  const [error, seterror] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res=await axios.get(url);
        console.log(res.data)
        setdata(res.data)
      } catch (error) {
        console.log(error);
        seterror(error);
      }
    };

    fetchData();
  }, []);

  return {
    error,
    data,
  };
};
