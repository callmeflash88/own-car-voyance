import { NextRequest, NextResponse } from "next/server";
import vehicleData from "@/data/vehicle-list.json";

interface Vehicle {
  Year: number;
  Make: string;
  Model: string;
  Category: string;
}

const createIndexes = (vehicles: Vehicle[]) => {
  // Create a map of year to vehicles
  const yearIndex = new Map<
    number,
    { make: Set<string>; model: Set<string>; category: Set<string> }
  >();
  // Create a map of make to vehicles
  const makeIndex = new Map<
    string,
    { year: Set<number>; model: Set<string>; category: Set<string> }
  >();
  // Create a map of model to vehicles
  const modelIndex = new Map<
    string,
    { year: Set<number>; make: Set<string>; category: Set<string> }
  >();
  // Create a map of category to vehicles
  const categoryIndex = new Map<
    string,
    { year: Set<number>; make: Set<string>; model: Set<string> }
  >();

  vehicles.forEach((vehicle) => {
    const { Year, Make, Model, Category } = vehicle;

    // Add to year index
    if (!yearIndex.has(Year)) {
      yearIndex.set(Year, {
        make: new Set(),
        model: new Set(),
        category: new Set(),
      });
    }
    yearIndex.get(Year)!.make.add(Make);
    yearIndex.get(Year)!.model.add(Model);
    yearIndex.get(Year)!.category.add(Category);

    // Add to make index
    if (!makeIndex.has(Make)) {
      makeIndex.set(Make, {
        year: new Set(),
        model: new Set(),
        category: new Set(),
      });
    }
    makeIndex.get(Make)!.year.add(Year);
    makeIndex.get(Make)!.model.add(Model);
    makeIndex.get(Make)!.category.add(Category);

    // Add to model index
    if (!modelIndex.has(Model)) {
      modelIndex.set(Model, {
        year: new Set(),
        make: new Set(),
        category: new Set(),
      });
    }
    modelIndex.get(Model)!.year.add(Year);
    modelIndex.get(Model)!.make.add(Make);
    modelIndex.get(Model)!.category.add(Category);

    // Add to category index
    if (!categoryIndex.has(Category)) {
      categoryIndex.set(Category, {
        year: new Set(),
        make: new Set(),
        model: new Set(),
      });
    }
    categoryIndex.get(Category)!.year.add(Year);
    categoryIndex.get(Category)!.make.add(Make);
    categoryIndex.get(Category)!.model.add(Model);
  });

  return {
    yearIndex,
    makeIndex,
    modelIndex,
    categoryIndex,
  };
};

const indexes = createIndexes(vehicleData);

// Map of vehicle field to index
const fieldToIndexMap = {
  Year: {
    yearIndex: "years",
    makeIndex: "years",
    modelIndex: "years",
    categoryIndex: "years",
  },
  Make: {
    yearIndex: "makes",
    makeIndex: "makes",
    modelIndex: "makes",
    categoryIndex: "makes",
  },
  Model: {
    yearIndex: "models",
    makeIndex: "models",
    modelIndex: "models",
    categoryIndex: "models",
  },
  Category: {
    yearIndex: "categories",
    makeIndex: "categories",
    modelIndex: "categories",
    categoryIndex: "categories",
  },
} as const;

const getFilteredVehiclesWithIndexes = (
  vehicleField: keyof typeof fieldToIndexMap,
  filters: {
    Year?: number;
    Make?: string;
    Model?: string;
    Category?: string;
  }
) => {
  // if no filters, return all vehicles
  if (Object.keys(filters).length === 0) {
    const allVehicle = new Set(
      vehicleData.map((vehicle) => vehicle[vehicleField])
    );
    return Array.from(allVehicle).sort();
  }

  let resultSet: Set<string | number> | null = null;

  // apply filters one by one
  Object.entries(filters).forEach(([filterField, filterValue]) => {
    if (filterValue && filterValue !== "") {
      const indexKey =
        `${filterField.toLowerCase()}Index` as keyof typeof indexes;
      const index = indexes[indexKey];

      // use never to bypass type checking
      if (index && index.has(filterValue as never)) {
        const indexData = index.get(filterValue as never)!;
        const targetProperty = fieldToIndexMap[vehicleField][indexKey];
        const currentSet: Set<string | number> =
          indexData[targetProperty as keyof typeof indexData];

        // if no result set, initialize it with current set
        if (resultSet === null) {
          resultSet = new Set(currentSet);
        } else {
          // if result set, find intersection
          resultSet = new Set([...resultSet].filter((x) => currentSet.has(x)));
        }
      }
    }
  });

  // if no result set, apply filters to all vehicles
  if (resultSet === null || (resultSet as Set<string | number>).size === 0) {
    let filteredVehicles = vehicleData;

    // apply filters to all vehicles
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "") {
        filteredVehicles = filteredVehicles.filter((vehicle) => {
          const vehicleValue = vehicle[key as keyof Vehicle];
          return typeof vehicleValue === "number"
            ? vehicleValue === Number(value)
            : vehicleValue === value;
        });
      }
    });

    const uniqueValues = new Set(
      filteredVehicles.map((vehicle) => vehicle[vehicleField])
    );
    return Array.from(uniqueValues).sort();
  }

  return Array.from(resultSet).sort();
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const field = searchParams.get("field") as keyof typeof fieldToIndexMap;
  const filters = Object.fromEntries(searchParams.entries());
  delete filters.field;

  try {
    if (!field) {
      return NextResponse.json({ error: "Field is required" }, { status: 400 });
    }

    const values = getFilteredVehiclesWithIndexes(field, filters);

    return NextResponse.json({
      field,
      values,
      count: values.length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch vehicles" },
      { status: 500 }
    );
  }
}
