export function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;

  const regex = new RegExp(
    "^(?![\\.])(?!.*\\.\\.)" +
      "([A-Za-z0-9!#$%&'*+/=?^_`{|}~-]{1,64}" +
      "(?:\\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*)" +
      "@" +
      "([A-Za-z0-9]" +
      "(?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?" +
      "(?:\\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+)$"
  );

  const match = regex.exec(email);
  if (!match) return false;

  const local = match[1];
  return local.length <= 64;
}
