import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ApiError } from "@/types/apiTypes";

interface btn {
  value: string;
  icon: string;
  goto?: string;
  className?: string;
  handleClick?: () => void;
}

interface ErrorWidgetProps {
  error?: ApiError | null;
  title?: string;
  subtitle: string;
  className?: string;
  btns: btn[];
}

const ErrorWidget = ({
  error,
  title = error?.response?.data.message ?? "Qualcosa e' andato storto!",
  subtitle,
  className,
  btns,
}: ErrorWidgetProps) => {
  const btnsEl = btns.map((btn) => (
    <Link to={`/${btn.goto ?? ""}`}>
      <Button
        onClick={btn.handleClick}
        className={`font-semibold flex-center gap-2 py-4 px-6 rounded-[30px] ${
          btn.className ?? ""
        }`}
      >
        <img src={`/icons/${btn.icon}.png`} alt={`${btn.value}-icon`} />
        {btn.value}
      </Button>
    </Link>
  ));

  return (
    <div
      className={`sm:w-[600px] sm:px-20 py-8 text-center ${className ?? ""}`}
    >
      <h1 className="text-[30px]">{title}</h1>
      <p className="font-normal mb-9 my-3">{subtitle}</p>
      <div className={`flex-center ${btns.length > 1 ? "gap-6" : ""}`}>
        {btnsEl}
      </div>
    </div>
  );
};
export default ErrorWidget;
