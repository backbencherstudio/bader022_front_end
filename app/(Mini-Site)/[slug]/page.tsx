"use client";
import DynamicMiniSite from "@/components/DynamicMiniSite/DynamicMiniSite";
import NotFoundPage from "@/components/NotFoundPage";
import { useMiniSiteByDomainNameQuery } from "@/redux/features/merchant/miniSiteApi";
import { Loader } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DynamicMiniSitePage() {
  const params = useParams();
  const router = useRouter();
  const domain = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const { data, isLoading } = useMiniSiteByDomainNameQuery({
    domainName: domain as string,
  });

  useEffect(() => {
    if (!isLoading && data?.status === true && data?.data?.is_premium === false) {
      router.replace(`/${domain}/booking`);
    }
  }, [data, domain, isLoading, router]);

  if (isLoading || data?.data?.is_premium === false) {
    return <Loader />;
  }

  return (
    <div>
      {data?.status === true && data?.data?.is_premium === true ? (
        <DynamicMiniSite data={data?.data} />
      ) : (
        <NotFoundPage />
      )}
    </div>
  );
}
