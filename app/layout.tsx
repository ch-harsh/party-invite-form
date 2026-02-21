export const metadata = {
  title: "Party Invitation Form",
  description: "Submit your details for the party invite 🎉",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}