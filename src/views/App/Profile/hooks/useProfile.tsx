"use client";
import { IRootState, useAppDispatch, useAppSelector } from "@core/store";
import useAuth from "@hooks/useAuth";
import {
  CreateBankAccount,
  EditBankAccount,
  type CreateExperience,
  type CreateVehicle,
  type User,
} from "@models/user";
import {
  getBankAccountTypes,
  getServiceTypes,
} from "@redux/common/commonThunk";
import {
  addBankAccount,
  addExperience,
  addVehicle,
  deleteBankAccountById,
  deleteExperienceById,
  deleteVehicleById,
  editBankAccount,
  getBankAccountByDriverId,
  getExperiencesByDriverId,
  getVehiclesByDriverId,
  updateUser,
} from "@redux/user/userThunk";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import "yup-phone-lite";

const useProfile = () => {
  const dispatch = useAppDispatch();
  const { currentUser, userType } = useAuth();

  const [editable, setEditable] = useState(false);
  const [user, setUser] = useState<User>(currentUser);
  const {
    experiences,
    vehicles,
    loading,
    bankAccount: bankAccountData,
  } = useAppSelector((state: IRootState) => state.user);
  const { serviceTypes, bankAccountTypes } = useAppSelector(
    (state: IRootState) => state.common,
  );

  const region = "PE";

  const updateInformationValidation = Yup.object().shape({
    name: Yup.string()
      .required("Nombre requerido.")
      .matches(
        /^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/,
        "El nombre de usuario debe tener letras, números, espacios y caracteres especiales.",
      )
      .min(3, "El nombre de usuario debe tener al menos 3 caracteres.")
      .max(50, "El nombre de usuario no puede tener más de 50 caracteres."),
    firstLastName: Yup.string()
      .required("Apellido paterno requerido.")
      .matches(
        /^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/,
        "El nombre debe tener letras, números, espacios y caracteres especiales.",
      )
      .min(3, "El nombre debe tener al menos 3 caracteres.")
      .max(50, "El nombre no puede tener más de 50 caracteres."),
    secondLastName: Yup.string()
      .required("Apellido materno requerido.")
      .matches(
        /^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/,
        "El apellido debe tener letras, números, espacios y caracteres especiales.",
      )
      .min(3, "El apellido debe tener al menos 3 caracteres.")
      .max(50, "El apellido no puede tener más de 50 caracteres."),
    phone: Yup.string()
      .phone(region, "Formato inválido")
      .required("El campo es requerido."),
  });

  const createExperienceValidation = Yup.object().shape({
    job: Yup.string()
      .required("Trabajo requerido.")
      .min(3, "El trabajo debe tener al menos 3 caracteres.")
      .max(50, "El trabajo no puede tener más de 50 caracteres."),
    duration: Yup.number()
      .required("Tiempo requerido.")
      .min(1, "El tiempo debe ser mayor o igual a 1.")
      .max(100, "El tiempo no puede ser mayor a 100."),
  });

  const createVehicleValidation = Yup.object().shape({
    brand: Yup.string()
      .required("Marca requerida.")
      .min(3, "La marca debe tener al menos 3 caracteres.")
      .max(50, "La marca no puede tener más de 50 caracteres."),
    // imageUrl: Yup.string()
    //   .required("Imagen requerida.")
    //   .url("Formato inválido."),
    serviceId: Yup.number().required("Servicio requerido."),
  });

  const createBankAccountValidation = Yup.object().shape({
    bankName: Yup.string().required("Nombre del banco requerida."),
    accountNumber: Yup.string()
      .length(16, "La cuenta bancaria debe tener 16 digitos")
      .matches(/^\d+$/, "Solo se permiten números")
      .required("Cuenta bancaria requerida."),
    accountTypeId: Yup.number().required("Tip de cuenta bancaria requerido."),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setEditable(false);
    dispatch(updateUser({ userInformation: user, type: userType }));
  };

  useEffect(() => {
    dispatch(getExperiencesByDriverId(currentUser.id));
    dispatch(getVehiclesByDriverId(currentUser.id));
    dispatch(getBankAccountByDriverId(currentUser.id));
    if (!serviceTypes) dispatch(getServiceTypes());
    if (!bankAccountTypes) dispatch(getBankAccountTypes());
  }, []);

  const defineAccountTypeId = (type: string) => {
    serviceTypes.forEach((serviceType) => {
      if (serviceType.name === type) return serviceType.id;
    });
    return 3;
  };

  useEffect(() => {
    if (bankAccountData)
      setBankAccount({
        id: currentUser.id,
        bankName: bankAccountData.bankName,
        accountNumber: bankAccountData.number,
        accountTypeId: defineAccountTypeId(bankAccountData.type),
      });
  }, [bankAccountData]);

  const [experience, setExperience] = useState<CreateExperience>({
    id: currentUser.id,
    job: "",
    duration: 0,
  });

  const [vehicle, setVehicle] = useState<CreateVehicle>({
    brand: "",
    imageUrl: "",
    serviceId: 0,
    driverId: currentUser.id,
  });

  const [bankAccount, setBankAccount] = useState<
    CreateBankAccount | EditBankAccount
  >({
    driverId: currentUser.id,
    bankName: "",
    accountNumber: "",
    accountTypeId: 0,
  });

  const handleSubmitExperience = () => {
    dispatch(addExperience(experience));
  };

  const handleSubmitVehicle = () => {
    dispatch(addVehicle(vehicle));
  };

  const handleSubmitBankAccount = () => {
    dispatch(addBankAccount(bankAccount as CreateBankAccount));
  };

  const handleChangeExperience = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExperience((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeVehicle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setVehicle((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeBankAccount = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setBankAccount((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRemoveExperience = (id: number) => {
    dispatch(deleteExperienceById(id));
  };

  const handleRemoveVehicle = (id: number) => {
    dispatch(deleteVehicleById(id));
  };

  const handleRemoveBankAccount = (id: number) => {
    dispatch(deleteBankAccountById(id));
  };

  const handleEditBankAccount = () => {
    dispatch(editBankAccount(bankAccount as EditBankAccount));
  };

  return {
    editable,
    setEditable,
    user,
    setUser,
    loading,
    handleChange,
    handleSubmit,
    updateInformationValidation,
    experiences,
    handleSubmitExperience,
    experience,
    handleChangeExperience,
    createExperienceValidation,
    handleRemoveExperience,
    serviceTypes,
    vehicles,
    handleSubmitVehicle,
    vehicle,
    handleChangeVehicle,
    createVehicleValidation,
    handleRemoveVehicle,
    bankAccountTypes,
    bankAccountData,
    handleSubmitBankAccount,
    bankAccount,
    handleChangeBankAccount,
    createBankAccountValidation,
    handleRemoveBankAccount,
    handleEditBankAccount,
  };
};

export default useProfile;
