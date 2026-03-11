type Row = { label: string; value: any };

export const downloadPdf = async (title: string, rows: Row[], fileName: string) => {
  // html2pdf dynamic import
  const html2pdf = (await import("html2pdf.js")).default;

  const element = document.createElement("div");

  const tableRows = rows
    .map(
      (row) => `
      <tr>
        <th style="text-align:left;padding:8px;border:1px solid #ccc;">${row.label}</th>
        <td style="padding:8px;border:1px solid #ccc;">${row.value}</td>
      </tr>
    `
    )
    .join("");

  element.innerHTML = `
    <div style="font-family:Arial;padding:20px">
      <h2 style="margin-bottom:20px">${title}</h2>
      <table style="border-collapse:collapse;width:100%">
        ${tableRows}
      </table>
    </div>
  `;

  html2pdf().from(element).save(`${fileName}.pdf`);
};