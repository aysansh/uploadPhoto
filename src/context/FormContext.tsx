import React, { useCallback } from "react";
import { FormDatas, CardDataContextType } from "../context/formContextTypes";
import { t } from "i18next";

export const formContext = React.createContext<CardDataContextType>({
  datas: [],
  editedData: {
    id: 0,
    title: "",
    description: "",
    image: "",
  },
  handleGetData: () => {},
  createData: () => {},
  handleEditData: () => {},
  deleteData: () => {},
  updateData: () => {},
});

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [datas, setDatas] = React.useState<FormDatas[]>([]);
  const [editData, setEditData] = React.useState<FormDatas | null>(null);

  const handleGetData = useCallback(async () => {
    const response = await fetch(
      "https://66ac0bdff009b9d5c730fa4d.mockapi.io/api/adver"
    );
    const data = await response.json();
    setDatas(data);
  }, []);

  const createData = useCallback(
    async (data: FormDatas) => {
      await fetch("https://66ac0bdff009b9d5c730fa4d.mockapi.io/api/adver", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      handleGetData();
    },
    [handleGetData]
  );

  const handleEditData = useCallback(
    async (id: string | number | undefined) => {
      const response = await fetch(
        "https://66ac0bdff009b9d5c730fa4d.mockapi.io/api/adver/" + id
      );
      const data = await response.json();
      setEditData(data);
    },
    []
  );

  const updateData = useCallback(
    async (id: string | number | undefined, data: FormDatas) => {
      await fetch(
        "https://66ac0bdff009b9d5c730fa4d.mockapi.io/api/adver/" + id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      handleGetData();
    },
    [handleGetData]
  );

  const deleteData = useCallback(
    async (id: string | number | undefined) => {
      const sureToDelete = confirm(t("areYouSure"));
      if(sureToDelete){

        await fetch(
          "https://66ac0bdff009b9d5c730fa4d.mockapi.io/api/adver/" + id,
          {
            method: "DELETE",
          }
        );
        handleGetData();
      }else{
        return;
      }
    },
    [handleGetData]
  );

  const contextValue: CardDataContextType = {
    datas,
    editedData: editData,
    handleGetData,
    createData,
    updateData,
    handleEditData,
    deleteData,
  };

  return (
    <formContext.Provider value={contextValue}>{children}</formContext.Provider>
  );
};
