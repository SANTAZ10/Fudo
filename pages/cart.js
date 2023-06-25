import Layout from "../components/Layout";
import css from "../styles/cart.module.css";
import { useStore } from "../store/store";
import { urlFor } from "../lib/client";
import Image from "next/image";
import { useState } from "react";
import OrderModal from "../components/OrderModal";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
const Cart = () => {
  const cartData = useStore((state) => state.cart);
  const [order, setOrder] = useState(
    typeof window !== "undefined" && localStorage.getItem('order')
  )
  const removePizza = useStore((state) => state.removePizza);
  const handleRemove = (i) => {
    removePizza(i);
    toast.error("Item Removed");
  };
  const router = useRouter();
  const total = () => cartData.pizzas.reduce((a, b) => a + b.quantity * b.price, 0);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const handleOnDelivery = () => {
    setPaymentMethod(0);
    typeof window !== "undefined" && localStorage.setItem("total", total());
  };

  const handleCheckout = async () => {
    typeof window !== "undefined" && localStorage.setItem("total", total());
    setPaymentMethod(1);
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartData.pizzas),
    });

    if (response.status === 500) return;

    const data = await response.json();
    toast.loading("Redirecting...");
    router.push(data.url);
  };
  return (
    <Layout>
      <div className={css.container}>
        <div className={css.details}>
          <table className={css.table}>
            <thead>
              <tr>
                <th>Pizza</th>
                <th>Name</th>
                <th>Size</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody className={css.tbody}>
              {cartData.pizzas.length > 0 &&
                cartData.pizzas.map((pizza, i) => {
                  const src = urlFor(pizza.image).url();
                  return (
                    <tr key={i}>
                      <td className={css.imageTd}>
                        <Image
                          loader={() => src}
                          src={src}
                          alt=""
                          objectFit="cover"
                          width={85}
                          height={85}
                        />
                      </td>
                      <td>{pizza.name}</td>
                      <td>{pizza.size === 0 ? "Small" : pizza.size === 1 ? "Medium" : "Large"}</td>
                      <td>{pizza.price}</td>
                      <td>{pizza.quantity}</td>
                      <td>{pizza.price * pizza.quantity}</td>
                      <td
                        style={{ color: "var(--themeRed)", cursor: "pointer" }}
                        onClick={() => handleRemove(i)}
                      >
                        x
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        {/* cart summary */}
        <div className={css.cart}>
          <span>Cart</span>
          <div className={css.cartDetails}>
            <div>
              <span>Items</span>
              <span>{cartData.pizzas.length}</span>
            </div>
            <div>
              <span>Total</span>
              <span>$ {total()}</span>
            </div>
          </div>
          {!order && cartData.pizzas.length > 0 ? (
            <div className={css.buttons}>
              <button className="btn" onClick={handleOnDelivery}>
                Pay on Delivery
              </button>
              <button className="btn" onClick={handleCheckout}>
                Pay Online
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <Toaster />
      {/* modal */}
      <OrderModal
        opened={paymentMethod === 0}
        setOpened={setPaymentMethod}
        paymentMethod={paymentMethod}
      />
    </Layout>
  );
};

export default Cart;
