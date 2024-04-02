"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setdata] = useState({});
  const [error, seterror] = useState("");

  const fetchdata = async () => {
    try {
        const res=await axios.get(url);
        setdata(res.data)
    } catch (error) {
      console.log(error);
      seterror(error)
    }
  };

  useEffect(() => {
    fetchdata()
  }, []);

  return {
    data,
    error,
  };
};
