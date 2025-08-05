import { FAQAnswers } from "@/features/faq-answers/ui/FaqAnswers";
import { Button } from "@/shared/ui";

export const Faq = () => {
  return (
    <section className="relative py-32 flex flex-col justify-start items-start overflow-hidden bg-white">
      <div className="absolute inset-0 z-0 flex justify-center items-center">
        <div className="w-[90vw] h-[600px] bg-[#6F76F2] opacity-10 rounded-full blur-[25px]" />
      </div>

      <div className="px-4 lg:px-60 w-full flex flex-col lg:flex-row items-center justify-between">
        <div className="flex w-full lg:w-1/2 flex-col items-start">
          <h3 className="font-inter font-semibold text-[24px] lg:text-[40px] lg:leading-[54px] tracking-normal align-middle capitalize">
            Find Your
            <br className="hidden lg:block" /> Answers Here
          </h3>
          <p className="mt-4 font-inter font-normal text-[16px] lg:text-[20px] lg:leading-[30px] tracking-normal align-middle">
            Couldn’t not find what you were looking <br />
            for? Write to us at{" "}
            <span className="text-[#728CFD]">help@carvoyance.info</span>
          </p>
          <Button
            variant="primary"
            size="lg"
            className="w-full lg:w-auto mt-10 px-20"
          >
            Contact Us
          </Button>
        </div>
        <div className="flex w-full lg:w-1/2 flex-col items-start">
          <FAQAnswers />
        </div>
      </div>
    </section>
  );
};
