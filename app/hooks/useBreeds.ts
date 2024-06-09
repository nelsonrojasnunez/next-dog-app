"use client";
import { CanceledError } from "axios";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useBreeds = () => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    const controller = new AbortController();
    apiClient
      .get("/list/all", { signal: controller.signal })
      .then((res) => {setBreeds(res.data.message); setIsLoading(false)})
      .catch((err) => {
        setIsLoading(false)
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  }, []);
  return { breeds, error, isLoading, setIsLoading };
};

export default useBreeds;
