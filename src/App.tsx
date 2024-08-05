import "./App.css";
import CardsList from "./components/cards-list/CardsList";
import FormSection from "./components/form-section/FormSection";
import { FormProvider } from "./context/FormContext";

const App = () => {
  return (
    <FormProvider>
      <div className="container">
        {/* showing cards after add */}
        <CardsList />
        {/* form for CRUD */}
        <FormSection />
      </div>
    </FormProvider>
  );
};

export default App;
