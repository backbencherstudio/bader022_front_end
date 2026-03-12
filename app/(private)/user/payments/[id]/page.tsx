"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookingDetails() {
    const { id } = useParams();
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const res = await fetch(`http://192.168.7.98:8000/api/admin/dashboard/invoice/${id}`);
                const result = await res.json();

                console.log("Full Response:", result);
                console.log("Invoice:", result?.data?.invoice_info?.invoice_no);

                setData(result.data);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        fetchInvoice();
    }, [id]);

    // if (!data) return <p>Loading...</p>;

    return (
        <div>
            <h1>Route ID: {id}</h1>

            <h2>Invoice No: {data?.invoice_info?.invoice_no}</h2>
            <h2>Customer: {data?.customer?.name}</h2>
            <h2>Service: {data?.service?.service_name}</h2>
            <h2>Total: {data?.summary?.total} {data?.summary?.currency}</h2>
        </div>
    );
}