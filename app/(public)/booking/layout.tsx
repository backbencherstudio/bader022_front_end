import BookingProvider from "./context/BookingContext";

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <BookingProvider>{children}</BookingProvider>
    </div>
  );
}
