import {
  CarStatus,
  useCreateCarMutation,
  VehicleAd,
} from "@/shared/api/carApi";
import { VehicleData, VehicleFilters } from "@/shared/lib/hooks";
import { NotificationService } from "@/shared/lib/NotificationService";
import { Select } from "@/shared/ui";
import { RHSelect } from "@/shared/ui/FormField/RHSelect";
import { TextInput } from "@/shared/ui/FormField/TextInput";
import { VehicleSelect } from "@/shared/ui/FormField/VehicleSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm, UseFormReturn } from "react-hook-form";
import z from "zod";

const LABEL_CLASSNAME = "font-bold text-gray-dark text-xl";
const TEXT_INPUT_CLASSNAME = " py-2 ";

export const STEP_BASIC_FORM_FIELDS = [
  {
    name: "make",
    label: "Make",
    placeholder: "Select make",
    component: RHSelect,
    options: [
      { label: "BMW", value: "bmw" },
      { label: "Audi", value: "audi" },
    ],
    labelClassName: LABEL_CLASSNAME,
    fieldClassName: TEXT_INPUT_CLASSNAME,
  },
  {
    name: "model",
    label: "Model",
    placeholder: "Select model",
    component: RHSelect,
    options: [
      { label: "BMW", value: "bmw" },
      { label: "Audi", value: "audi" },
    ],
    labelClassName: LABEL_CLASSNAME,
    fieldClassName: TEXT_INPUT_CLASSNAME,
  },
  {
    name: "year",
    label: "Year",
    placeholder: "Select year",
    component: TextInput,
    labelClassName: LABEL_CLASSNAME,
    fieldClassName: TEXT_INPUT_CLASSNAME,
  },
  {
    name: "mileage",
    label: "Mileage",
    placeholder: "",
    component: TextInput,
    labelClassName: LABEL_CLASSNAME,
    fieldClassName: TEXT_INPUT_CLASSNAME,
  },
  {
    name: "price",
    label: "Price",
    placeholder: "",
    component: TextInput,
    labelClassName: LABEL_CLASSNAME,
    fieldClassName: TEXT_INPUT_CLASSNAME,
  },
  {
    name: "condition",
    label: "Condition",
    placeholder: "Select condition",
    component: RHSelect,
    options: [
      { label: "New", value: "new" },
      { label: "Used", value: "used" },
    ],
    labelClassName: LABEL_CLASSNAME,
    fieldClassName: TEXT_INPUT_CLASSNAME,
  },
  {
    name: "location",
    label: "Location",
    placeholder: "",
    component: TextInput,
    labelClassName: LABEL_CLASSNAME,
    fieldClassName: TEXT_INPUT_CLASSNAME + " col-span-1 sm:col-span-2",
  },
];

export const STEP_DETAILS_FORM_FIELDS = [
  {
    name: "body_style",
    label: "Body Style",
    placeholder: "Select body style",
    component: RHSelect,
    options: [
      { label: "Sedan", value: "sedan" },
      { label: "Hatchback", value: "hatchback" },
      { label: "SUV", value: "suv" },
      { label: "Coupe", value: "coupe" },
      { label: "Convertible", value: "convertible" },
      { label: "Wagon", value: "wagon" },
    ],
    labelClassName: LABEL_CLASSNAME,
    fieldClassName: TEXT_INPUT_CLASSNAME,
  },
  {
    name: "transmission",
    label: "Transmission",
    placeholder: "Select transmission",
    component: RHSelect,
    options: [
      { label: "Automatic", value: "automatic" },
      { label: "Manual", value: "manual" },
    ],
    labelClassName: LABEL_CLASSNAME,
    fieldClassName: TEXT_INPUT_CLASSNAME,
  },
  {
    name: "exterior_color",
    label: "Exterior Color",
    placeholder: "Select exterior color",
    component: RHSelect,
    options: [
      { label: "Black", value: "black" },
      { label: "White", value: "white" },
      { label: "Gray", value: "gray" },
      { label: "Red", value: "red" },
      { label: "Blue", value: "blue" },
      { label: "Green", value: "green" },
    ],
    labelClassName: LABEL_CLASSNAME,
    fieldClassName: TEXT_INPUT_CLASSNAME,
  },
  {
    name: "interior_color",
    label: "Interior Color",
    placeholder: "Select interior color",
    component: RHSelect,
    options: [
      { label: "Black", value: "black" },
      { label: "White", value: "white" },
      { label: "Gray", value: "gray" },
      { label: "Red", value: "red" },
      { label: "Blue", value: "blue" },
      { label: "Green", value: "green" },
    ],
    labelClassName: LABEL_CLASSNAME,
    fieldClassName: TEXT_INPUT_CLASSNAME,
  },
  {
    name: "fuel_type",
    label: "Fuel Type",
    placeholder: "Select fuel type",
    component: RHSelect,
    options: [
      { label: "5.0L V8", value: "5.0L V8" },
      { label: "3.0L V6", value: "3.0L V6" },
      { label: "2.0L I4", value: "2.0L I4" },
      { label: "1.6L I4", value: "1.6L I4" },
      { label: "1.5L I4", value: "1.5L I4" },
      { label: "1.0L I4", value: "1.0L I4" },
      { label: "1.0L I3", value: "1.0L I3" },
      { label: "1.0L I2", value: "1.0L I2" },
      { label: "1.0L I1", value: "1.0L I1" },
      { label: "1.0L I0", value: "1.0L I0" },
      { label: "1.0L I", value: "1.0L I" },
    ],
    labelClassName: LABEL_CLASSNAME,
    fieldClassName: TEXT_INPUT_CLASSNAME,
  },
  {
    name: "drive_type",
    label: "Drive Type",
    placeholder: "Select drive type",
    component: RHSelect,
    options: [
      { label: "Rear-wheel drive (RWD)", value: "RWD" },
      { label: "Front-wheel drive (FWD)", value: "FWD" },
      { label: "All-wheel drive (AWD)", value: "AWD" },
      { label: "Four-wheel drive (4WD)", value: "4WD" },
    ],
    labelClassName: LABEL_CLASSNAME,
    fieldClassName: TEXT_INPUT_CLASSNAME,
  },
  {
    name: "engine",
    label: "Enter engine details",
    placeholder: "",
    component: TextInput,
    labelClassName: LABEL_CLASSNAME,
    fieldClassName: TEXT_INPUT_CLASSNAME,
  },
  {
    name: "number_of_seats",
    label: "Enter number of seats",
    placeholder: "Number of seats",
    component: TextInput,
    labelClassName: LABEL_CLASSNAME,
    fieldClassName: TEXT_INPUT_CLASSNAME,
  },
  {
    name: "vin_code",
    label: "Enter VIN code",
    placeholder: "VIN code",
    component: TextInput,
    labelClassName: LABEL_CLASSNAME,
    fieldClassName: TEXT_INPUT_CLASSNAME,
  },
];

const createAdSchema = z.object({
  make: z.string().min(1),
  model: z.string().min(1),
  year: z.string().min(1),
  mileage: z.string().min(1),
  price: z.string().min(1),
  condition: z.string().min(1),
  location: z.string().min(1),

  body_style: z.string().min(1),
  transmission: z.string().min(1),
  exterior_color: z.string().min(1),
  interior_color: z.string().min(1),
  fuel_type: z.string().min(1),
  drive_type: z.string().min(1),
  engine: z.string().min(1),
  number_of_seats: z.string().min(1),
  description: z.string().optional(),
  vin_code: z.string().optional(),
});

export type CreateAdFormValues = z.infer<typeof createAdSchema>;

export const useCreateAdForm = () => {
  const [createAd, { isLoading }] = useCreateCarMutation();
  const form = useForm<CreateAdFormValues>({
    resolver: zodResolver(createAdSchema),
    defaultValues: {
      make: "",
      model: "",
      year: "",
      mileage: "",
      price: "",
      condition: "",
      location: "",
      body_style: "",
      transmission: "",
      exterior_color: "",
      interior_color: "",
      fuel_type: "",
      drive_type: "",
      engine: "",
      number_of_seats: "",
      description: "",
      vin_code: "",
    },
    mode: "onChange",
    shouldUnregister: false,
  });

  const router = useRouter();

  const handleSubmit = (
    status: CarStatus,
    uploadedPhotos: any[],
    features: string[]
  ) =>
    form.handleSubmit(async (data) => {
      const fullData: VehicleAd = {
        ...data,
        status,
        description: data.description ?? "",
        year: Number(data.year),
        mileage: Number(data.mileage),
        price: Number(data.price),
        features: features,
        images: uploadedPhotos.map((photo) => photo.url),
        vin_code: data.vin_code ?? "",
      };

      try {
        await createAd(fullData).unwrap();
        form.reset();
        NotificationService.success("Ad created successfully");
        router.push("/");
      } catch (err) {
        console.error("Create ad error:", err);
        NotificationService.error("Failed to create ad");
      }
    });

  return {
    form,
    handleSubmit,
    createAdSchema,
  };
};

export const STEP_FIELDS: Record<number, (keyof CreateAdFormValues)[]> = {
  0: ["make", "model", "year", "mileage", "price", "condition", "location"],
  1: [
    "body_style",
    "transmission",
    "exterior_color",
    "interior_color",
    "fuel_type",
    "drive_type",
    "engine",
    "number_of_seats",
  ],
};

export const isCurrentStepValid = (
  step: number,
  form: UseFormReturn<CreateAdFormValues>
) => {
  const values = form.getValues();
  const fieldsToCheck = STEP_FIELDS[step] || [];
  return fieldsToCheck.every((field) => !!values[field]);
};

// function to replace field with dynamic data

export const createDynamicFields = (
  currentStep: number,
  vehicleData: VehicleData,
  filters: VehicleFilters
) => {
  const FIELDS = [STEP_BASIC_FORM_FIELDS, STEP_DETAILS_FORM_FIELDS];
  return FIELDS[currentStep].map((field) => {
    if (field.name === "make") {
      return {
        ...field,
        component: VehicleSelect,
        field: "Make",
        vehicleData,
        vehicleFilters: filters,
      };
    }

    if (field.name === "model") {
      return {
        ...field,
        component: VehicleSelect,
        field: "Model",
        vehicleData,
        vehicleFilters: filters,
      };
    }

    if (field.name === "year") {
      return {
        ...field,
        component: VehicleSelect,
        field: "Year",
        vehicleData,
        vehicleFilters: filters,
      };
    }

    if (field.name === "body_style") {
      return {
        ...field,
        component: VehicleSelect,
        field: "Category",
        vehicleData,
        vehicleFilters: filters,
      };
    }

    return field;
  });
};
