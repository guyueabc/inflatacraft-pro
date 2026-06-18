import { redirect } from "next/navigation";
export default function RedirectToQuote() {
  redirect("/get-quote");
}
