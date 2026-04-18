interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Checkbox({ label, id, ...rest }: CheckboxProps) {
  return (
    <div className="flex items-center gap-2 group cursor-pointer">
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          id={id}
          {...rest}
          className="
            peer h-3 w-3 cursor-pointer appearance-none rounded border 
            border-slate-300 bg-white transition-all 
            checked:border-green-600 checked:bg-green-600
            hover:border-green-400
            focus:outline-none focus:ring-2 focus:ring-green-100
          "
        />
        
        <svg
          className="absolute h-3.5 w-3.5 pointer-events-none hidden peer-checked:block text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-white cursor-pointer select-none"
        >
          {label}
        </label>
      )}
    </div>
  );
}