"use client";
import { useEffect } from "react";

export default function ContactSection() {
  useEffect(() => {
    const container = document.getElementById("hubspotForm");
    if (!container) return;

    // Очищаем контейнер перед рендером
    container.innerHTML = "";

    // Проверяем, есть ли уже скрипт
    if (
      !document.querySelector(
        'script[src="https://js-na2.hsforms.net/forms/embed/v2.js"]'
      )
    ) {
      const script = document.createElement("script");
      script.src = "https://js-na2.hsforms.net/forms/embed/v2.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = loadHubspotForm;
    } else {
      // Если скрипт уже есть, просто вызываем форму
      loadHubspotForm();
    }

    function loadHubspotForm() {
      if ((window as any).hbspt) {
        (window as any).hbspt.forms.create({
          region: "na2",
          portalId: "243590086",
          formId: "734c9fa0-f8f7-4179-931c-78e98ee4e342",
          target: "#hubspotForm",
        });
      }
    }
  }, []);

  return (
    <section className="relative min-h-[85vh] w-full flex flex-col items-center justify-center px-4 py-12 bg-[#FAFAFA]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#6F76F2] opacity-20 blur-[200px] rounded-full pointer-events-none"></div>

      <h1 className="text-3xl lg:text-5xl font-bold font-inter text-[#292929] mb-4 text-center z-10">
        Get in Touch
      </h1>
      <p className="text-base lg:text-lg text-[#4E4E4E] max-w-[500px] text-center mb-10 z-10">
        Have questions or feedback? Fill out the form below and our team will
        get back to you as soon as possible.
      </p>

      <div
        id="hubspotForm"
        className="w-full max-w-[1200px] bg-white shadow-lg rounded-2xl p-6 z-10"
      ></div>
    </section>
  );
}
