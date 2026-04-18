import { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: LucideIcon; // pede um componente tipo LucideIcon
    label?: string;
    error?: string;
}

export default function Input({ icon: Icon, label, name, placeholder, error, ...rest }: InputProps) {
    return (
        <div className="flex flex-col gap-2 w-full">
            {label && (
                <label htmlFor={name} className="text-sm font-medium text-zinc-600">
                    {label}
                </label>
            )}
            
            <div className="relative flex items-center">
                {Icon && (
                    <div className="absolute left-3 text-zinc-600">
                        <Icon size={18} />
                    </div>
                )}
                
                <input
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    {...rest}
                    className={`
                        w-full rounded-full border border-gray-300 bg-white py-2 px-3 
                        text-sm outline-none transition-all
                        focus:border-green-500 focus:ring-2 focus:ring-green-200
                        text-zinc-600
                        ${Icon ? 'pl-10' : 'pl-3'} 
                        placeholder:text-zinc-600
                    `}
                />
            </div>
            
            {error && (
                <span className="text-xs text-red-500 ml-3 mt-1">
                    {error}
                </span>
            )}

        </div>
    )
}