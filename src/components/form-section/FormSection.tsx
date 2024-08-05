import FormBox from '../form-box/FormBox'
import { useTranslation } from 'react-i18next'

const FormSection = () => {
  const { t } = useTranslation();

  return (
    <div>
        <h2>{t("CreateNewAdvertisement")}</h2>
        {/* form inputs component */}
        <FormBox/>
      </div>
  )
}

export default FormSection
