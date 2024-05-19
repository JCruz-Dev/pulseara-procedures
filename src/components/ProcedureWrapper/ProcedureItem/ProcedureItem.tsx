const ProcedureItem = ({
  title,
  description,
  id,
  testId,
}: {
  title: string;
  description: number | string;
  id?: number | undefined;
  testId?: string;
}) => {
  return (
    <>
      <div className="flex flex-col gap-2" data-testid={testId}>
        <h2 className="text-procedure-neutral-gray-400 mb-0 leading-normal">
          {title} {id}
        </h2>
        <p className="text-procedure-black-100 font-semibold">{description}</p>
      </div>
    </>
  );
};
export default ProcedureItem;
