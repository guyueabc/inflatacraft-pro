import { redirect } from "next/navigation";

/**
 * Online payment is intentionally unavailable. Custom inflatable projects need
 * design review and a confirmed quotation before an order can exist.
 */
export default function CheckoutPage() {
  redirect("/get-quote");
}
