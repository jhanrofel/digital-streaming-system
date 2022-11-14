import ActorForm, { genderData } from "../../../components/Actor/ActorForm";
import { actorFormReset } from "../../../utilities/formValues";
import { IActorForm,IObjectAny } from "../../../utilities/types";
import { render, screen } from "@testing-library/react";
import { SelectChangeEvent } from "@mui/material/Select";
import { BrowserRouter as Router } from "react-router-dom";

interface FormProps {
  openActorForm: boolean;
  formName: "AddForm";
  formValues: IObjectAny;
  formErrors: IObjectAny;
  defaultValue: IActorForm;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onChangeSelect: (event: SelectChangeEvent) => void;
  onClickHandlerFormClose: (
    event: Event | React.SyntheticEvent<any, Event>
  ) => void;
  onChangeDate: (newValue: string) => void;
  onClickHandler: any;
}

const formPropsValues: FormProps = {
  openActorForm: true,
  formName: "AddForm",
  formValues: actorFormReset,
  formErrors: actorFormReset,
  defaultValue: actorFormReset,
  onChange: jest.fn(),
  onChangeSelect: jest.fn(),
  onClickHandlerFormClose: jest.fn(),
  onChangeDate: jest.fn(),
  onClickHandler: jest.fn(),
  
};

const renderForm = ({ props }: any) => {
  return render(
    <Router>
      <ActorForm
        formName={"AddForm"}
        formErrors={formPropsValues.formErrors}
        formValues={formPropsValues.formValues}
        onChange={formPropsValues.onChange}
        onChangeSelect={formPropsValues.onChangeSelect}
        onClickHandlerFormClose={formPropsValues.onChangeSelect}
        onChangeDate={formPropsValues.onChangeSelect}
        onClickHandler={formPropsValues.onChangeSelect}
        {...props}
      />
    </Router>
  );
};

describe("<ActorForm/>", () => {
  test("Should find gender options data.", () => {
    expect(genderData).toEqual(["Male", "Female"]);
  });
  

});
