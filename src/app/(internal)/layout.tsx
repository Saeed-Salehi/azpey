import { InternalFooter } from "@/components/layout/internal-footer";
import { InternalHeader } from "@/components/layout/internal-header";
import { CartProvider } from "@/components/providers/cart-provider";

export default function InternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="min-h-dvh bg-background">
        <InternalHeader />
        <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
        <InternalFooter />
      </div>
    </CartProvider>
  );
}

