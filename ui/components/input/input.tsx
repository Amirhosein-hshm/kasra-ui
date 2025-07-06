import { Input } from '../input';
import { Textarea } from '../textarea';
import { useFormContext, Controller } from 'react-hook-form';
import { Label } from '../label';
import { cn } from '@/lib/utils';

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
  className?: string;
  rows?: number;
};

export function FormInput({
  name,
  label,
  placeholder,
  type = 'text',
  multiline = false,
  className,
  rows = 4,
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
