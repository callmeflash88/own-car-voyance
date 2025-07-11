import { Select } from "@/shared/ui";
import { RHSelect } from "@/shared/ui/FormField/RHSelect";
import { TextInput } from "@/shared/ui/FormField/TextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
    placeholder: "",
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
    fieldClassName: TEXT_INPUT_CLASSNAME + " col-span-2",
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
];

const createAdSchema = z.object({
  make: z.string().min(1),
});

export type CreateAdFormValues = z.infer<typeof createAdSchema>;

export const useCreateAdForm = () => {
  const form = useForm<CreateAdFormValues>({
    resolver: zodResolver(createAdSchema),
    defaultValues: {
      make: "",
    },
  });

  return {
    form,
    createAdSchema,
  };
};
