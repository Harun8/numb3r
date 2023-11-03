import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Nav from "./components/Nav";
import Footer from "./components/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="main">
        <div className="mb-5">
          <Nav></Nav>
        </div>
        {children}
      </body>
      <Footer></Footer>
    </html>
  );
}
