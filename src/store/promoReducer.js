export const initialPromo = {
  totalPromo: 0,
  promoInitiative: [],
  newPromo: {
    data: new Date(),
    film: null,
    gadget: null,
    modalita: null,
    where: null,
    id: null,
  },
};

const promoReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_PROMO":
      /* console.log("ADD_EVENT", payload); */
      return {
        ...state,
        promoInitiative: payload.promoInitiative,
        totalPromo: state.totalPromo + 1,
      };

    default:
      throw new Error("no case for type", type);
  }
};

export default promoReducer;
