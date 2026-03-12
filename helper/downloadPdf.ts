// helper/downloadPdf.ts
"use client";
import html2pdf from "html2pdf.js";

type Row = { label: string; value: any };

export const downloadPdf = async (
  title: string,
  rows: Row[],
  fileName: string,
): Promise<void> => {
  console.log("🚀 Starting PDF generation for:", fileName);

  try {
    // Check if html2pdf is available
    if (!html2pdf) {
      throw new Error("html2pdf library not loaded");
    }

    const element = document.createElement("div");

    // Sanitize values to prevent undefined
    const sanitizedRows = rows.map((row) => ({
      label: row.label || "",
      value: row.value !== undefined && row.value !== null ? row.value : "N/A",
    }));

    // SIMPLE BLACK AND WHITE STYLING - no colors, no lab() functions
    const tableRows = sanitizedRows
      .map(
        (row) => `
        <tr>
          <th style="text-align:left;padding:8px;border:1px solid black;background-color:#f0f0f0;font-weight:bold;">${row.label}</th>
          <td style="padding:8px;border:1px solid black;">${row.value}</td>
        </tr>
      `,
      )
      .join("");

    element.innerHTML = `
      <div style="font-family: Arial, Helvetica, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; color: black;">
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid black; padding-bottom: 10px;">
          <h1 style="font-size: 24px; margin: 0; color: black;">${title}</h1>
          <p style="font-size: 12px; margin-top: 5px; color: #333;">Generated on ${new Date().toLocaleString()}</p>
        </div>
        
        <table style="border-collapse: collapse; width: 100%; border: 1px solid black;">
          ${tableRows}
        </table>
        
        <div style="margin-top: 30px; text-align: center; font-size: 10px; color: #666; border-top: 1px solid #ccc; padding-top: 10px;">
          <p>Thank you for your business</p>
        </div>
      </div>
    `;

    console.log(
      "📄 PDF element created with black & white styling, calling html2pdf...",
    );

    // Simple configuration - minimal options
    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: `${fileName}.pdf`,
      image: { type: "jpeg", quality: 0.95 },
      html2canvas: { scale: 1.5 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    // Use Promise to handle the PDF generation
    await new Promise((resolve, reject) => {
      try {
        html2pdf().set(opt).from(element).save().then(resolve).catch(reject);
      } catch (error) {
        reject(error);
      }
    });

    console.log(" PDF saved successfully for:", fileName);
  } catch (error) {
    console.error(" Error generating PDF:", error);
    throw new Error(
      `PDF generation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
};
