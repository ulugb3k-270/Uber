import { ArrowBack } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import db from "../firebase/config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Moment from "react-moment";

function Order() {
  const router = useRouter();
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (session) {
      return onSnapshot(
        query(
          collection(db, session?.user.email),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setOrders(snapshot.docs)
      );
    }
    // eslint-disable-next-line
  }, [db]);



  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-start p-2 border-b shadow-sm">
        <ArrowBack onClick={() => router.back()} className="cursor-pointer z-50" />
        <p className="text-center flex-1 font-medium -translate-x-3">Order History</p>
      </div>
      <div className="order-main bg-gray-200 flex-1">
        {orders.length ? (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-white mx-5 m-2 rounded-lg p-2 flex items-center gap-2 shadow-sm cursor-pointer transform hover:scale-105 transition-all"
            >
              {/* eslint-disable-next-line */}
              <img src={order.data().carImg} className="w-24 " />
              <div className="flex-1">
                <p className="font-medium">{order.data().class}</p>
                <p className="text-gray-300 text-sm capitalize">
                  From {order.data().from} to {order.data().to}{" "}
                </p>{" "}
                <Moment fromNow interval={1000} className="text-gray-300 text-sm">
                  {order.data().timestamp.toDate()}
                </Moment>
              </div>
              <p className="font-medium">${order.data().price}</p>
            </div>
          ))
        ) : (
          <h2 className="text-center text-gray-400">No orders</h2>
        )}
      </div>
    </div>
  );
}

export default Order;
