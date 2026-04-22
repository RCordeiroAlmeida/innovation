import { LucideIcon, Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    isLoading?: boolean;
    icon?: LucideIcon;
}

export default function Button({ 
    children, 
    variant = 'primary', 
    isLoading, 
    icon: Icon, 
    className, 
    ...rest 
}: ButtonProps) {
    
    
    const variants = {
        primary: "bg-white text-zinc-600 hover:text-lime-500 shadow-sm",
        secondary: "bg-slate-800 text-white hover:bg-slate-900",
        outline: "border border-slate-300 bg-transparent hover:bg-slate-50 text-slate-700"
    };

    return (
        <button
            disabled={isLoading || rest.disabled}
            className={`
                flex items-center justify-center gap-2 rounded-full px-4 py-2 
                text-sm transition-all active:scale-95
                disabled:opacity-50 disabled:cursor-not-allowed
                ${variants[variant]}
                ${className}
            `}
            {...rest}
        >
            {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <>
                    {Icon && <Icon size={18} />}
                    {children}
                </>
            )}
        </button>
    );
}