import { Suspense } from "react";
import { prisma } from "@/app/lib/prisma";
import ShopHomeClient from "./ShopHomeClient";

async function ShopContent() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return <ShopHomeClient products={products} />;
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ShopContent />
    </Suspense>
  );
}