export const calculateProfileCompletion = (user: any): number => {
  if (!user) return 0;

  const fieldsToCheck = [
    "full_name",
    "email",
    "phone",
    "bio",
    "gender",
    "location",
    "logo",
  ];

  const filledCount = fieldsToCheck.filter((key) => Boolean(user[key])).length;
  const percentage = Math.round((filledCount / fieldsToCheck.length) * 100);

  return percentage;
};
