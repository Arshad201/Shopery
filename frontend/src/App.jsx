import {lazy, Suspense} from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import RootComponent from './Components/RootComponent.jsx';
import ProtectedComponent from "./Components/ProtectedComponent.jsx";
import Loader from './Components/Loader/Loader.jsx';

const Home = lazy(()=>import('./Pages/Home/Home.jsx'));
const Shop = lazy(()=>import('./Pages/Shop/Shop.jsx'));
const Product = lazy(()=>import('./Pages/Product/Product.jsx'));
const Wishlist = lazy(()=>import('./Pages/Wishlist/Wishlist.jsx'));
const Cart = lazy(()=>import('./Pages/Cart/Cart.jsx'));
const Checkout = lazy(()=>import('./Pages/Checkout/Checkout.jsx'));
const SignIn = lazy(()=>import('./Pages/SignIn/SignIn.jsx'));
const Register = lazy(()=>import('./Pages/Register/Register.jsx'));
const Account = lazy(()=>import('./Pages/Account/Account.jsx'));
const PageNotFound = lazy(()=>import('./Pages/PageNotFound/PageNotFound.jsx'));
const Faqs = lazy(()=>import('./Pages/Faqs/Faqs.jsx'));

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootComponent/>,
      children: [
        {
          path: "/",
          element: <Suspense fallback={<Loader/>}><ProtectedComponent Component={Home}/></Suspense>,
        },
        {
          path: "/shop",
          element: <Suspense fallback={<Loader/>}><ProtectedComponent Component={Shop}/></Suspense>,
        },
        {
          path: "/shop/:id",
          element: <Suspense fallback={<Loader/>}><ProtectedComponent Component={Product}/></Suspense>,
        },
        {
          path: "/wishlist",
          element: <Suspense fallback={<Loader/>}><ProtectedComponent Component={Wishlist}/></Suspense>,
        },
        {
          path: "/cart",
          element: <Suspense fallback={<Loader/>}><ProtectedComponent Component={Cart}/></Suspense>,
        },
        {
          path: "/checkout",
          element:<Suspense fallback={<Loader/>}><ProtectedComponent Component={Checkout}/></Suspense>,
        },
        {
          path: "/signin",
          element: <Suspense fallback={<Loader/>}><ProtectedComponent Component={SignIn}/></Suspense>,
        },
        {
          path: "/register",
          element: <Suspense fallback={<Loader/>}><ProtectedComponent Component={Register}/></Suspense>,
        },
        {
          path: "/account",
          element: <Suspense fallback={<Loader/>}><ProtectedComponent Component={Account}/></Suspense>,
        },
        {
          path: "/account/dashboard",
          element: <Suspense fallback={<Loader/>}><ProtectedComponent Component={Account}/></Suspense>,
        },
        {
          path: "/account/orders",
          element: <Suspense fallback={<Loader/>}><ProtectedComponent Component={Account}/></Suspense>,
        },
        {
          path: "/account/orders/:id",
          element: <Suspense fallback={<Loader/>}><ProtectedComponent Component={Account}/></Suspense>,
        },
        {
          path: "/account/setting/",
          element: <Suspense fallback={<Loader/>}><ProtectedComponent Component={Account}/></Suspense>,
        },
        {
          path: "/faqs",
          element:<Suspense fallback={<Loader/>}><ProtectedComponent Component={Faqs}/></Suspense>,
        },
        {
          path: "/*",
          element:<Suspense fallback={<Loader/>}><ProtectedComponent Component={PageNotFound}/></Suspense>,
        },
      ]
    }
  ]);

  return (
    <div>
         <RouterProvider router={router} />
    </div>
  )
}

export default App; 
