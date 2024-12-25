import { useDispatch, useSelector } from "react-redux";
import { ITEMS_PER_PAGE } from "../../../app/common";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../order/orderSlice";
import { useEffect, useState } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import { Pagination } from "../../../common/Pagination";

export default function AdminOrder() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const [editableOrderId, setEditableOrderId] = useState(-1);

  useEffect(() => {
    const pagination = { _page: page, _per_page: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ pagination }));
  }, [dispatch, page]);

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };

  const handleUpdate = (e, order) => {
    const updateOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updateOrder));
    setEditableOrderId(-1);
  };
  const handlePage = (page) => {
    console.log({ page });
    setPage(page);
  };
  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-red-200 text-red-600";
    }
  };

  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-black uppercase bg-gray-500">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order#
              </th>
              <th scope="col" className="px-6 py-3">
                items
              </th>
              <th scope="col" className="px-6 py-3">
                TotalAmount
              </th>
              <th scope="col" className="px-6 py-3">
                Shipping Address
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr className="bg-white border-b  text-black">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {order.id}
                </th>

                <td className="px-6 py-4">
                  {order.items.map((item) => (
                    <div className="flex items-center">
                      <div>
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-8 h-9 rounded-full"
                        />
                      </div>
                      <span>
                        {item.title}-#{item.quantity}-${item.price}
                      </span>
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4">${order.totalAmount}</td>
                <td className="px-6 py-4">
                  <div>{order.selectedAddress.name}</div>
                  <div>{order.selectedAddress.street}</div>
                  <div>{order.selectedAddress.city}</div>
                  <div>{order.selectedAddress.state}</div>
                  <div>{order.selectedAddress.pinCode}</div>
                  <div>{order.selectedAddress.phone}</div>
                </td>
                <td className="px-6 py-4">
                  {order.id === editableOrderId ? (
                    <select onChange={(e) => handleUpdate(e, order)}>
                      <option value="pending">Pending</option>
                      <option value="dispatched">Dispatched</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  ) : (
                    <span className={`${chooseColor(order.status)} rounded-full px-3 py-1 text-xs`}>
                      {order.status}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 ">
                  <PencilIcon
                    className="w-6 h6 cursor-pointer"
                    onClick={(e) => handleEdit(order)}
                  ></PencilIcon>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
            totalItems={totalOrders}
            handlePage={handlePage}
            page={page}
          ></Pagination>
      </div>
    </>
  );
}
