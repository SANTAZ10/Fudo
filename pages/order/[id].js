import { client } from "../../lib/client";
import css from "../../styles/Order.module.css";
import Layout from "../../components/Layout";
import Image from "next/image";
import Cooking from "../../assets/cooking.png";
import spinner from "../../assets/spinner.svg";
import onway from "../../assets/onway.png";
import { UilBill } from "@iconscout/react-unicons";
import { UilBox } from "@iconscout/react-unicons";
import { useEffect } from "react";

//grab id from the params
export const getServerSideProps = async ({ params }) => {
  const query = `*[_type == 'order' && _id == '${params.id}']`;
  const order = await client.fetch(query);

  return {
    props: {
      order: order[0],
    },
  };
};

export default function Orders({ order }) {

  useEffect(() => {
    if(order.status>3){
      localStorage.clear()
    }
  },[order])
  return (
    <Layout>
      <div className={css.container}>
        <span className={css.heading}>
          {order.status > 3 ? (
            <span>Order Delivered</span>
          ) : (
            <span>Order in Process</span>
          )}
        </span>
        <div className={css.details}>
          <div>
            <span>Order ID</span>
            <span>{order._id}</span>
          </div>
          <div>
            <span>Customer Name</span>
            <span>{order.name}</span>
          </div>
          <div>
            <span>Phone Number</span>
            <span>{order.phone}</span>
          </div>
          <div>
            <span>Method</span>
            <span>{order.method === 0 ? "Cash on Delivery" : "Online Payment {Paid} "}</span>
          </div>
          <div>
            <span>Total</span> <span>${order.total}</span>
          </div>
        </div>

        <div className={css.statusContainer}>
          <div className={css.status}>
            <UilBill width={50} height={50} />
            <span>Payment </span>
            {order.method === 0 ? (
              <span className={css.pending}>on Delivery</span>
            ) : (
              <span className={css.completed}> Completed</span>
            )}
          </div>

          <div className={css.status}>
            <Image src={Cooking} alt="" width={50} height={50} />
            <span>Cooking</span>
            {order.status === 1 && (
              <div className={css.spinner}>
                <Image src={spinner} alt="" />
              </div>
            )}
            {order.status > 1 && <span className={css.completed}>Completed</span>}
          </div>

          <div className={css.status}>
            <Image src={onway} alt="" width={50} height={50} />
            <span className={css.ontheway}>On the way</span>
            {order.status === 2 && (
              <div className={css.spinner}>
                <Image src={spinner} alt="" />
              </div>
            )}
            {order.status > 2 && <span className={css.completed}>Completed</span>}
          </div>

          <div className={css.status}>
            <UilBox width={50} height={50} />
            <span>Delivered</span>
            {order.status === 3 && (
              <div className={css.spinner}>
                <Image src={spinner} alt="" />
              </div>
            )}
            {order.status > 3 && <span className={css.completed}>Completed</span>}
          </div>
        </div>
      </div>
    </Layout>
  );
}
