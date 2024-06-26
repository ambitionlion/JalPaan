// import React, { useContext, useState } from 'react';
// import { FaTrash } from "react-icons/fa";
// import { Link } from 'react-router-dom'; // Added import
// import Swal from 'sweetalert2';
// import { AuthContext } from '../../contexts/AuthProvider';
// import useCart from '../../hooks/useCart';

// const CartPage = () => {
  
//   const [cart, refetch] = useCart();
//   const { user } = useContext(AuthContext);
//   const [cartItems, setCartItems] = useState([]);

//   // calculate price
//   const calculateTotalPrice = (item) => {
//     return item.price * item.quantity;
//   }
  
//   // handle increase fn
//   const handleIncrease = (item) => {
//     fetch(`http://localhost:6001/carts/${item._id}`, {
//       method: "PUT",
//       headers: {
//         "Content-type": "application/json; charset=UTF-8"
//       },
//       body: JSON.stringify({ quantity: item.quantity + 1 })
//     })
//     .then(res => res.json())
//     .then(data => {
//       const updatedCart = cartItems.map((cartItem) => {
//         if(cartItem.id === item.id) {
//           return {
//             ...cartItem,
//             quantity: cartItem.quantity + 1
//           }
//         }
//         return cartItem; // Added to handle other items
//       });
//       refetch();
//       setCartItems(updatedCart);
//     });
//   };

//   // handleDecrease function
//   const handleDecrease = (item) => {
//     if (item.quantity > 1) {
//       fetch(`http://localhost:6001/carts/${item._id}`, {
//         method: "PUT",
//         headers: {
//           "Content-type": "application/json; charset=UTF-8"
//         },
//         body: JSON.stringify({ quantity: item.quantity - 1 })
//       })
//       .then(res => res.json())
//       .then(data => {
//         const updatedCart = cartItems.map((cartItem) => {
//           if(cartItem.id === item.id) {
//             return {
//               ...cartItem,
//               quantity: cartItem.quantity - 1
//             }
//           }
//           return cartItem; // Added to handle other items
//         });
//         refetch();
//         setCartItems(updatedCart);
//       });
//     } else {
//       alert("Item can't be zero");
//     }
//   };

//   // calculation of total price
//   const cartSubTotal = cart.reduce((total, item) => {
//     return total + calculateTotalPrice(item);
//   }, 0);

//   const orderTotal = cartSubTotal;

//   // handledelete btn
//   const handleDelete = (item) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!"
//     }).then((result) => {
//       if (result.isConfirmed) {
//         fetch(`http://localhost:6001/carts/${item._id}`, {
//           method: "DELETE"
//         }).then(res => res.json()).then(data => {
//           if(data.deletedCount > 0) {
//             refetch();
//             Swal.fire({
//               title: "Deleted!",
//               text: "Your file has been deleted",
//               icon: "success",
//               backdrop: `
//               rgba(0,0,0,0.4)
//               url("/images/5ABA.gif")
//               bottom
//               no-repeat`,
//             });
//           }
//         });
//       }
//     });
//   };

//   return (
//     <div className='section-container '>
//       {/* Banner */}
//       <div className={`relative bg-white from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%`}>
//         {/* Video Background */}
//         <video src="/images/meal9.mp4" autoPlay loop muted className="absolute  w-auto content-center ml-50 mt-19 h-auto "></video> 
        
//         {/* Content */}
//         <div className="relative z-10 py-32 flex flex-col items-center justify-center gap-8">
//           {/* Text */}
//           <div className="px-4 space-y-7 text-center text-black">
//             <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
//               <span className='text-green'>Items</span> Added <span className="italic">To</span> <span className="text-green font-hindi">खाना खजाना</span><span> Cart</span>
//             </h2>
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       {
//         (cart.length > 0) ? <div>
//         <div className="">
//           <div className="overflow-x-auto">
//             <table className="table">
//               {/* head */}
//               <thead className="bg-green text-white rounded-sm">
//                 <tr>
//                   <th>#</th>
//                   <th>Food</th>
//                   <th>Item Name</th>
//                   <th>Quantity</th>
//                   <th>Price</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cart.map((item, index) => (
//                   <tr key={index}>
//                     <td>{index + 1}</td>
//                     <td>
//                       <div className="avatar">
//                         <div className="mask mask-squircle w-12 h-12">
//                           <img
//                             src={item.image}
//                             alt="Avatar Tailwind CSS Component"
//                           />
//                         </div>
//                       </div>
//                     </td>
//                     <td className="font-medium">{item.name}</td>
//                     <td>
//                       <button
//                         className="btn btn-xs"
//                         onClick={() => handleDecrease(item)}
//                       >
//                         -
//                       </button>
//                       <input
//                         type="number"
//                         value={item.quantity}
//                         onChange={() => console.log(item.quantity)}
//                         className="w-10 mx-2 text-center overflow-hidden appearance-none"
//                       />
//                       <button
//                         className="btn btn-xs"
//                         onClick={() => handleIncrease(item)}
//                       >
//                         +
//                       </button>
//                     </td>
//                     <td>${calculateTotalPrice(item).toFixed(2)}</td>
//                     <td>
//                       <button
//                         className="btn btn-sm border-none text-red bg-transparent"
//                         onClick={() => handleDelete(item)}
//                       >
//                         <FaTrash />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//               {/* foot */}
//             </table>
//           </div>
//         </div>
//         <hr />
//         <div className="flex flex-col md:flex-row justify-between items-start my-12 gap-8">
//           <div className="md:w-1/2 space-y-3">
//             <h3 className="text-lg font-semibold">Customer Details</h3>
//             <p>Name: {user?.displayName || "None"}</p>
//             <p>Email: {user?.email}</p>
//             <p>
//               User_id: <span className="text-sm">{user?.uid}</span>
//             </p>
//           </div>
//           <div className="md:w-1/2 space-y-3">
//             <h3 className="text-lg font-semibold">Shopping Details</h3>
//             <p>Total Items: {cart.length}</p>
//             <p>
//               Total Price:{" "}
//               <span id="total-price">${orderTotal.toFixed(2)}</span>
//             </p>
//             <button className="btn btn-md bg-green text-white px-8 py-1">
//               Procceed to Checkout
//             </button>
//           </div>
//         </div>
//       </div> : <div className="text-center mt-20">
//         <p>Cart is empty. Please add products.</p>
//         <Link to="/menu"><button className="btn bg-green text-white mt-3">Back to Menu</button></Link>
//       </div>
//       }
//     </div>
//   );
// };

// export default CartPage;
import axios from "axios";
import React, { useContext, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthProvider";
import useCart from "../../hooks/useCart";

const CartPage = () => {
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  console.log(cart)
  const [cartItems, setCartItems] = useState([]);
  // console.log(cartItems)

  // Calculate the total price for each item in the cart
  const calculateTotalPrice = (item) => {
    return item.price * item.quantity;
  };
  // Handle quantity increase
  const handleIncrease = async (item) => {
    try {
      const response = await fetch(`http://localhost:6001/carts/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: item.quantity + 1 }),
      });

      if (response.ok) {
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItem;
        });
        await refetch();
        setCartItems(updatedCart);
      } else {
        console.error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  // Handle quantity decrease
  const handleDecrease = async (item) => {
    if (item.quantity > 1) {
      try {
        const response = await fetch(
          `http://localhost:6001/carts/${item._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: item.quantity - 1 }),
          }
        );

        if (response.ok) {
          const updatedCart = cartItems.map((cartItem) => {
            if (cartItem.id === item.id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              };
            }
            return cartItem;
          });
          await refetch();
          setCartItems(updatedCart);
        } else {
          console.error("Failed to update quantity");
        }
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };

  // Calculate the cart subtotal
  const cartSubtotal = cart.reduce((total, item) => {
    return total + calculateTotalPrice(item);
  }, 0);

  // Calculate the order total
  const orderTotal = cartSubtotal;
  // console.log(orderTotal)

  // delete an item
  const handleDelete =   (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:6001/carts/${item._id}`).then(response => {
          if (response) {
            refetch();
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Deleted",
              showConfirmButton: false,
              backdrop: `
    rgba(0,0,0,0.4)
    url("/images/5ABA.gif")
    bottom
    no-repeat`,
              timer: 1500,
            });
           }
        })
        .catch(error => {
          console.error(error);
        });
      }
    });
  };

  return (
    <div className='section-container '>
          {/* Banner */}
           <div className={`relative bg-white from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%`}>
             {/* Video Background */}
           <video src="/images/meal9.mp4" autoPlay loop muted className="absolute  w-auto content-center ml-50 mt-19 h-auto "></video> 
            
            {/* Content */}
            <div className="relative z-10 py-32 flex flex-col items-center justify-center gap-8">
              {/* Text */}
             <div className="px-4 space-y-7 text-center text-black">
               <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
                  <span className='text-green'>Items</span> Added <span className="italic">To</span> <span className="text-green font-hindi">खाना खजाना</span><span> Cart</span>
                </h2>
             </div>
            </div>
         </div>

      {/* cart table */}

      {
        (cart.length > 0) ? <div>
        <div className="">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className="bg-green text-white rounded-sm">
                <tr>
                  <th>#</th>
                  <th>Food</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="font-medium">{item.name}</td>
                    <td>
                      <button
                        className="btn btn-xs"
                        onClick={() => handleDecrease(item)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={() => console.log(item.quantity)}
                        className="w-10 mx-2 text-center overflow-hidden appearance-none"
                      />
                      <button
                        className="btn btn-xs"
                        onClick={() => handleIncrease(item)}
                      >
                        +
                      </button>
                    </td>
                    <td>₹ {calculateTotalPrice(item).toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-sm border-none text-red bg-transparent"
                        onClick={() => handleDelete(item)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* foot */}
            </table>
          </div>
        </div>
        <hr />
        <div className="flex flex-col md:flex-row justify-between items-start my-12 gap-8">
          <div className="md:w-1/2 space-y-3">
            <h3 className="text-lg font-semibold">Customer Details</h3>
            <p>Name: {user?.displayName || "None"}</p>
            <p>Email: {user?.email}</p>
            <p>
              User_id: <span className="text-sm">{user?.uid}</span>
            </p>
          </div>
          <div className="md:w-1/2 space-y-3">
            <h3 className="text-lg font-semibold">Shopping Details</h3>
            <p>Total Items: {cart.length}</p>
            <p>
              Total Price:{" "}
              <span id="total-price">₹ {orderTotal.toFixed(2)}</span>
            </p>
            <button className="btn btn-md bg-green text-white px-8 py-1">
              Procceed to Checkout
            </button>
          </div>
        </div>
      </div> : <div className="text-center mt-20">
        <p>Cart is empty. Please add products.</p>
        <Link to="/menu"><button className="btn bg-green text-white mt-3">Back to Menu</button></Link>
      </div>
      }
      
    </div>
  );
};

export default CartPage;