import { Inter } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });
function AdminLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body className={inter.className}>
          <div className="w-full h-screen">{children}</div>
        </body>
      </html>
    </>
  );
}

export default AdminLayout;
