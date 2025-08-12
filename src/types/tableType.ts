export interface Column {
  field: string;
  headerName: string;
  minWidth?: number;
  type?: string;
  align?: "right" | "center" | "left";
  format?: (value: number) => string;
  renderCell?: (row: any) => React.ReactNode;
}
