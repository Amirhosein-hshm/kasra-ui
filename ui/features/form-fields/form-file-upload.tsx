import { FileUpload } from '@/ui/components/file-upload';
import { Controller, useFormContext } from 'react-hook-form';
import FileDownloadLink from '../file-download/FileDownloadLink';
import { Button } from '@/ui/components/button';
import { TrashIcon } from 'lucide-react';

interface FormFileUploadProps {
  name: string;
  title: string;
}

export function FormFileUpload({ name, title }: FormFileUploadProps) {
  const {
    formState: { errors },
    control,
    watch,
    setValue,
  } = useFormContext();

  return (
    <div className="space-y-2">
      {errors[name] && (
        <p className="text-red-500 text-sm">
          {errors[name]?.message as string}
        </p>
      )}
      {watch(name) ? (
        <div className="relative flex gap-2">
          <FileDownloadLink id={watch(name)} />
          <Button variant="ghost" onClick={() => setValue(name, null)}>
            <TrashIcon color="var(--color-red-primary)" />
          </Button>
        </div>
      ) : (
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange } }) => (
            <FileUpload
              onUploadComplete={(val: any) => {
                onChange(val.id);
              }}
              title={title}
            />
          )}
        />
      )}
    </div>
  );
}
