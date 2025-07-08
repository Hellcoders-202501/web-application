import { useState } from "react";

type Props = {
  value: number; // de 0 a 5
  onChange?: (value: number) => void;
  size?: number; // tamaño opcional
  readOnly?: boolean;
};

const Rating = ({ value, onChange, size = 28, readOnly = false }: Props) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex gap-1" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = hovered !== null ? star <= hovered : star <= value;

        return (
          <button
            key={star}
            type="button"
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(null)}
            disabled={readOnly}
            onClick={() => onChange?.(star)}
            className={`transition-all ${
              filled ? "text-yellow-400" : "text-gray-300"
            }`}
            aria-label={`Estrella ${star}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={size}
              height={size}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 .587l3.668 7.571L24 9.748l-6 5.847L19.336 24 12 20.01 4.664 24 6 15.595 0 9.748l8.332-1.59z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
};

export default Rating;
