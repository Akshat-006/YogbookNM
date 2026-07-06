"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Payment {
  _id: string;
  amount: number;
  payment_status: string;
  payment_method?: string;
  payment_date: string;
}

interface Props {
  payments: Payment[];
}

export function PaymentTable({
  payments,
}: Props) {
  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <CardTitle>
          Payment History
        </CardTitle>
      </CardHeader>

      <CardContent>
        {payments.length === 0 ? (
          <p className="text-muted-foreground">
            No payment history found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b">
                <tr>
                  <th className="py-3">Amount</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {payments.map((payment) => (
                  <tr
                    key={payment._id}
                    className="border-b"
                  >
                    <td className="py-4 font-medium">
                      ₹{payment.amount}
                    </td>

                    <td>
                      {payment.payment_method ?? "Razorpay"}
                    </td>

                    <td>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          payment.payment_status === "paid"
                            ? "bg-green-100 text-green-700"
                            : payment.payment_status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {payment.payment_status}
                      </span>
                    </td>

                    <td>
                      {new Date(
                        payment.payment_date
                      ).toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}