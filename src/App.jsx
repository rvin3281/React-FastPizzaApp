import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./ui/Home";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import Order, { loader as orderLoader } from "./features/order/Order";
import { action as updateOrderAction } from "./features/order/UpdateOrder";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";

// 1. We define all routes inside this functions
// We do that by passing in an array of objects where each objects is one route
// Save the result in router of calling the function (Store the return from the function)
const router = createBrowserRouter([
  // 4. Create App Layout
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      //2. Create path for pages in our project
      // Home Page
      {
        path: "/",
        element: <Home />,
      },
      // Menu Component
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },

      // cart component
      {
        path: "/cart",
        element: <Cart />,
      },

      // Create new order path
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },

      // Checkout an existing order (Include param name)
      // We can use params to dynamically display output
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: updateOrderAction,
      },
    ],
  },
]);

function App() {
  // 3. Place the return from the createBrowserRoter on the RouterProvider component
  return <RouterProvider router={router} />;
}

export default App;
