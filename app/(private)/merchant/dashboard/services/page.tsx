"use client";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import {
  FiSearch,
  FiEdit,
  FiTrash2,
  FiClock,
  FiChevronDown,
} from "react-icons/fi";
import ServiceModal from "../components/modal/ServiceModal";
import {
  useAllServicesQuery,
  useCreateServiceMutation,
  useDeleteServiceByIdMutation,
  useUpdateServiceByIdMutation,
} from "@/redux/features/merchant/servicesApi";
import { getImageUrl } from "@/helper/formatImage";
import { toast } from "sonner";

export default function ServicesPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Services");
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedService, setSelectedService] = useState<any>(null);

  const { data: servicesData, isLoading, isError } = useAllServicesQuery({});
  const [createService, { isLoading: isCreateServiceLoading }] =
    useCreateServiceMutation();
  const [updateServiceById, { isLoading: isUpdateServiceLoading }] =
    useUpdateServiceByIdMutation();
  const [deleteServiceById, { isLoading: isDeleteServiceLoading }] =
    useDeleteServiceByIdMutation();

  // SAFE ARRAY (prevents map/filter crash)
  const services = servicesData?.data ?? [];

  // CATEGORY LIST
  const categories = useMemo(() => {
    const unique = new Set<string>();
    services.forEach((s: any) => {
      if (s?.category) unique.add(s.category);
      else if (s?.service_name) unique.add(s.service_name);
    });
    return ["All Services", ...Array.from(unique)];
  }, [services]);

  // FILTERED SERVICES
  const filteredServices = useMemo(() => {
    return services.filter((service: any) => {
      const title = service?.service_name ?? "";
      const category = service?.category ?? service?.service_name ?? "";

      const matchesSearch = title.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "All Services" || category === filter;

      return matchesSearch && matchesFilter;
    });
  }, [services, search, filter]);

  const handleSubmitService = async (data: any) => {
    if (mode === "add") {
      // console.log("Add Service:", data);
      try {
        const formData = new FormData();

        formData.append("service_name", data.service_name);
        formData.append("duration", data.duration);
        formData.append("price", data.price);
        formData.append("description", data.description);
        formData.append("status", "1");

        if (data.image && data.image.length > 0) {
          formData.append("image", data.image[0]);
        }

        const response = await createService(formData).unwrap();

        toast.success("Service created successfully");
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to create service");
      }
    } else {
      // console.log("Edit Service:", data);
      const id = data.id;
      try {
        const formData = new FormData();

        formData.append("service_name", data.service_name);
        formData.append("duration", data.duration);
        formData.append("price", data.price);
        formData.append("description", data.description);
        formData.append("status", "1");
        formData.append("_method", "put");

        if (data.image && data.image.length > 0) {
          formData.append("image", data.image[0]);
        }

        const response = await updateServiceById({ id, formData }).unwrap();

        toast.success("Service updated successfully");
        setOpenModal(false);
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to updated service");
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    await toast.promise(deleteServiceById(id).unwrap(), {
      loading: "Deleting service...",
      success: "Service deleted successfully",
      error: (err) => err?.data?.message || "Delete failed ",
    });
  };

  if (isLoading) return <p className="p-6">Loading services...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Failed to load services</p>;

  return (
    <section className="md:p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-xl font-semibold">Services</h2>

        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300" />
            <input
              type="text"
              placeholder="Search anything"
              className="pl-10 pr-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            onClick={() => {
              setMode("add");
              setSelectedService(null);
              setOpenModal(true);
            }}
            className="bg-gray-900 dark:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
          >
            Add Service
          </button>
        </div>
      </div>

      {/* Filter */}
      <div className="relative w-fit">
        <div className="flex items-center gap-3 text-sm">
          <span className="text-gray-500 dark:text-gray-400">Filter by:</span>

          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 border px-4 py-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            {filter}
            <FiChevronDown />
          </button>
        </div>

        {open && (
          <div className="absolute mt-2 w-40 bg-white dark:bg-gray-700 border rounded-lg shadow-md z-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 ${
                  filter === cat
                    ? "font-semibold bg-gray-50 dark:bg-gray-600"
                    : ""
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service: any) => (
          <div
            key={service.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border dark:border-gray-700 overflow-hidden"
          >
            <div className="relative h-48">
              <Image
                src={getImageUrl(service.image) || "/images/company3.png"}
                alt={service?.service_name || "service image"}
                fill
                className="object-cover"
                unoptimized={true}
              />
            </div>

            <div className="p-5 space-y-3">
              <h3 className="font-semibold">{service?.service_name}</h3>
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <FiClock />
                  {service.duration}
                </div>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {service.price} SAR
                </span>
              </div>

              <h3 className="font-semibold">{service.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {service.description}
              </p>
              <div className="flex gap-3 pt-3">
                <button
                  onClick={() => {
                    setMode("edit");
                    setSelectedService(service);
                    setOpenModal(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-900 dark:bg-blue-600 text-white py-2 rounded-lg text-sm cursor-pointer"
                >
                  <FiEdit />
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(service.id)}
                  disabled={isDeleteServiceLoading}
                  className="flex-1 flex items-center justify-center gap-2 border text-red-500 dark:text-red-400 py-2 rounded-lg text-sm cursor-pointer"
                >
                  {isDeleteServiceLoading ? (
                    "Deleting..."
                  ) : (
                    <>
                      <FiTrash2 />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ServiceModal
        open={openModal}
        mode={mode}
        initialData={selectedService}
        onClose={() => setOpenModal(false)}
        onSubmitService={handleSubmitService}
        isLoading={isCreateServiceLoading || isUpdateServiceLoading}
      />
    </section>
  );
}
