import { Montserrat } from "next/font/google";
import "../globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata = {
  title: "Admin Area - We Buy Dead Stocks",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <body className={montserrat.variable}>
        {children}
      </body>
    </html>
  );
}
