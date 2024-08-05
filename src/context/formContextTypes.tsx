export interface FormDatas {
  id?: string | number;
  title: string;
  description: string;
  image: string;
}
export type CardDataContextType = {
  datas: FormDatas[];
  editedData: FormDatas | null;

  handleGetData: () => void;
  createData: (datas: FormDatas) => void;
  handleEditData: (id: string | number | undefined) => void;
  deleteData: (id: string | number | undefined) => void;
  updateData: (id: string | number | undefined, data: FormDatas) => void;
};
