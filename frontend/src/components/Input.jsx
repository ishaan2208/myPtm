import React from "react";

export default React.forwardRef(function Input(
  { className, title, error, type = "text", ...props },
  ref
) {
  return (
    <div className=" w-full mb-2 ">
      <label htmlFor={title} className=" inline-block text-white mb-1 py-1">
        {title}
      </label>
      <input
        type={type}
        ref={ref}
        id={title}
        className={`rounded-lg w-full px-3 py-2 text-black ${className}`}
        {...props}
        autoComplete=""
      />
      <div className=" h-4">
        <p className=" py-1 text-right text-red-500">{error?.message}</p>
      </div>
    </div>
  );
});
