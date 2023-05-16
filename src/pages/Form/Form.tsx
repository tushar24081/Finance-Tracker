import React, { useEffect, useState } from "react";
import "./style.css";
import { FormType, formValues } from "../models/FormTypes/Form";
import {
  months,
  years,
  transaction_type,
  accounts,
  currency,
  INITIAL_STATE,
} from "../../utils/_const";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../utils/ValidationSchema";
import { Select } from "../components/FormElements/Select";
import { Input } from "../components/FormElements/Input";
import { base64 } from "../../utils/base64Converter";
import { addTransactions } from "../../reducers/transactions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { RootState } from "../../store";

function Form() {
  const [formState, setFormState] = useState<FormType | undefined>(
    INITIAL_STATE
  );
  const values = formState;
  const [receipt, setReceipt] = useState<string>("");
  const [imageSelected, setImageSelected] = useState<boolean>(false);
  const data = useSelector((state: RootState) => state.transactions.value);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formValues>({ values, resolver: yupResolver(schema) });
  const { id } = useParams();
  const onSubmit = handleSubmit((data) => {
    const newObject: FormType = {
      ...data,
      fileBase64: receipt,
      id: new Date().getTime(),
      user: "tushar",
    };
    if (id) {
      alert("WE will edit this");
      return;
    }
    dispatch(addTransactions(newObject));
  });

  useEffect(() => {
    if (id) {
      let dataToShow: FormType | undefined = data.find(
        (element) => element.id === parseInt(id)
      );
      if (dataToShow?.fileBase64) {
        setReceipt(dataToShow.fileBase64);
        setImageSelected(true);
      }
      setFormState(dataToShow);
    } else {
      setFormState(INITIAL_STATE);
    }
  }, [id, data]);

  const handleFileSelect = async (selectorFiles: FileList) => {
    let ans: string | unknown = await base64(selectorFiles[0]);
    if (ans) {
      setReceipt(ans as string);
      setImageSelected(true);
    }
  };

  const handleImageCancel = () => {
    setReceipt("");
    setImageSelected(false);
  };

  return (
    <Sidebar>
      <>
        <form onSubmit={onSubmit}>
          <Input
            name="date"
            type="date"
            register={register}
            error={errors.date}
            label="Date"
          />
          <Select
            name="month"
            data={months}
            register={register}
            error={errors.month}
          />
          <Select
            name="year"
            data={years}
            register={register}
            error={errors.year}
          />
          <Select
            name="transaction_type"
            data={transaction_type}
            register={register}
            error={errors.transaction_type}
          />
          <Select
            name="from_account"
            data={accounts}
            register={register}
            error={errors.from_account}
          />
          <Select
            name="to_account"
            data={accounts}
            register={register}
            error={errors.to_account}
          />
          <Select
            name="currency"
            data={currency}
            register={register}
            error={errors.currency}
          />
          <Input
            name="amount"
            type="number"
            register={register}
            error={errors.amount}
            label="Amount:"
          />
          <Input
            name="notes"
            type="text"
            register={register}
            error={errors.notes}
            label="Notes:"
          />
          {imageSelected ? (
            <>
              <img src={receipt} alt="Oops Error" width={40} height={40} />{" "}
              <button type="button" onClick={handleImageCancel}>
                X
              </button>
              {errors && errors.fileBase64?.message}
            </>
          ) : (
            <>
              <input
                type="file"
                {...register("fileBase64", {
                  onChange: (e) => handleFileSelect(e.target.files),
                })}
              />
            </>
          )}

          <button type="submit">Submit</button>
          <Link to="/">
            <button type="submit">Go to List</button>
          </Link>
        </form>
      </>
    </Sidebar>
  );
}

export default Form;