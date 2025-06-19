import { isValidEmail } from "./isValidMail";

describe("isValidEmail", () => {
  it("returns false for empty input", () => {
    expect(isValidEmail("")).toBe(false);
  });

  it("returns false for invalid formats", () => {
    expect(isValidEmail("plainaddress")).toBe(false);
    expect(isValidEmail("@missinglocal.com")).toBe(false);
    expect(isValidEmail("user@.com")).toBe(false);
    expect(isValidEmail("user@com")).toBe(false);
    expect(isValidEmail("user@site..com")).toBe(false);
    expect(isValidEmail("user.@domain.com")).toBe(false);
  });

  it("returns true for valid email formats", () => {
    expect(isValidEmail("test@example.com")).toBe(true);
    expect(isValidEmail("user.name+tag+sorting@example.com")).toBe(true);
    expect(isValidEmail("user_name@example.co.uk")).toBe(true);
  });

  it("returns false for long emails (>254)", () => {
    const local = "a".repeat(64);
    const domain = "b".repeat(189) + ".com"; // total = 64 + 189 + 4 = 257
    expect(isValidEmail(`${local}@${domain}`)).toBe(false);
  });

  it("returns false for long local part (>64)", () => {
    const local = "a".repeat(65);
    const domain = "example.com";
    expect(isValidEmail(`${local}@${domain}`)).toBe(false);
  });
});
