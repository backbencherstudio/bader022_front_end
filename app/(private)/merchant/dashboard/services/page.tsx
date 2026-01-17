"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  FiSearch,
  FiEdit,
  FiTrash2,
  FiClock,
  FiChevronDown,
} from "react-icons/fi";
import ServiceModal from "../components/modal/ServiceModal";

/* ------------------ DATA ------------------ */
export const services = [
  {
    id: 1,
    title: "Hair Treatment",
    description:
      "Experience deep nourishment and revitalization with our professional hair treatment service",
    image: "/images/services1.png",
    duration: "30 min",
    price: 109,
    category: "Hair",
  },
  {
    id: 2,
    title: "Haircut & Styling",
    description:
      "Transform your look with our expert haircut and styling service, tailored to suit your unique features",
    image: "/images/services2.png",
    duration: "40 min",
    price: 112,
    category: "Hair",
  },
  {
    id: 3,
    title: "Hair Coloring",
    description:
      "Enhance your style with our professional hair coloring service, designed to bring richness",
    image: "/images/services3.png",
    duration: "45 min",
    price: 115,
    category: "Color",
  },
  {
    id: 4,
    title: "Hair Extensions",
    description:
      "Elevate your look with our premium hair extensions service, crafted to add instant length",
    image: "/images/services4.png",
    duration: "35 min",
    price: 118,
    category: "Hair",
  },
  {
    id: 5,
    title: "Scalp Treatment & Massage",
    description:
      "Indulge in our soothing scalp treatment and massage, designed to promote relaxation",
    image: "/images/services5.png",
    duration: "50 min",
    price: 120,
    category: "Spa",
  },
  {
    id: 6,
    title: "Hair Straightening or Perming",
    description:
      "Achieve the perfect texture with our professional hair straightening or perming service",
    image: "/images/services6.png",
    duration: "55 min",
    price: 125,
    category: "Hair",
  },
];

export default function ServicesPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Services");
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedService, setSelectedService] = useState<any>(null);

  const categories = [
    "All Services",
    ...Array.from(new Set(services.map((s) => s.category))),
  ];

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter =
      filter === "All Services" || service.category === filter;
    return matchesSearch && matchesFilter;
  });

  const handleSubmitService = (data: any) => {
    if (mode === "add") {
      console.log("Add Service:", data);
    } else {
      console.log("Edit Service:", data);
    }
  };

  return (
    <section className="p-4 md:p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
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

        {/* Dropdown */}
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
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border dark:border-gray-700 overflow-hidden"
          >
            <div className="relative h-48">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-5 space-y-3">
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
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-900 dark:bg-blue-600 text-white py-2 rounded-lg text-sm"
                >
                  <FiEdit />
                  Edit
                </button>

                <button className="flex-1 flex items-center justify-center gap-2 border text-red-500 dark:text-red-400 py-2 rounded-lg text-sm">
                  <FiTrash2 />
                  Delete
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
      />
    </section>
  );
}
