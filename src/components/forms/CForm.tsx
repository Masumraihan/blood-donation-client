import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";

type TFormConfig = {
  defaultValues?: FieldValues;
  resolver?: any;
};

type TCFromProps = {
  children: React.ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
} & TFormConfig;
const CForm = ({ children, onSubmit, resolver, defaultValues }: TCFromProps) => {
  const formConfig: TFormConfig = {};

  if (resolver) formConfig.resolver = resolver;
  if (defaultValues) formConfig.defaultValues = defaultValues;

  const methods = useForm(formConfig);
  const { handleSubmit, reset } = methods;
  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    reset();
  };
  return (
    <FormProvider {...methods}>
      <form style={{ width: "100%" }} onSubmit={handleSubmit(submit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default CForm;
