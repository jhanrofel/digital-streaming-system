import FormAutoComplete from "../../components/FormAutoComplete";
import { render, screen } from "@testing-library/react";

const actorList: OptionsClass[] = [
  { label: "Will Smith", id: "actor_id_01" },
  {
    label: "Jackie Chan",
    id: "actor_id_02",
  },
  {
    label: "Keanu Reeves",
    id: "actor_id_03",
  },
  { label: "Jaden Smith", id: "actor_id_04" },
];

const formValue: FormValues = {
  id: "form_id_01",
  label: "Actor List",
  error: "",
  options: actorList,
  value: [],
  onChange: null,
};

interface FormValues {
  id: string;
  label: string;
  error: string;
  options: OptionsClass[];
  value: OptionsClass[];
  onChange: any;
}

interface OptionsClass {
  label: string;
  id: string;
}

const renderForm = (props: Partial<FormValues>) => {
  render(
    <FormAutoComplete
      id={formValue.id}
      label={formValue.label}
      error={formValue.error}
      options={formValue.options}
      value={formValue.value}
      onChange={formValue.onChange}
      {...props}
    />
  );
}

describe("<FormAutoComplete/>", () => {  
  test("Should find element by text.", () => {
    renderForm({label:"Actor List"});
    const autoComplete = screen.getByText("Actor List");
    expect(autoComplete).toBeInTheDocument;
  });

  test("Should find element combobox role.", () => {
    renderForm({});
    const autoComplete = screen.getByRole("combobox");
    expect(autoComplete).toBeInTheDocument;
  });

  test("Should check element have sample value of label.", () => {
    renderForm({value:[{ label: "Will Smith", id: "actor_id_01" }]});
    const autoComplete = screen.getByText("Will Smith");
    expect(autoComplete).toBeTruthy();
  });


});
