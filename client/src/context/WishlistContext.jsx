import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../services/wishlistService";

import { useAuth } from "./AuthContext";

const WishlistContext =
  createContext();

export const WishlistProvider = ({
  children,
}) => {

    const { user } = useAuth();
  const [wishlist, setWishlist] =
    useState([]);

  useEffect(() => {
  if (user) {
    fetchWishlist();
  } else {
    setWishlist([]);
  }
}, [user]);

  const fetchWishlist = async () => {
    try {
      const { data } =
        await getWishlist();

      setWishlist(data.wishlist);
    } catch (error) {
      console.error(error);
    }
  };

  const addItem = async (id) => {
    await addToWishlist(id);

    fetchWishlist();
  };

  const removeItem = async (id) => {
    await removeFromWishlist(id);

    fetchWishlist();
  };

  const isInWishlist = (id) => {
    return wishlist.some(
      (item) => item._id === id
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addItem,
        removeItem,
        isInWishlist,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () =>
  useContext(WishlistContext);