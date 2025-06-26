'use client';

// import { use } from "react"
import ReceiptInformation from "./components/ReceiptInformation";

interface DetailPageProps {
  params: {
    id: string;
  };
}

export default function DetailResepPage({ params }: DetailPageProps) {
  return <ReceiptInformation recipeId={params.id} />;
}