import { useFormContext, Controller } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../select';
import { Label } from '../label';
import { cn } from '@/lib/utils';
import { useMeStore } from '@/lib/stores/me.stores';

type Option = {
  label: string;
  value: string | number;
};

interface FormSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  options?: Option[];
  enumKey?: string; // prop جدید
  className?: string;
  value?: string;
  disabled?: boolean;
}

export function FormSelect({
  name,
  label,
  placeholder = 'انتخاب کنید',
  options,
  enumKey,
  className,
  value,
  disabled,
}: FormSelectProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const enumObject = useMeStore((s) =>
    enumKey ? (s.user?.[enumKey] as Record<string, string>) : undefined
  );

  const derivedOptions: Option[] =
    enumObject && typeof enumObject === 'object'
      ? Object.entries(enumObject).map(([key, val]) => ({
          value: key,
          label: val,
        }))
      : options || [];

  const error = name.split('.').reduce((obj: any, key) => obj?.[key], errors);

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
        render={({ field }) => (
          <Select
            value={value || field.value?.toString() || ''}
            onValueChange={field.onChange}
            disabled={disabled}
          >
            <SelectTrigger
              className={cn(error && 'border-destructive', className)}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {derivedOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value.toString()}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      {error?.message && (
        <p className="text-sm text-destructive">{error.message}</p>
      )}
    </div>
  );
}
