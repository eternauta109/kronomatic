import { createContext, useReducer, useContext } from "react";
import promoReducer, { initialPromo } from "./promoReducer";

export const PromoDataContext = createContext(initialPromo);

export const PromoStoreContext = ({ children }) => {
  const [promoState, deispatchPromo] = useReducer(promoReducer, initialPromo);

  const addPromo = (promo) => {
    const updatePromo = promoState.promoInitiative.concat(promo);
    deispatchPromo({
      type: "ADD_PROMO",
      payload: { promoInitiative: updatePromo },
    });
  };

  const value = {
    totalPromo: promoState.totalPromo,
    promoInitiative: promoState.promoInitiative,
    promo: promoState.newPromo,
    addPromo,
  };
  return (
    <PromoDataContext.Provider value={value}>
      {children}
    </PromoDataContext.Provider>
  );
};

const usePromoStore = () => {
  const context = useContext(PromoDataContext);
  if (context === undefined) {
    throw new Error("useData must be used with DataContext");
  }
  return context;
};

export default usePromoStore;
