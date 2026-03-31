"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { loadSalesHistory } from "@/lib/storage/history";
import type { HistoryLine } from "@/types/seller";

export default function SalesHistoryPage() {
  const [lines, setLines] = React.useState<HistoryLine[]>([]);

  React.useEffect(() => {
    setLines(loadSalesHistory());
  }, []);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold sm:text-3xl">تاریخچه فروش</h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          محصولات و اقلامی که به عنوان فروشنده ثبت شده‌اند
        </p>
      </div>

      {lines.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-14 text-muted-foreground">
            <TrendingUp className="size-10" />
            <p>رکورد فروشی ثبت نشده است.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {lines.map((line) => (
            <Card key={line.id}>
              <CardHeader className="pb-2">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <CardTitle className="text-base">{line.productName}</CardTitle>
                  <CardDescription>
                    {new Date(line.date).toLocaleDateString("fa-IR", {
                      dateStyle: "medium",
                    })}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span>
                  تعداد:{" "}
                  <strong className="text-foreground">
                    {line.quantity.toLocaleString("fa-IR")} {line.unit}
                  </strong>
                </span>
                <span>
                  فی: {line.unitPrice.toLocaleString("fa-IR")} تومان
                </span>
                <span>
                  جمع:{" "}
                  <strong className="text-primary">
                    {line.total.toLocaleString("fa-IR")} تومان
                  </strong>
                </span>
                {line.reference ? (
                  <span dir="ltr" className="font-mono text-xs">
                    {line.reference}
                  </span>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
