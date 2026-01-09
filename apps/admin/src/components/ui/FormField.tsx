"use client";

import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";

interface BaseFieldProps {
  label: string;
  error?: string;
  helperText?: string;
}

type InputFieldProps = BaseFieldProps & InputHTMLAttributes<HTMLInputElement> & {
  as?: "input";
};

type TextareaFieldProps = BaseFieldProps & TextareaHTMLAttributes<HTMLTextAreaElement> & {
  as: "textarea";
};

type SelectFieldProps = BaseFieldProps & SelectHTMLAttributes<HTMLSelectElement> & {
  as: "select";
  children: React.ReactNode;
};

type FormFieldProps = InputFieldProps | TextareaFieldProps | SelectFieldProps;

export const FormField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  FormFieldProps
>((props, ref) => {
  const { label, error, helperText, className = "", as = "input", ...rest } = props;

  const baseInputStyles = "block w-full rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0";
  const inputStyles = error
    ? `${baseInputStyles} border-red-300 focus:border-red-500 focus:ring-red-500`
    : `${baseInputStyles} border-gray-300 focus:border-gray-900 focus:ring-gray-900`;

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {rest.required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {as === "textarea" ? (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          className={`${inputStyles} min-h-[100px] resize-y`}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : as === "select" ? (
        <select
          ref={ref as React.Ref<HTMLSelectElement>}
          className={inputStyles}
          {...(rest as SelectHTMLAttributes<HTMLSelectElement>)}
        >
          {(props as SelectFieldProps).children}
        </select>
      ) : (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          className={inputStyles}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

FormField.displayName = "FormField";
