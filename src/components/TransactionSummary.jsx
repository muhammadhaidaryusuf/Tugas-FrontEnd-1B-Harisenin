/* eslint-disable react/prop-types */

const TransactionSummary = () => {
  const btnPayment = () => {
    location.href = "./payFinish";
  };
  const isPayPage = location.pathname === "/payFinish";

  return (
    <div className="mt-4 flex flex-col gap-2">
      <h1 className="text-sm">Transaction Summary</h1>
      <div className="flex gap-[10rem] sm:gap-[20rem] w-full">
        <div className="title flex flex-col gap-2">
          {items.map((item, index) => (
            <h1 key={index} className="text-xs">
              {item.title}
            </h1>
          ))}
        </div>
        <div className="title flex flex-col gap-2">
          {items.map((item, index) => (
            <h1 key={index} className="text-xs">
              {item.price}
            </h1>
          ))}
        </div>
      </div>
      {!isPayPage && (
        <button className="rounded-full bg-[#09147A] w-fit h-10 px-5 py-2 text-sm my-4" onClick={btnPayment}>
          Bayar
        </button>
      )}
    </div>
  );
};

export default TransactionSummary;
