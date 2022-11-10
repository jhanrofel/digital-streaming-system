import ActorForm, { genderData } from "../../../components/Actor/ActorForm";
import {
  actorFormErrors,
  actorFormValues,
} from "../../../utilities/formValues";
import { IActorFormErrors, IActorFormValues } from "../../../utilities/types";
import { render, screen } from "@testing-library/react";
import { Dayjs } from "dayjs";
import { SelectChangeEvent } from "@mui/material/Select";
import { BrowserRouter as Router } from "react-router-dom";

interface FormProps {
  formName: string;
  formValues: IActorFormValues;
  formErrors: IActorFormErrors;
  birthday: Dayjs | null;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onChangeSelect: (event: SelectChangeEvent) => void;
  onClickCloseAlert: (event: Event | React.SyntheticEvent<any, Event>) => void;
  setBirthday: any;
}

const formPropsValues: FormProps = {
  formName: "AddForm",
  formValues: actorFormValues,
  formErrors: actorFormErrors,
  birthday: null,
  onChange: jest.fn(),
  onClick: jest.fn(),
  onClickCloseAlert: jest.fn(),
  onChangeSelect: jest.fn(),
  setBirthday: "",
};

const renderForm = ({ props }: any) => {
  return render(
    <Router>
      <ActorForm
        formName={"AddForm"}
        formErrors={formPropsValues.formErrors}
        formValues={formPropsValues.formValues}
        birthday={formPropsValues.birthday}
        onChange={formPropsValues.onChange}
        onClick={formPropsValues.onClick}
        onChangeSelect={formPropsValues.onChangeSelect}
        setBirthday={formPropsValues.setBirthday}
        onClickCloseAlert={formPropsValues.onClickCloseAlert}
        {...props}
      />
    </Router>
  );
};

describe("<ActorForm/>", () => {
  test("Should find gender options data.", () => {
    expect(genderData).toEqual(["Male", "Female"]);
  });

  test("Should find element by text.", () => {
    renderForm({ props: { formName: "AddForm" } });
    const links = screen.getByText("LINKS");
    expect(links).toBeInTheDocument;
  });

  test("Should find element by text.", () => {
    renderForm({ props: { formName: "EditForm" } });
    const links = screen.getByText("Back to List");
    expect(links).toBeInTheDocument;
  });
});
