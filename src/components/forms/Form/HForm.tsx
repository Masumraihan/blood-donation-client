import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";

type TFormConfig = {
  defaultValues?: FieldValues;
  resolver?: any;
};

type THFromProps = {
  children: React.ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
} & TFormConfig;
const HForm = ({ children, onSubmit, resolver, defaultValues }: THFromProps) => {
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
      <form onSubmit={handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
};

export default HForm;
