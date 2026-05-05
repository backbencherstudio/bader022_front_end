"use client";
import DynamicMiniSite from "@/components/DynamicMiniSite/DynamicMiniSite";
import NotFoundPage from "@/components/NotFoundPage";
import { useMiniSiteByDomainNameQuery } from "@/redux/features/merchant/miniSiteApi";
import { Loader } from "lucide-react";
import { useParams } from "next/navigation";

export default function DynamicMiniSitePage() {
  const params = useParams();
  const domain = params.slug;

  // console.log(domain);

  const { data, isLoading } = useMiniSiteByDomainNameQuery({
    domainName: domain as string,
  });

  // console.log(data);

  if (isLoading) {
    return <Loader />;
  }

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
