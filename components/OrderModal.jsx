import { Modal } from "@mantine/core";
import css from "../styles/OrderModal.module.css";
import { useState } from "react";
import { createOrder } from "../lib/orderHandler";
import  toast, {Toaster}  from "react-hot-toast";
import { useStore } from "../store/store";
import { useRouter } from "next/router";

export default function OrderModal({ opened, setOpened, paymentMethod }) {
  const total = typeof window !== "undefined" && localStorage.getItem("total");

  const [formData, setFormData] = useState({})
  const router = useRouter();
  const handleInput = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  const resetCart = useStore((state) => state.resetCart)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = await createOrder({...formData, total, paymentMethod})
    toast.success('Order Placed');
    resetCart();
    {
      typeof window !== 'undefined' && localStorage.setItem('order', id)
    }
    router.push(`/order/${id}`)
  }
  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(null)}>
        {/* Modal content */}
        <form onSubmit={handleSubmit}  className={css.formContainer}>
          <input onChange={handleInput} type="text" name="name" required placeholder="Name" />
          <input onChange={handleInput} type="text" name="phone" required placeholder="Phone Number" />
          <textarea onChange={handleInput} name="address" rows={3} placeholder="Address"></textarea>

          <span>
            You will pay <span>${total}</span> on delivery
          </span>

          <button type="submit" className="btn">Place Order</button>
        </form>
        <Toaster/>
      </Modal>
    </>
  );
}
