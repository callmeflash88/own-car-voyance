"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Minus, Plus } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question: "What can I learn from a VIN check?",
    answer:
      "A VIN (Vehicle Identification Number) check provides a comprehensive view of a vehicle's past. When you enter a VIN on our platform, you'll get a detailed vehicle history report that includes ownership records, accident history, mileage verification, service records, title issues, and more",
  },
  {
    question: "How do I list my car for sale?",
    answer:
      'To list your car, go to the "Sell" tab, fill in the vehicle details, upload photos, and submit your listing for review.',
  },
  {
    question: "Is my personal information shared with buyers or sellers?",
    answer:
      "We respect your privacy. Your personal info is only shared when required to complete a transaction.",
  },
  {
    question: "Can I save vehicles or VINs to view later?",
    answer:
      "Yes! You can bookmark vehicles or VINs by clicking the save icon. They’ll be available in your dashboard.",
  },
];

export const FAQAnswers = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    console.log("index", index);
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {faqData.map((item, index) => (
        <div key={index} className="border-b border-gray-300 py-10">
          <button
            className="flex justify-between w-full gap-4 text-left text-lg font-medium text-gray-800"
            onClick={() => toggle(index)}
          >
            {item.question}
            {openIndex === index ? (
              <Minus className="min-w-6 min-h-6" />
            ) : (
              <Plus className="min-w-6 min-h-6" />
            )}
          </button>
          {openIndex === index && (
            <p className="mt-2 text-gray-600 text-sm">{item.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
};
