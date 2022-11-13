import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import React, { useState } from "react";
import { omit } from "lodash";
import { IObjectAny } from "../utilities/types";
import { regex } from "../utilities/helpers";
import { SelectChangeEvent } from "@mui/material/Select";

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useFormValidation = ({ callback, fieldsToValidate }: any) => {
  const [formValues, setValues] = useState<IObjectAny>({});
  const [formErrors, setErrors] = useState<IObjectAny>({});

  const resetForm = () => {
    setValues({});
    setErrors({});
  };

  const setForm = (defaultValues:any) => {
    setValues({...formValues,...defaultValues});
  };

  const onChangeHandler = (event: any) => {
    event.persist();

    let name = event.target.name;
    let value = event.target.value;

    switch (name) {
      case "trailerLink":
        break;
      default:
        validate(event, name, value);
        break;
    }

    setValues({
      ...formValues,
      [name]: value,
    });
  };

  const onChangeActors = (
    event: React.FormEvent<HTMLInputElement>,
    value: any
  ) => {
    const name = "actors";
    if (value.length === 0) {
      setErrors({
        ...formErrors,
        [name]: `Actors is required.`,
      });
    } else {
      const newFormErrors = omit(formErrors, name);
      setErrors(newFormErrors);
    }

    setValues({ ...formValues, actors: value });
  };

  const onChangeSelect = (event: SelectChangeEvent) => {
    let name = (event.target as HTMLInputElement).name;
    let value = (event.target as HTMLInputElement).value;

    setValues({
      ...formValues,
      [name]: value,
    });
  };

  const onClickHandler = (event: React.FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();

    if (
      Object.keys(formErrors).length === 0 &&
      Object.keys(formValues).length >= fieldsToValidate.length
    ) {
      callback(formValues);
    } else {
      const emptyFields: IObjectAny = formValidate(fieldsToValidate);

      setErrors({
        ...formErrors,
        ...emptyFields,
      });
    }
  };

  const validate = (
    event: React.FormEvent<HTMLFormElement>,
    name: string,
    value: string
  ) => {
    const fieldName = getFieldName(name);
    if (value.length === 0) {
      setErrors({
        ...formErrors,
        [name]: `${fieldName} is required.`,
      });
    } else {
      const newFormErrors = omit(formErrors, name);
      setErrors(newFormErrors);
      switch (name) {
        case "cost":
        case "yearReleased":
          if (!new RegExp(regex.number).test(value) || parseInt(value) <= 0) {
            setErrors({
              ...formErrors,
              [name]: `${fieldName} is invalid.`,
            });
            console.log(value, name);
          }
          break;
        default:
          break;
      }
    }
  };

  const formValidate = (fieldsToValidate: string[]) => {
    let emptyFields: IObjectAny = {};

    fieldsToValidate.forEach((name) => {
      if (formValues[name] === undefined) {
        const fieldName = getFieldName(name);
        emptyFields = { ...emptyFields, [name]: `${fieldName} is required.` };
      }
    });

    return emptyFields;
  };

  return {
    formValues,
    formErrors,
    onChangeHandler,
    onChangeActors,
    onChangeSelect,
    onClickHandler,
    resetForm,
    setForm,
  };
};

export const getFieldName = (name: string): string => {
  let fieldName: string;
  switch (name) {
    case "yearReleased":
      fieldName = "Year released";
      break;
    case "imageLink":
      fieldName = "Image link";
      break;
    default:
      fieldName = name.charAt(0).toUpperCase() + name.slice(1);
      break;
  }

  return fieldName;
};
