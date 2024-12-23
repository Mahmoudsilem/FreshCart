import React, { useContext, useState } from 'react'
import Style from "./WishListItem.module.css"
import { CartContext } from '../../Context/TokenContext/CartContext';
import toast from 'react-hot-toast';
import { wishListContext } from '../../Context/WishListContext';
export default function WishListItem({ data, count }) {
  const { addToProductCart } = useContext(CartContext);
  const { removeWishListItem } = useContext(wishListContext);

  const [wishListCount, setWishListCount] = useState(0);

  async function addProduct(productId) {
    toast.loading("Adding product to cart", {
      duration: 1500,
    })
    const response = await addToProductCart(productId);
    if (response.data) {
      toast.success(response.message);
    } else {
      toast.error(response.message || `something went wrong please try again later`)
    }
  }

  function removeProductFromWishList(productId) {
    toast.loading("removeing item",{
      duration:1500
    })
    removeWishListItem(productId)
      .then((response) => {
        setWishListCount(count);
        toast.success(response.data.message||"removed item")
      }).catch((error) => {
        console.log(error);
      })
  }
  return <>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="p-4">
              <img src={data.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={data.title} />
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              {data.title}
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              {data.price}
            </td>
            <td className="px-6 py-4">
              <span onClick={() => removeProductFromWishList(data._id)} href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</span>
            </td>
            <td className="px-6 py-4">
              <span onClick={() => addProduct(data._id)} href="#" className="font-medium text-green-600 dark:text-green-500 hover:underline">Add to cart</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </>
}
