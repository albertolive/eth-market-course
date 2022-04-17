const SIZE = {
  sm: "p-2 text-sm xs:px-4",
  md: "p-3 text-base xs:px-8",
  lg: "p-3 text-lg xs:px-8",
};

export default function Button({
  children,
  className,
  size = "md",
  variant = "purple",
  hoverable = true,
  ...rest
}) {
  const sizeClass = SIZE[size];
  const variants = {
    white: `text-black bg-white hover:bg-gray-200`,
    purple: `text-white bg-indigo-600 ${hoverable && "hover:bg-indigo-700"}`,
    green: `text-white bg-green-600 ${hoverable && "hover:bg-green-700"}`,
    lightPurple: `text-indigo-700 bg-indigo-100 ${
      hoverable && "hover:bg-indigo-200"
    }`,
    red: `text-white bg-red-600 ${hoverable && "hover:bg-red-700"}`,
  };

  return (
    <button
      {...rest}
      className={`disabled:opacity-50 disabled:cursor-not-allowed border cursor-pointer rounded-md font-medium ${className} ${variants[variant]} ${sizeClass}`}
    >
      {children}
    </button>
  );
}
