import { useContext, useEffect } from "react";
import CardBox from "../card-box/CardBox";
import SelectBox from "../select-box/SelectBox";
import { formContext } from "../../context/FormContext";
import { useTranslation } from "react-i18next";

const CardsList = () => {
  const { t } = useTranslation();

  const { datas, deleteData, handleGetData, handleEditData } =
    useContext(formContext);

  // get data if exists
  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <div>
      <div className="flex-line flex-justify-between">
        <h2>{t("Advertisement")}</h2>
        <div className="flex-line">
          <label htmlFor="lang">{t("Language")}</label>
          {/* language select box */}
          <SelectBox />
        </div>
      </div>
      <div className="flex-line ">
        {/* make card box for datas */}
        {datas?.map((data) => (
          <CardBox
            title={data.title}
            description={data.description}
            image={data.image}
            t={t}
            key={data.id}
            onClickDelete={() => deleteData(data.id)}
            onClickEdit={() => handleEditData(data.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CardsList;
