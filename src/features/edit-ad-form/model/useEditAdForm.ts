import {
  CarStatus,
  UpdateVehicleAd,
  useUpdateMyCarMutation,
  VehicleAd,
} from "@/shared/api/carApi";
import { NotificationService } from "@/shared/lib/NotificationService";
import { RHSelect } from "@/shared/ui/FormField/RHSelect";
import { TextInput } from "@/shared/ui/FormField/TextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

const LABEL_CLASSNAME = "font-bold text-gray-dark text-xl";
const TEXT_INPUT_CLASSNAME = " py-2 ";

export const EDIT_AD_FORM_FIELDS = [
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
    fieldClassName: TEXT_INPUT_CLASSNAME + " col-span-2",
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
    fieldClassName: TEXT_INPUT_CLASSNAME + " col-span-2",
  },
  {
    name: "year",
    label: "Year",
    placeholder: "",
    component: TextInput,
    labelClassName: LABEL_CLASSNAME,
    fieldClassName: TEXT_INPUT_CLASSNAME + " col-span-2",
  },
  {
    name: "mileage",
    label: "Mileage",
    placeholder: "",
    component: TextInput,
    labelClassName: LABEL_CLASSNAME,
    fieldClassName: TEXT_INPUT_CLASSNAME + " col-span-2",
  },
  {
    name: "price",
    label: "Price",
    placeholder: "",
    component: TextInput,
    labelClassName: LABEL_CLASSNAME,
    fieldClassName: TEXT_INPUT_CLASSNAME + " col-span-2",
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
    fieldClassName: TEXT_INPUT_CLASSNAME + " col-span-2",
  },
  {
    name: "location",
    label: "Location",
    placeholder: "",
    component: TextInput,
    labelClassName: LABEL_CLASSNAME,
    fieldClassName: TEXT_INPUT_CLASSNAME + " col-span-2",
  },
  {
    name: "number_of_seats",
    label: "Number of seats",
    placeholder: "",
    component: TextInput,
    labelClassName: LABEL_CLASSNAME,
    fieldClassName: TEXT_INPUT_CLASSNAME + " col-span-2",
  },
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
    fieldClassName: TEXT_INPUT_CLASSNAME + " col-span-2",
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
    fieldClassName: TEXT_INPUT_CLASSNAME + " col-span-2",
  },
  {
    name: "engine",
    label: "Enter engine details",
    placeholder: "",
    component: TextInput,
    labelClassName: LABEL_CLASSNAME,
    fieldClassName: TEXT_INPUT_CLASSNAME + " col-span-2",
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
    fieldClassName: TEXT_INPUT_CLASSNAME + " col-span-2",
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
    fieldClassName: TEXT_INPUT_CLASSNAME + " col-span-2",
  },
];

const editAdSchema = z.object({
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
});

export type EditAdSchemaType = z.infer<typeof editAdSchema>;

export const useEditAdForm = (car?: VehicleAd) => {
  const [updateCar, { isLoading }] = useUpdateMyCarMutation();
  const router = useRouter();

  const form = useForm<EditAdSchemaType>({
    resolver: zodResolver(editAdSchema),
    defaultValues: {
      make: car?.make || "",
      model: car?.model || "",
      year: car?.year?.toString() || "",
      mileage: car?.mileage?.toString() || "",
      price: car?.price?.toString() || "",
      condition: car?.condition || "",
      location: car?.location || "",
      body_style: car?.body_style || "",
      transmission: car?.transmission || "",
      exterior_color: car?.exterior_color || "",
      interior_color: car?.interior_color || "",
      fuel_type: car?.fuel_type || "",
      drive_type: car?.drive_type || "",
      engine: car?.engine || "",
      number_of_seats: car?.number_of_seats?.toString() || "",
      description: car?.description || "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const fullData: UpdateVehicleAd = {
      ...data,
      id: car?.id || 0,
      images: car?.images || [],
      status: car?.status || CarStatus.ACTIVE,
      features: car?.features || [],
      year: Number(data.year),
      mileage: Number(data.mileage),
      price: Number(data.price),
      description: data.description ?? "",
    };

    try {
      await updateCar(fullData).unwrap();
      NotificationService.success("Car updated successfully");
      router.push("/my-vehicles");
    } catch (err) {
      console.error("Update car error:", err);
      NotificationService.error("Failed to update car");
    }
  });

  return { form, onSubmit, isLoading };
};
