import "./globals.css"; // Pastikan baris ini ADA

export const metadata = {
  title: "LKI Merchandise",
  description: "Legacy Keeps Inspiring. Official merchandise store.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="antialiased">{children}</body>
    </html>
  );
}