import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStorage = create(
  persist(
    (set) => ({
      cart: {},
      clearCart: () =>
        set(() => ({
          cart: {},
        })),
      addToCart: (item, cost) =>
        set((state) =>
          !Object.keys(state.cart).includes(item)
            ? { cart: { ...state.cart, [item]: { count: 1, cost: cost } } }
            : { cart: state.cart }
        ),
      changeTheNumber: (item, type) =>
        set((state) =>
          state.cart[item].count > 1
            ? type == "more"
              ? {
                  cart: {
                    ...state.cart,
                    [item]: {
                      count: state.cart[item].count + 1,
                      cost: state.cart[item].cost,
                    },
                  },
                }
              : {
                  cart: {
                    ...state.cart,
                    [item]: {
                      count: state.cart[item].count - 1,
                      cost: state.cart[item].cost,
                    },
                  },
                }
            : type == "more"
            ? {
                cart: {
                  ...state.cart,
                  [item]: {
                    count: state.cart[item].count + 1,
                    cost: state.cart[item].cost,
                  },
                },
              }
            : { cart: { ...state.cart } }
        ),
      removeFromCart: (item) =>
        set((state) =>
          Object.keys(state.cart).length > 1
            ? {
                total:
                  state.total - state.cart[item].count * state.cart[item].cost,
                cart: Object.fromEntries(
                  Object.entries(state.cart).filter(
                    ([key, value]) => key !== item
                  )
                ),
              }
            : { cart: {} }
        ),
      uid: null,
      addUid: (item) => set(() => ({ uid: item })),
      removeUid: () => set(() => ({ uid: null })),
      total: 0,
      setTotal: (item) => set((state) => ({ total: state.total + item })),
      clearTotal: () => set(() => ({ total: 0 })),
    }),
    { name: "user storage", skipHydration: true }
  )
);

export default useStorage;
