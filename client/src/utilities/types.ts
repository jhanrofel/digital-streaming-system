export interface IAlert {
  open: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
}

export interface IAutoCompleteOption {
  label: string;
  id: string;
}

export interface ILink {
  catalogue: string;
}

export interface ITableTabInfo {
  label: string;
  formPages: JSX.Element;
}