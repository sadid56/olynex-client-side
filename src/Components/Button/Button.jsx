
const Button = ({text}) => {
    return (
        <span className="w-full px-4 py-2 bg-primary hover:bg-blue-600 transition-all duration-300 text-white text-[18px] rounded-md">
            {text}
        </span>
    );
};

export default Button;