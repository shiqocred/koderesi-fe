import { Header } from "@/components/header";
import { Metadata } from "next";
import PaymentCheckout from "./components/payment-checkout";

export const metadata: Metadata = {
  title: "Checkout",
};

const CheckoutPage = () => {
  return (
    <div className="sm:px-6 sm:py-8 p-4 gap-6 flex flex-col h-full">
      <Header title="Checkout" href="/top-up" />
      <PaymentCheckout />
    </div>
  );
};

export default CheckoutPage;
