import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const features = [
  { feature: "Online booking", freePlan: "✔", premiumPlan: "✔" },
  { feature: "Number of staff", freePlan: "1 Staff", premiumPlan: "Unlimited" },
  { feature: "Multiple branches", freePlan: "✘", premiumPlan: "✔" },
  {
    feature: "Booking reminders",
    freePlan: "Manual reminder sending",
    premiumPlan: "Auto reminders",
  },
  { feature: "Mini-site access", freePlan: "✘", premiumPlan: "✔" },
  { feature: "Email notifications", freePlan: "✘", premiumPlan: "✔" },
  { feature: "Basic analytics", freePlan: "✘", premiumPlan: "✔" },
  { feature: "Advanced reports", freePlan: "✘", premiumPlan: "✔" },
];

export function FeatureComparison() {
  return (
    <div className="container mx-auto py-16 px-4">
      <h2 className="text-4xl md:text-5xl font-semibold text-center mb-4 text-gray-900">
        Detailed Feature Comparison
      </h2>
      <p className="text-center mb-12 text-[16px] text-black">
        Manage appointments, staff schedules, services, and customer
        interactions seamlessly <br /> through Bokli&apos;s intelligent,
        automated booking system.
      </p>
      <Table>
        <TableHeader className="bg-linear-to-r text-white text-[16px] font-semibold from-[#3CB3FF] to-[#7153FF]">
          <TableRow>
            <TableHead className="text-center text-white">Features</TableHead>
            <TableHead className="text-center text-white">Free Plan</TableHead>
            <TableHead className="text-center text-white">
              Premium Plan
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-center text-[16px]">
          {features.map((feature) => (
            <TableRow key={feature.feature}>
              <TableCell>{feature.feature}</TableCell>
              <TableCell>{feature.freePlan}</TableCell>
              <TableCell>{feature.premiumPlan}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
