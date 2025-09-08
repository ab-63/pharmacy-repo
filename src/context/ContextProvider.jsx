import React, { useEffect, useReducer, useState } from "react";

const admin = {
  Email: "m@gmail.com",
  Password: "1234",
};
export const Context = React.createContext({
  email: false,
  password: false,
  isEmail: true,
  error: false,
  isPassword: true,
  isLoading: false,
  route: false,
  modalOpen: false,
  isEditModalOpen: false,
  totalAmount: 0,
  allTypesAmount: 0,
  setTotalAmount: null,
  setAlltypeAmount: null,
  expireMedicine: 0,
  setExpireMedicine: null,
  totalSale: 0,
  isExpire: false,
  setIsExpire: null,
  modalExpire: (boolean) => {},
  setToalSale: null,
  totalPurchase: 0,
  saleData: null,
  setSaleData: null,
  setToalPurchase: null,
  allMedicines: [],
  setAllMedicines: [],
  openModal: () => {},
  closeModal: () => {},
  editMedodalOpen: () => {},
  editModalClose: () => {},
  messgage: (type) => {},
  emailHanderl: (type, value) => {},
  passwordHanderl: (type, value) => {},
  loadData: (type) => {},
  onEditHandler: (id) => {},
  onRemoveHadler: (id) => {},
});
const initialState = {
  email: false,
  password: false,
  isEmail: true,
  isPassword: true,
  isLoading: false,

  error: false,
  route: false,
};
const emailState = (state, action) => {
  if (action.type === "LOADING") {
    return { ...state, isLoading: true };
  }
  if (action.type === "CLOSEL") {
    return { ...state, isLoading: false };
  }
  if (action.type === "ERROR") {
    return { ...state, erro: false, isLoading: false };
  }
  if (action.type === "EMAIL") {
    if (action.value === localStorage.getItem("Email")) {
      console.log("true");

      return {
        ...state,
        email: true,
        isEmail: true,
        route: true,
      };
    } else if (action.value !== localStorage.getItem("Email")) {
      

      return {
        ...state,
        email: false,
        isEmail: false,
        route: false,
      };
    }
  }
  if (action.type === "PASSWORD") {
    if (action.value === localStorage.getItem("Password")) {
      console.log("true");

      return { ...state, password: true, isPassword: true, route: true };
    } else if (action.value !== localStorage.getItem("Password")) {
      console.log("false");

      return { ...state, password: false, isPassword: false, route: false };
    } else {
      return { ...state, password: false, isPassword: false, route: false };
    }
  }
  return state;
};

const totalamountInitial = [];
const allTypeInitial = [];

const totalAmountState = () => {
  const data = localStorage.getItem("TotalAmount");

  try {
    return data ? JSON.parse(data) : totalamountInitial;
  } catch (err) {
    console.log(err, "localeStorage");
    return totalamountInitial;
  }
};

const allTypesAmountState = () => {
  const data = localStorage.getItem("AlltypesAmount");

  try {
    return data ? JSON.parse(data) : allTypeInitial;
  } catch (err) {
    console.log(err, "localeStorage");
    return allTypeInitial;
  }
};

const expireInitialState = [];
const expireMedicineState = () => {
  const data = localStorage.getItem("ExpireMedicine");

  try {
    return data ? JSON.parse(data) : expireInitialState;
  } catch (err) {
    console.log(err, "localeStorage");
    return expireInitialState;
  }
};

const totalSaleInitialState = [];
const totalSaleState = () => {
  const data = localStorage.getItem("TotalSale");

  try {
    return data ? JSON.parse(data) : totalSaleInitialState;
  } catch (err) {
    console.log(err, "localeStorage");
    return totalSaleInitialState;
  }
};
const medicineinitialState = [];
const medicinesInitial = () => {
  const data = localStorage.getItem("Medicines");

  try {
    return data ? JSON.parse(data) : medicineinitialState;
  } catch (err) {
    console.log(err, "localeStorage");
    return medicineinitialState;
  }
};
const purcahseinitialState = [];
const purcahsesInitial = () => {
  const data = localStorage.getItem("TotalPurchase");

  try {
    return data ? JSON.parse(data) : purcahseinitialState;
  } catch (err) {
    console.log(err, "localeStorage");
    return purcahseinitialState;
  }
};

const salesItem = [];
const salesInitialState = () => {
  const data = localStorage.getItem("Sales");

  try {
    return data ? JSON.parse(data) : salesItem;
  } catch (err) {
    console.error(err, "LocaleStorage");
    return salesItem;
  }
};

function ContextProvider({ children }) {
  const [isOpenModal, setModal] = useState(false);
  const [isEditModalOpen, setEditModal] = useState(false);
  const [allMedicines, setAllMedicines] = useState(() => medicinesInitial());
  const [totalSale, setTotalSale] = useState(() => totalSaleState());
  const [saleData, setSaleData] = useState(() => salesInitialState());

  const [totalPurchase, setTotalPurcahse] = useState(() => purcahsesInitial());
  const [totalAmount, setTotalAmount] = useState(() => totalAmountState());
  const [allTypesAmount, setAlltypeAmount] = useState(() =>
    allTypesAmountState()
  );

  const [expireMedicine, setExpireMedicine] = useState(() =>
    expireMedicineState()
  );
  const [isExpire, setIsExpire] = useState(expireMedicine ? true : false);
  const [userCode, dispatchUserCode] = useReducer(emailState, initialState);

  // useEffect(() => {
  //   dispatchUserCode({ type: "LOADING" });
  // }, []);
  useEffect(() => {
    localStorage.setItem("Sales", JSON.stringify(saleData));
  }, [saleData]);

  useEffect(() => {
    localStorage.setItem("TotalAmount", JSON.stringify(totalAmount));
    localStorage.setItem("AlltypesAmount", JSON.stringify(allTypesAmount));
  }, [totalAmount, allTypesAmount]);
  useEffect(() => {
    localStorage.setItem("ExpireMedicine", JSON.stringify(expireMedicine));
  }, [expireMedicine]);
  useEffect(() => {
    localStorage.setItem("TotalSale", JSON.stringify(totalSale));
  }, [totalSale]);
  useEffect(() => {
    localStorage.setItem("Medicines", JSON.stringify(allMedicines));
  }, [allMedicines]);
  useEffect(() => {
    localStorage.setItem("TotalPurchase", JSON.stringify(totalPurchase));
  }, [totalPurchase]);

  const onEmailHander = (type, e) => {
    dispatchUserCode({ type: "LOADING" });
    dispatchUserCode({ type: type, value: e });
    console.log(type, e);
    // dispatchUserCode({ type: "CLOSEL" });
    // dispatchEvent({type:'LOADING'})
  };

  //   console.log(userCode);
  const onPasswordHandler = (type, e) => {
    dispatchUserCode({ type: "LOADING" });

    dispatchUserCode({ type: type, value: e });
    console.log(type, e);
    // dispatchUserCode({ type: "CLOSEL" });
  };
  const messageHandler = (type) => {
    dispatchUserCode({ type: type });
  };
  const loadDataHandler = (type) => {
    dispatchUserCode({ type: type });
  };

  const onOpenModalHandler = () => {
    setModal(true);
  };

  const onCloseModalHandler = () => {
    setModal(false);
  };
  const editHandler = (id) => {};
  const removeHandler = (id) => {};
  const openEditModal = () => {
    setEditModal(true);
  };
  const closeEditModal = () => {
    setEditModal(false);
  };

  const onModalExpire = (boolean) => {
    setIsExpire(boolean);
  };
  const value = {
    email: userCode.email,
    password: userCode.password,
    isEmail: userCode.isEmail,
    isPassword: userCode.isPassword,
    isLoading: userCode.isLoading,
    route: userCode.route,
    modalOpen: isOpenModal,
    isEditModalOpen: isEditModalOpen,
    totalAmount: totalAmount,
    allTypesAmount: allTypesAmount,
    expireMedicine: expireMedicine,
    totalSale: totalSale,
    allMedicines: allMedicines,
    totalPurchase: totalPurchase,
    saleData: saleData,
    isExpire: isExpire,
    setIsExpire: setIsExpire,
    modalExpire: onModalExpire,

    setSaleData: setSaleData,
    setToalPurchase: setTotalPurcahse,
    setAllMedicines: setAllMedicines,
    setToalSale: setTotalSale,
    setExpireMedicine: setExpireMedicine,
    setTotalAmount,
    setAlltypeAmount,
    openModal: onOpenModalHandler,
    closeModal: onCloseModalHandler,
    editMedodalOpen: openEditModal,
    editModalClose: closeEditModal,
    loadData: loadDataHandler,
    message: messageHandler,
    emailHanderl: onEmailHander,
    passwordHanderl: onPasswordHandler,
    onEditHandler: editHandler,
    onRemoveHadler: removeHandler,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default ContextProvider;
