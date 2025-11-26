import type { Metadata } from "next";
import "./globals.css";
import { ExecutionPlanProvider } from "./context/ExecutionPlanContext";

export const metadata: Metadata = {
  title: "WaterOS Planning",
  description: "Strategic planning and documentation for WaterOS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <ExecutionPlanProvider>
          {children}
        </ExecutionPlanProvider>
      </body>
    </html>
  );
}
