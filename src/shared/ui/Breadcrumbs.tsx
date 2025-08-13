"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MAIN_ROUTES } from "@/lib/routes";
import { useCallback } from "react";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
  isLast?: boolean;
}

interface BreadcrumbsProps {
  customLastLabel?: string;
}

const Breadcrumbs = ({ customLastLabel }: BreadcrumbsProps) => {
  const pathname = usePathname();

  const generateBreadcrumbs = useCallback<() => BreadcrumbItem[] | null>(() => {
    // don't show breadcrumbs on home page
    if (pathname === MAIN_ROUTES.HOME) {
      return null;
    }

    // process product-list
    if (pathname === MAIN_ROUTES.PRODUCTS_LIST) {
      return [
        { label: "Home", href: MAIN_ROUTES.HOME },
        {
          label: customLastLabel || "Buy",
          href: MAIN_ROUTES.PRODUCTS_LIST,
          isLast: true,
        },
      ];
    }

    // process path /car/:id
    const carPathRegex = /^\/car\/(\d+)$/;
    if (carPathRegex.test(pathname)) {
      return [
        { label: "Home", href: MAIN_ROUTES.HOME },
        { label: "Buy", href: MAIN_ROUTES.PRODUCTS_LIST },
        { label: customLastLabel || "Car", href: pathname, isLast: true },
      ];
    }

    return null;
  }, [pathname, customLastLabel]);

  const breadcrumbs = generateBreadcrumbs();

  if (!breadcrumbs) return null;

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center min-h-5 gap-1 text-base text-[#2B2B2B99] leading-none">
        {breadcrumbs.map((item, idx) => (
          <li key={item.label} className="flex items-center gap-2">
            {idx > 0 && <ChevronRight size={16} />}
            {item.href && !item.isLast ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span className="text-[#2B2B2B]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
