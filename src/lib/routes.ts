export const ADMIN_ROUTES = {
  DASHBOARD: "/dashboard",
} as const;

export const MAIN_ROUTES = {
  HOME: "/",
  CREATE_AD: "/create-ad",
  PRODUCTS_LIST: "/products-list",

  LOGIN: "/login",

  CAR: (id: string | number) => `/car/${id}`,
} as const;

export const PROFILE_ROUTES = {
  CHAT: "/chat",
  FAVORITES: "/favorites",
  MY_VEHICLES: "/my-vehicles",
  PROFILE: "/profile",
  PROFILE_SEARCH: "/profile-search",
  SETTINGS: "/settings",

  EDIT_AD: (id: string | number) => `/edit-ad/${id}`,
} as const;
