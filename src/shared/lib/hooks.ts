import { useState, useCallback } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

// Хук useAppDispatch будет знать тип dispatch из твоего стора
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Хук useAppSelector будет "знать" структуру всего состояния Redux
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Hook to fetch vehicle data
export interface VehicleFilters {
  Year?: number;
  Make?: string;
  Model?: string;
  Category?: string;
}

interface VehicleDataResponse {
  field: string;
  values: (string | number)[];
  count: number;
}

export interface VehicleData {
  data: Record<string, (string | number)[]>;
  loading: Record<string, boolean>;
  error: string | null;
  fetchFieldData: (
    field: "Year" | "Make" | "Model" | "Category",
    filters?: VehicleFilters
  ) => Promise<void>;
  initializeAllData: () => Promise<void>;
  clearFieldData: (field: string) => void;
}

export const useVehicleData = (): VehicleData => {
  const [data, setData] = useState<Record<string, (string | number)[]>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);

  const fetchFieldData = useCallback(
    async (
      field: "Year" | "Make" | "Model" | "Category",
      filters: VehicleFilters = {}
    ) => {
      setLoading((prev) => ({ ...prev, [field]: true }));
      setError(null);

      try {
        const params = new URLSearchParams({ field });

        // add filters to params
        Object.entries(filters).forEach(([key, value]) => {
          if (value && value !== "") {
            params.append(key, value.toString());
          }
        });

        const response = await fetch(`/api/vehicle?${params}`);
        const result: VehicleDataResponse = await response.json();

        if (!response.ok) {
          if ("error" in result && typeof result.error === "string") {
            setError(result.error);
          } else {
            setError("Failed to fetch data");
          }
          return;
        }

        setData((prev) => ({
          ...prev,
          [field]: result.values,
        }));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading((prev) => ({ ...prev, [field]: false }));
      }
    },
    []
  );

  const initializeAllData = useCallback(async () => {
    setLoading((prev) => ({
      ...prev,
      Year: true,
      Make: true,
      Model: true,
      Category: true,
    }));
    setError(null);

    try {
      const promises = [
        fetchFieldData("Year"),
        fetchFieldData("Make"),
        fetchFieldData("Model"),
        fetchFieldData("Category"),
      ];

      await Promise.all(promises);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to initialize data"
      );
    } finally {
      setLoading((prev) => ({
        ...prev,
        Year: false,
        Make: false,
        Model: false,
        Category: false,
      }));
    }
  }, [fetchFieldData]);

  const clearFieldData = useCallback((field: string) => {
    setData((prev) => {
      const newData = { ...prev };
      delete newData[field];
      return newData;
    });
  }, []);

  return {
    data,
    loading,
    error,
    fetchFieldData,
    initializeAllData,
    clearFieldData,
  };
};
