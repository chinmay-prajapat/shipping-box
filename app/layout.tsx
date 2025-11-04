import NavigationBar from "./components/organisms/NavigationBar/page";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" cz-shortcut-listen="true">
        <NavigationBar />
        {children}
      </body>
    </html>
  );
}
