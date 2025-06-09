import "./globals.css";
import Header from "@/app/components/Header";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    
    <html lang="id">
      
      <body className="flex flex-col min-h-screen bg-white">
        <Header />
        <main className="flex-1">{children}</main>
        
      </body>
      
    </html>
  );
}
