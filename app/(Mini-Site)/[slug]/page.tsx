"use client";
import LandingPage from "@/app/(private)/merchant/dashboard/components/mini-site/components/LandingPage";
import { LandingPageProvider } from "@/app/(private)/merchant/dashboard/components/mini-site/context/LandingBuilderContext";
import DynamicMiniSite from "@/components/DynamicMiniSite/DynamicMiniSite";
import NotFoundPage from "@/components/NotFoundPage";
import { useMiniSiteByDomainNameQuery } from "@/redux/features/merchant/miniSiteApi";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

export default function DynamicMiniSitePage() {
  const params = useParams();
  const domain = params.slug;

  // console.log(domain);

  const { data } = useMiniSiteByDomainNameQuery(`${domain}`);

  // console.log(data);

  return (
    <div>
      {data?.status === true ? (
        <DynamicMiniSite data={data?.data} />
      ) : (
        <NotFoundPage />
      )}
    </div>
  );
}
