import React from 'react';
import { cn } from '../lib/utils';
import { ArrowRight } from 'lucide-react';
import { type FormType, useFormPanel } from './form-panel';


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  formType?: FormType;
  variant?: 'primary' | 'secondary' | 'accent' | 'magenta' | 'cyan';
  analytics?: string;
  children: React.ReactNode;
  icon?: boolean;
}

export function Button({ 
  href, 
  formType = 'creator',
  variant = 'primary', 
  analytics, 
  children, 
  className,
  icon = true,
  onClick,
  ...props 
}: ButtonProps) {
  const { openForm, openTypeSelector } = useFormPanel();
  const baseClass = "inline-flex items-center justify-center border-2 border-primary px-6 py-3 font-heading font-bold uppercase transition-all whitespace-nowrap";
  const variants = {
    primary: "bg-lime text-primary shadow-hard hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-hover active:translate-x-0.5 active:translate-y-0.5 active:shadow-hard-active",
    secondary: "bg-surface text-primary shadow-hard hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-hover active:translate-x-0.5 active:translate-y-0.5 active:shadow-hard-active",
    accent: "bg-purple text-surface shadow-hard hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-hover active:translate-x-0.5 active:translate-y-0.5 active:shadow-hard-active",
    magenta: "bg-magenta text-surface shadow-hard hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-hover active:translate-x-0.5 active:translate-y-0.5 active:shadow-hard-active",
    cyan: "bg-cyan text-primary shadow-hard hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-hover active:translate-x-0.5 active:translate-y-0.5 active:shadow-hard-active",
  };

  const isFormTrigger = href === 'form';
  const isTypeSelectorTrigger = href === 'type-selector';
  const isVirtualButton = isFormTrigger || isTypeSelectorTrigger;
  const Component = isVirtualButton || !href ? 'button' : 'a';
  const asProps = !isVirtualButton && href ? {
    href,
    target: "_blank",
    rel: "noopener noreferrer"
  } : {};

  return (
    <Component
      className={cn(baseClass, variants[variant], className)}
      data-analytics={analytics}
      onClick={
        isFormTrigger
          ? (event: React.MouseEvent<HTMLButtonElement>) => {
              onClick?.(event);
              if (!event.defaultPrevented) {
                openForm(formType);
              }
            }
          : isTypeSelectorTrigger
          ? (event: React.MouseEvent<HTMLButtonElement>) => {
              onClick?.(event);
              if (!event.defaultPrevented) {
                openTypeSelector();
              }
            }
          : onClick
      }
      {...(isVirtualButton ? { type: 'button' as const } : {})}
      {...asProps}
      {...(props as any)}
    >
      {children}
      {icon && <ArrowRight className="ml-2 w-5 h-5" />}
    </Component>
  );
}

export function Sticker({ children, className, angle = -2 }: { children: React.ReactNode, className?: string, angle?: number }) {
  return (
    <div 
      className={cn("bg-surface border-2 border-primary shadow-hard font-heading font-bold uppercase px-3 py-1 inline-flex items-center transition-transform hover:scale-105 z-10", className)}
      style={{ transform: `rotate(${angle}deg)` }}
    >
      {children}
    </div>
  );
}
