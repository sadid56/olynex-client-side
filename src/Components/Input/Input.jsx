/* eslint-disable react/prop-types */

const Input = ({ icon: Icon, type, label, register, required, name, errors }) => {
    return (
        <div className="relative w-full h-10">
      <div className="absolute grid w-5 h-5 place-items-center text-blue-gray-500 top-2/4 right-3 -translate-y-2/4">
        {Icon && <Icon className="text-primary" />}
      </div>
      <input
        type={type}
        {...register(name, { required })}
        className={`peer w-full h-full bg-transparent font-sans font-normal outline outline-0 focus:outline-0 transition-all placeholder-shown:border border focus:border-2 border-t focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] !pr-9 border-gray-300 focus:border-primary text-gray-300`}
        placeholder=" "
      />
      <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate leading-tight peer-focus:leading-tight transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-primary peer-focus:before:!border-primary after:border-blue-gray-300 peer-focus:after:!border-primary">
        {label}
      </label>
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">
          {errors[name].message || `${label} is required`}
        </p>
      )}
    </div>
    );
};

export default Input;