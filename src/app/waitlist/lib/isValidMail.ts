// export function isValidEmail(email: string): boolean {
//   if (!email || email.length > 254) return false;

//   const regex = new RegExp(
//     "^(?![.])(?!.*[.]{2})" +
//       "([A-Za-z0-9!#$%&'*+/=?^_`{|}~-]{1,64}" +
//       "(?:\\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*)" +
//       "@" +
//       "([A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?" +
//       "(?:\\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+)$"
//   );

//   const match = regex.exec(email);
//   if (!match) return false;

//   const local = match[1];
//   const domain = match[2];

//   if (!/^[A-Za-z0-9.-]+$/.test(domain)) return false;

//   return local.length <= 64;
// }

import { z } from "zod";

export function isValidEmail(email: string): boolean {
  const schema = z
    .string()
    .max(254)
    .email()
    .refine((val) => {
      const domain = val.split("@")[1];

      return /^[a-zA-Z0-9.-]+$/.test(domain);
    });

  const result = schema.safeParse(email);
  return result.success;
}
