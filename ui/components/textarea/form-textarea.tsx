// components/textarea/textarea.tsx
import { useFormContext } from 'react-hook-form';

interface FormTextareaProps {
  name: string;
  label: string;
  placeholder?: string;
  rows?: number;
}

export function FormTextarea({
  name,
  label,
  placeholder,
  rows = 3,
}: FormTextareaProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">{label}</label>
      <textarea
        {...register(name)}
        rows={rows}
        placeholder={placeholder}
        className="w-full px-3 py-2 border rounded-md"
      />
      {errors[name] && (
        <p className="text-red-500 text-sm">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
