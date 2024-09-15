"use client";
function Progress({ step }) {
  return (
    <div className="grid grid-cols-3 mb-6 h-2 min-w-[300px] rounded-[5px] overflow-hidden bg-primary-foreground">
      <div
        className={
          step === 1
            ? "col-span-1 bg-primary h-full transition-all ease-linear duration-300"
            : "col-span-1 h-full transition-all ease-linear duration-300"
        }
      ></div>
      <div
        className={
          step === 2
            ? "col-span-1 bg-primary h-full transition-all ease-linear duration-300"
            : "col-span-1 h-full transition-all ease-linear duration-300"
        }
      ></div>
      <div
        className={
          step === 3
            ? "col-span-1 bg-primary h-full transition-all ease-linear duration-300"
            : "col-span-1 h-full transition-all ease-linear duration-300"
        }
      ></div>
    </div>
  );
}

export default Progress;
