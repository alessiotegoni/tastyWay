import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { ApiError } from "@/types/apiTypes";

export interface btn {
  id: string;
  value: string;
  icon?: string;
  goto?: string | number;
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
      if (btn.goto) navigate(btn.goto as string);
    };

    return (
      <Button
        key={btn.id}
        onClick={handleClick}
        className={`btn font-semibold flex-center gap-2
          py-3 px-3 xs:py-4 xs:px-6 rounded-[30px]
          w-full basis-1/2 max-w-[230px] text-sm sm:text-base ${
            btn.className ?? ""
          }`}
      >
        {btn.icon && (
          <img
            src={`/icons/${btn.icon}.png`}
            alt={`${btn.value}-icon`}
            className="w-6 h-6"
          />
        )}
        {btn.value}
      </Button>
    );
  });

  return (
    <div
      className={`md:w-[700px] p-4 xs:p-6 sm:p-8 sm:px-20 text-center ${
        className ?? ""
      }`}
    >
      <h1 className="text-2xl xs:text-[29px]">{title}</h1>
      <p
        className="font-normal mb-14 my-3 w-full mx-auto
      text-sm max-w-[350px] xs:max-w-[510px]"
      >
        {subtitle}
      </p>
      <div className={`flex-center ${btns.length > 1 ? "gap-2 sm:gap-6" : ""}`}>
        {btnsEl}
      </div>
    </div>
  );
};
export default ErrorWidget;
