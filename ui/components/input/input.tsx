import { Input } from '../input';
import { Textarea } from '../textarea/textarea';
import { useFormContext, Controller, ControllerProps } from 'react-hook-form';
import { Label } from '../label';
import { cn } from '@/lib/utils';
import { HTMLProps } from 'react';

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
  className?: string;
  rows?: number;
  controllerProps?: Omit<ControllerProps, 'name' | 'control' | 'render'>;
  inputOptions?: Omit<
    HTMLProps<HTMLInputElement>,
    'onChange' | 'onBlur' | 'ref'
  >;
  textareaOptions?: Omit<
    HTMLProps<HTMLTextAreaElement>,
    'onChange' | 'onBlur' | 'ref'
  >;
};

export function FormInput({
  name,
  label,
  placeholder,
  type = 'text',
  multiline = false,
  className,
  rows = 4,
  controllerProps,
  inputOptions,
  textareaOptions,
}: Props) {
  const { control } = useFormContext();

  return (
    <div className="space-y-1.5">
      {label && (
        <Label htmlFor={name} className="text-sm font-medium">
          {label}
        </Label>
      )}
      <Controller
        {...controllerProps}
        name={name}
        control={control}
        render={({ field, fieldState }) =>
          multiline ? (
            <Textarea
              id={name}
              placeholder={placeholder}
              rows={rows}
              value={field.value ?? ''}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
              className={cn(
                className,
                fieldState.error && 'border-destructive'
              )}
              {...textareaOptions}
            />
          ) : (
            <Input
              id={name}
              type={type}
              placeholder={placeholder}
              value={field.value ?? ''}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
              className={cn(
                className,
                fieldState.error && 'border-destructive'
              )}
              {...inputOptions}
            />
          )
        }
      />
      <p className="text-sm text-destructive">
        <ErrorMessage name={name} />
      </p>
    </div>
  );
}

function ErrorMessage({ name }: { name: string }) {
  const {
    formState: { errors },
  } = useFormContext();

  const fieldError = name
    .split('.')
    .reduce((acc: any, key) => acc?.[key], errors as any);

  return fieldError?.message || null;
}
