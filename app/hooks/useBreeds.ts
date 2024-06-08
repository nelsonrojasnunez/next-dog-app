"use client";
import { CanceledError } from "axios";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useBreeds = () => {
  const [breeds, setBreeds] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    apiClient
      .get("/list/all", { signal: controller.signal })
      .then((res) => setBreeds(res.data.message))
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  }, []);
  return { breeds, error };
};

export default useBreeds;
