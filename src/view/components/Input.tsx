import { ComponentProps, forwardRef } from "react";
import { CrossCircledIcon } from "@radix-ui/react-icons"
import { cn } from "../../app/utils/cn";

interface InputProps extends ComponentProps<'input'> {
    name: string
    error?: string
}

export const  Input = forwardRef<HTMLInputElement, InputProps>(( {placeholder, name, id, error, ...props}, ref) => {
    const inputId = id ?? name
    return (
        <div className="relative">
            <input
            ref={ref}
            name={name}
            id={inputId}
            className={cn("bg-white rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 w-full pt-4 peer placeholder-shown:pt-1 focus:border-gray-800 transition-all outline-none", error && "!border-red-900")}
            {...props}
            placeholder=" "
            />
            <label 
                htmlFor={inputId} 
                // className="absolute left-[13px] mt-3.5 text-gray-700 pointer-events-none">
                className="absolute left-[13px] top-2 text-gray-700 pointer-events-none text-xs 
                peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-lg transition-all">
                {placeholder}   
            </label>
            {error && (
                <div className="text-red-900 flex gap-2 items-center mt-2">
                    <CrossCircledIcon/>
                    <span className="text-xs">{error}</span>
                </div>
            )}
        </div>
    );
});