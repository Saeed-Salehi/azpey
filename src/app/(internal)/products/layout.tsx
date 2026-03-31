import { ProductManageNav } from "@/components/products/product-manage-nav";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold sm:text-3xl">مدیریت محصولات</h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          لیست محصولات ثبت‌شده توسط شما و افزودن محصول جدید
        </p>
      </div>
      <ProductManageNav />
      {children}
    </div>
  );
}
