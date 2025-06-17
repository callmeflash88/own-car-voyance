import Image from "next/image";
import logo from "../../../public/assets/logo.svg";
import { Facebook, Linkedin, Twitter } from "lucide-react";

const forBuyersLinks = [
  {
    name: "Search Vehicles",
    href: "#",
  },
  {
    name: "Compare Cars",
    href: "#",
  },
  {
    name: "Insurance Quotes",
    href: "#",
  },
  {
    name: "VIN Vault",
    href: "#",
  },
];

const fontSellerLinks = [
  {
    name: "List Your Car",
    href: "#",
  },
  {
    name: "Pricing Guide",
    href: "#",
  },
  {
    name: "Seller Resources",
    href: "#",
  },
  {
    name: "Success Stories",
    href: "#",
  },
];

const companyLinks = [
  {
    name: "About Us",
    href: "#",
  },
  {
    name: "Careers",
    href: "#",
  },
  {
    name: "Press",
    href: "#",
  },
  {
    name: "Contact",
    href: "#",
  },
];

const talkToUs = [
  {
    name: "support@com.com",
    href: "#",
  },
  {
    name: "+66 2399 1145",
    href: "#",
  },
  {
    name: "Contact Us",
    href: "#",
  },
  {
    name: "Facebook",
    href: "#",
  },
  {
    name: "Linkedin",
    href: "#",
  },
  {
    name: "Twitter",
    href: "#",
  },
];

export const Footer = () => {
  return (
    <footer className="w-full mt-20 mb-10">
      <div className="px-40 flex flex-col gap-10">
        <div className="w-full flex justify-between items-start border-b-[1px] border-[#555454] pb-20">
          <div className="flex flex-col">
            <h4 className="font-inter font-bold text-[15px] leading-none tracking-[0px] uppercase">
              For Buyers
            </h4>
            <ul className="flex flex-col gap-2 mt-8">
              {forBuyersLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-[#2B2B2B]">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col">
            <h4 className="font-inter font-bold text-[15px] leading-none tracking-[0px] uppercase">
              For Seller
            </h4>
            <ul className="flex flex-col gap-2 mt-8">
              {fontSellerLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-[#2B2B2B]">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col">
            <h4 className="font-inter font-bold text-[15px] leading-none tracking-[0px] uppercase">
              Company
            </h4>
            <ul className="flex flex-col gap-2 mt-8">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-[#2B2B2B]">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col">
            <h4 className="font-inter font-bold text-[15px] leading-none tracking-[0px] uppercase">
              Talk to Us
            </h4>
            <ul className="flex flex-col gap-2 mt-8">
              {talkToUs.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-[#2B2B2B]">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <Image src={logo} alt="logo" width={200} />
          <div>
            <p>© 2025 CarVoyance. All Rights Reserved. </p>
          </div>
          <div className="flex gap-5">
            <div className="p-2 rounded-full border-[1px] border-[#2B2B2B]">
              <Facebook fill="#2B2B2B" />
            </div>
            <div className="p-2 rounded-full border-[1px] border-[#2B2B2B]">
              <Linkedin fill="#2B2B2B" />
            </div>
            <div className="p-2 rounded-full border-[1px] border-[#2B2B2B]">
              <Twitter fill="#2B2B2B" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
