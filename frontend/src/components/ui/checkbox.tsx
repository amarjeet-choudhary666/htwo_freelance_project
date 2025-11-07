import * as React from "react"
import { cn } from "../../lib/utils"

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, onCheckedChange, ...props }, ref) => {
    return (
      <input
        type="checkbox"
        className={cn(
          "peer h-4 w-4 shrink-0 rounded-sm border border-slate-200 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        onChange={(e) => {
          if (onCheckedChange) {
            onCheckedChange(e.target.checked)
          }
          if (props.onChange) {
            props.onChange(e)
          }
        }}
        {...props}
      />
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }