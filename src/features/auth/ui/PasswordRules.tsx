import { CheckCircle2 } from "lucide-react";

interface Props {
  rules: {
    length: boolean;
    letter: boolean;
    number: boolean;
    special: boolean;
  };
}

export const PasswordRules = ({ rules }: Props) => {
  const renderItem = (valid: boolean, text: string) => (
    <li className="flex items-center gap-2" key={text}>
      <CheckCircle2 className={valid ? "text-green-600" : "text-gray-400"} />
      <span className={valid ? "text-green-600" : "text-gray-400"}>{text}</span>
    </li>
  );

  return (
    <ul className="space-y-2 text-sm mt-4">
      {renderItem(rules.length, "At least 8 characters")}
      {renderItem(rules.letter, "Minimum 1 latin letter")}
      {renderItem(rules.number, "At least 1 number")}
      {renderItem(rules.special, "At least 1 special character (#$@%)")}
    </ul>
  );
};
