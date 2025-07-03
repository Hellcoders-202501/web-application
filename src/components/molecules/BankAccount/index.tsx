import Button from "@components/atoms/Button";
import Input from "@components/atoms/Input";
import Select from "@components/atoms/Select";
import ConfirmationDialog from "@components/organisms/ConfirmationDialog";
import { BankAccountType } from "@models/common";
import type {
  CreateBankAccount,
  EditBankAccount,
  BankAccount as IBankAccount,
} from "@models/user";
import { ErrorMessage, Form, Formik } from "formik";
import { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";

const BankAccountCard = ({
  bankAccount,
  handleDelete,
  setShowEdit,
}: {
  bankAccount: IBankAccount;
  handleDelete: (id: number) => void;
  setShowEdit: VoidFunction;
}) => {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div className="max-w-xl w-full flex justify-between">
      <div className="flex flex-col gap-5 items-center w-10/12">
        <div className="flex gap-10 justify-between items-end w-full">
          <p className="font-extrabold">Nombre de Cuenta</p>
          <p className="text-sm border-b w-8/12 text-center">
            {bankAccount.bankName}
          </p>
        </div>
        <div className="flex gap-10 justify-between items-end w-full">
          <p className="font-extrabold">Número de cuenta</p>
          <p className="text-sm border-b w-8/12 text-center">
            {bankAccount.number}
          </p>
        </div>
        <div className="flex gap-10 justify-between items-end w-full">
          <p className="font-extrabold">Tipo de cuenta</p>
          <p className="text-sm border-b w-8/12 text-center">
            {bankAccount.type}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-5 items-center justify-center">
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => setShowDelete(true)}
        >
          <MdDelete size={24} color="#CC0000" />
        </button>
        <button type="button" className="cursor-pointer" onClick={setShowEdit}>
          <MdEdit size={24} color="blue" />
        </button>
      </div>

      <ConfirmationDialog
        show={showDelete}
        onClose={() => setShowDelete(false)}
        message="¿Estás seguro de que deseas eliminar esta cuenta bancaria?"
        onConfirm={() => {
          handleDelete(bankAccount.id);
          setShowDelete(false);
        }}
      />
    </div>
  );
};

const BankAccount = ({
  bankAccountData,
  bankAccountTypes,
  addBankAccount,
  bankAccount,
  handleChangeBankAccount,
  createBankAccountValidation,
  handleRemoveBankAccount,
  handleEditBankAccount,
  loading,
}: {
  bankAccountData?: IBankAccount;
  bankAccountTypes?: BankAccountType[];
  addBankAccount?: VoidFunction;
  bankAccount?: CreateBankAccount | EditBankAccount;
  handleChangeBankAccount?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  createBankAccountValidation?: any;
  handleRemoveBankAccount?: (id: number) => void;
  handleEditBankAccount?: VoidFunction;
  loading: boolean;
}) => {
  const [showAddBankAccount, setShowAddBankAccount] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className="w-full lg:mx-10 flex flex-col gap-10">
      <div className="overflow-auto max-h-[500px] px-10">
        {bankAccountData && !showEdit && (
          <BankAccountCard
            bankAccount={bankAccountData}
            handleDelete={handleRemoveBankAccount as (id: number) => {}}
            setShowEdit={() => setShowEdit(true)}
          />
        )}
      </div>
      {!showAddBankAccount && !bankAccountData && (
        <Button
          variant="accept"
          type="button"
          className="w-fit self-end"
          onClick={() => setShowAddBankAccount(true)}
        >
          Agregar cuenta bancaria
        </Button>
      )}
      {(showAddBankAccount || showEdit) && (
        <Formik
          enableReinitialize
          validationSchema={createBankAccountValidation}
          initialValues={bankAccount ?? {}}
          onSubmit={() => {
            if (handleEditBankAccount && showEdit) handleEditBankAccount();
            if (addBankAccount && !showEdit) addBankAccount();
            setShowAddBankAccount(false);
            setShowEdit(false);
          }}
        >
          <Form className="flex flex-col gap-5 items-end max-w-xl w-full">
            <div className="flex flex-col w-full">
              <div className="flex gap-10 justify-between items-end w-full">
                <label htmlFor="bankName" className="font-bold">
                  Nombre de Cuenta
                </label>
                <Input
                  name="bankName"
                  id="bankName"
                  className="w-8/12 text-center"
                  disabled={loading}
                  value={bankAccount?.bankName}
                  onChange={handleChangeBankAccount}
                />
              </div>
              <ErrorMessage
                component="div"
                className="text-red-500 text-sm pl-2 mt-2 w-fit self-end"
                name="bankName"
              />
            </div>
            <div className="flex flex-col w-full">
              <div className="flex gap-10 justify-between items-end w-full">
                <label htmlFor="accountNumber" className="font-bold">
                  Número de cuenta
                </label>
                <Input
                  name="accountNumber"
                  id="accountNumber"
                  className="w-8/12 text-center"
                  disabled={loading}
                  value={bankAccount?.accountNumber}
                  onChange={handleChangeBankAccount}
                />
              </div>
              <ErrorMessage
                component="div"
                className="text-red-500 text-sm pl-2 mt-2 w-fit self-end"
                name="accountNumber"
              />
            </div>
            <div className="flex flex-col w-full">
              <div className="flex gap-10 justify-between items-end w-full">
                <label htmlFor="accountTypeId" className="font-bold">
                  Tipo de cuenta
                </label>
                <Select
                  className="w-8/12 text-center"
                  name="accountTypeId"
                  id="accountTypeId"
                  onChange={handleChangeBankAccount}
                >
                  {bankAccountTypes?.map((accountType) => (
                    <option key={accountType.id} value={accountType.id}>
                      {accountType.type}
                    </option>
                  ))}
                </Select>
              </div>
              <ErrorMessage
                component="div"
                className="text-red-500 text-sm pl-2 mt-2 w-fit self-end"
                name="accountTypeId"
              />
            </div>
            <div className="flex justify-end gap-10 w-full">
              <Button
                variant="denied"
                className="w-fit self-end"
                type="button"
                onClick={() => {
                  setShowAddBankAccount(false);
                  setShowEdit(false);
                }}
                disabled={loading}
                loading={loading}
              >
                Cancelar
              </Button>
              <Button
                variant="accept"
                className="w-fit self-end"
                type="submit"
                disabled={loading}
                loading={loading}
              >
                {showEdit ? "Actualizar" : "Crear"}
              </Button>
            </div>
          </Form>
        </Formik>
      )}
    </div>
  );
};

export default BankAccount;
