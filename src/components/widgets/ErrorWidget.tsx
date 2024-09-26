import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { ApiError } from "@/types/apiTypes";

export interface btn {
  id: string;
  value: string;
  icon: string;
  goto?: string;
  className?: string;
  handleClick?: () => void;
}

export interface ErrorWidgetProps {
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
  const navigate = useNavigate();

  const btnsEl = btns.map((btn) => {
    const handleClick = () => {
      if (btn.handleClick) btn.handleClick();
      if (btn.goto) navigate(btn.goto);
    };

    return (
      <Button
        key={btn.id}
        onClick={handleClick}
        className={`font-semibold flex-center gap-2 py-4 px-6 rounded-[30px]
          w-full max-w-[230px] ${
          btn.className ?? ""
        }`}
      >
        <img
          src={`/icons/${btn.icon}.png`}
          alt={`${btn.value}-icon`}
          className="w-6 h-6"
        />
        {btn.value}
      </Button>
    );
  });

  return (
    <div
      className={`sm:w-[700px] sm:px-20 py-8 text-center ${className ?? ""}`}
    >
      <h1 className="text-[29px]">{title}</h1>
      <p className="font-normal mb-14 my-3 w-full mx-auto max-w-[510px]">
        {subtitle}
      </p>
      <div className={`flex-center ${btns.length > 1 ? "gap-6" : ""}`}>
        {btnsEl}
      </div>
    </div>
  );
};
export default ErrorWidget;
