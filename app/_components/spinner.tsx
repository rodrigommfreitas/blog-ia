import { cn } from "@/app/_components/utils";

interface SpinnerProps {
  size?: string;
  padding?: string;
  color?: "#fff";
}

export default function Spinner({
  size = "20",
  padding = "6px",
}: SpinnerProps) {
  return (
    <div className={cn(`p-[${padding}] rounded-full`)}>
      <SpinnerIcon size={size} />
    </div>
  );
}

function SpinnerIcon({ size = "20" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="animate-spin"
      fill="none"
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke={"#000"}
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="#fff"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
