export const FormFieldVariants = {
  PRIMARY: "primary",
} as const;

export type FormFieldVariants =
  (typeof FormFieldVariants)[keyof typeof FormFieldVariants];
