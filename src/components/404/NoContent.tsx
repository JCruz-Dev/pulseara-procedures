import NoDataImg from "@assets/no-data.svg";
export const NoContent = () => {
  return (
    <>
      <div className="flex justify-center items-center flex-col gap-5 mb-5">
        <img src={NoDataImg} alt="No hay datos que mostrar" />
        <p className="font-normal">No hay datos que mostrar</p>
      </div>
    </>
  );
};
