import React, { useEffect, useReducer, useState } from "react";
import Pahrmacy from "../component/charts/dashboared/Pahrmacy";

const admin = {
  Email: "m@gmail.com",
  Password: "1234",
};

// Default context values
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
  setTotalAmount: () => {},
  setAlltypeAmount: () => {},
  expireMedicine: [],
  printBill: null,
  setBillPrint: () => {},
  isPrint: false,
  setIsPrint: () => {},
  expiredMedicines: [],
  isPharmacyModal: false,
  setPharmacyModal: () => {},
  setExpireMedicine: () => {},
  setExpiredMedicines: () => {},
  pharmacyExpire: false,
  setPharmacyExpired: () => {},
  totalSale: [],
  isExpire: false,
  setIsExpire: () => {},
  fullName: "",
  setFullName: () => {},
  modalExpire: () => {},
  setTotalSale: () => {},
  totalPurchase: [],
  saleData: [],
  setSaleData: () => {},
  setTotalPurchase: () => {},
  allMedicines: [],
  setAllMedicines: () => {},
  pharmacyState: [],
  setPharmacyState: () => {},
  setError: null,

  openModal: () => {},
  closeModal: () => {},
  editMedodalOpen: () => {},
  editModalClose: () => {},
  message: () => {},
  emailHanderl: () => {},
  passwordHanderl: () => {},
  loadData: () => {},
  onEditHandler: () => {},
  onRemoveHadler: () => {},
});

const initialState = {
  email: true,
  password: true,
  isEmail: true,
  isPassword: true,
  isLoading: false,
  error: false,
  route: false,
};

// Reducer for login
const emailState = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoading: true };
    case "CLOSEL":
      return { ...state, isLoading: false };
    case "ERROR":
      return { ...state, error: true, isLoading: false };
    case "EMAIL":
      return {
        ...state,
        email: action.value === localStorage.getItem("Email"),
        isEmail: action.value === localStorage.getItem("Email"),
        route: action.value === localStorage.getItem("Email") && state.password,
      };
    case "PASSWORD":
      return {
        ...state,
        password: action.value === localStorage.getItem("Password"),
        isPassword: action.value === localStorage.getItem("Password"),
        route: action.value === localStorage.getItem("Password") && state.email,
      };
    default:
      return state;
  }
};

// Helper to read localStorage safely
const readLocalStorage = (key, defaultValue) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (err) {
    console.error(err);
    return defaultValue;
  }
};

function ContextProvider({ children }) {
  const [pharmacyState, setPharmacyState] = useState(() =>
    readLocalStorage("Pharmacy", [])
  );
  const [pharmacyExpire, setPharmacyExpired] = useState(() =>
    readLocalStorage("PharmacyExpired", [])
  );
  const [printBill, setBillPrint] = useState([]);
  const [isPrint, setIsPrint] = useState(false);

  const [error, setError] = useState(false);
  const [isPharmacyModal, setPharmacyModal] = useState(false);
  const [isOpenModal, setModal] = useState(false);
  const [isEditModalOpen, setEditModal] = useState(false);
  const [allMedicines, setAllMedicines] = useState(() =>
    readLocalStorage("Medicines", [])
  );
  const [expireMedicine, setExpireMedicine] = useState(() =>
    readLocalStorage("ExpireMedicine", [])
  );
  const [expiredMedicines, setExpiredMedicines] = useState(() =>
    readLocalStorage("ExpiredMedicines", [])
  );
  const [totalAmount, setTotalAmount] = useState(() =>
    readLocalStorage("TotalAmount", 0)
  );
  const [allTypesAmount, setAlltypeAmount] = useState(() =>
    readLocalStorage("AlltypesAmount", 0)
  );
  const [totalSale, setTotalSale] = useState(() =>
    readLocalStorage("TotalSale", [])
  );
  const [saleData, setSaleData] = useState(() => readLocalStorage("Sales", []));
  const [totalPurchase, setTotalPurchase] = useState(() =>
    readLocalStorage("TotalPurchase", [])
  );
  const [nameState, setFullName] = useState(() =>
    readLocalStorage("FullName", "")
  );

  const [userCode, dispatchUserCode] = useReducer(emailState, initialState);

  // Persist all relevant states
  useEffect(
    () => localStorage.setItem("Sales", JSON.stringify(saleData)),
    [saleData]
  );
  useEffect(
    () => localStorage.setItem("Pharmacy", JSON.stringify(pharmacyState)),
    [pharmacyState]
  );
  useEffect(() => {
    localStorage.setItem("TotalAmount", JSON.stringify(totalAmount));
    localStorage.setItem("AlltypesAmount", JSON.stringify(allTypesAmount));
  }, [totalAmount, allTypesAmount]);
  useEffect(
    () =>
      localStorage.setItem("ExpireMedicine", JSON.stringify(expireMedicine)),
    [expireMedicine]
  );
  useEffect(
    () =>
      localStorage.setItem(
        "ExpiredMedicines",
        JSON.stringify(expiredMedicines)
      ),
    [expiredMedicines]
  );
  useEffect(
    () => localStorage.setItem("TotalSale", JSON.stringify(totalSale)),
    [totalSale]
  );
  useEffect(
    () => localStorage.setItem("Medicines", JSON.stringify(allMedicines)),
    [allMedicines]
  );
  useEffect(
    () => localStorage.setItem("TotalPurchase", JSON.stringify(totalPurchase)),
    [totalPurchase]
  );
  useEffect(
    () => localStorage.setItem("FullName", JSON.stringify(nameState)),
    [nameState]
  );
  useEffect(
    () =>
      localStorage.setItem("PharmacyExpired", JSON.stringify(pharmacyExpire)),
    [pharmacyExpire]
  );

  const onEmailHandler = (type, value) => {
    dispatchUserCode({ type: "LOADING" });
    dispatchUserCode({ type, value });
  };

  const onPasswordHandler = (type, value) => {
    dispatchUserCode({ type: "LOADING" });
    dispatchUserCode({ type, value });
  };

  const messageHandler = (type) => dispatchUserCode({ type });
  const loadDataHandler = (type) => dispatchUserCode({ type });
  const onOpenModalHandler = () => setModal(true);
  const onCloseModalHandler = () => setModal(false);
  const openEditModal = () => setEditModal(true);
  const closeEditModal = () => setEditModal(false);
  const editHandler = (id) => {};
  const removeHandler = (id) => {};
  const onModalExpire = (boolean) => setIsExpire(boolean);

  const value = {
    email: userCode.email,
    password: userCode.password,
    isEmail: userCode.isEmail,
    isPassword: userCode.isPassword,
    isLoading: userCode.isLoading,
    route: userCode.route,

    modalOpen: isOpenModal,
    isEditModalOpen: isEditModalOpen,
    pharmacyExpire: pharmacyExpire,
    setPharmacyExpired: setPharmacyExpired,
    totalAmount,
    allTypesAmount,
    expireMedicine,
    expiredMedicines,
    totalSale,
    allMedicines,
    totalPurchase,
    saleData,
    isExpire: !!expireMedicine.length,
    fullName: nameState,
    pharmacyState,
    error,
    error,
    isPharmacyModal: isPharmacyModal,
    printBill: printBill,
    setBillPrint: setBillPrint,
    isPrint: isPrint,
    setIsPrint: setIsPrint,
    setPharmacyModal: setPharmacyModal,
    setPharmacyState,
    setFullName,
    setIsExpire: onModalExpire,
    setSaleData,
    setTotalPurchase,
    setAllMedicines,
    setTotalSale,
    setExpireMedicine,
    setExpiredMedicines,
    setTotalAmount,
    setAlltypeAmount,
    setError,

    openModal: onOpenModalHandler,
    closeModal: onCloseModalHandler,
    editMedodalOpen: openEditModal,
    editModalClose: closeEditModal,

    loadData: loadDataHandler,
    message: messageHandler,
    emailHanderl: onEmailHandler,
    passwordHanderl: onPasswordHandler,
    onEditHandler: editHandler,
    onRemoveHadler: removeHandler,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default ContextProvider;
