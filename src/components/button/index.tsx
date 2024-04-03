import clsx from "clsx";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={clsx("bg-indigo-500 text-white rounded px-4 py-2", className)}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
