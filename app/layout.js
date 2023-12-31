import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primeflex/primeflex.css"; // css utility
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
const inter = Inter({ subsets: ["latin"] });

// ... other icon imports

export const metadata = {
  title: "Numb3r  |  Guess the number",
  description: "Wordle, but just numbers instead..",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="main">
        <PrimeReactProvider>
          <div className="mb-5 ">
            <Nav></Nav>
          </div>
          {children}
          <Footer></Footer>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
