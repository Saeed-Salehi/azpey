export type UserRole = "buyer" | "seller";

export type RegistrationProfile = {
  firstName: string;
  lastName: string;
  provinceId: string;
  city: string;
  addressLine: string;
  role: UserRole | "";
  businessTypeId: string;
  productNeedId: string;
  workScaleId: string;
};

export const emptyRegistrationProfile = (): RegistrationProfile => ({
  firstName: "",
  lastName: "",
  provinceId: "",
  city: "",
  addressLine: "",
  role: "",
  businessTypeId: "",
  productNeedId: "",
  workScaleId: "",
});
