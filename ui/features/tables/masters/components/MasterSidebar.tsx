import { useResearcherAddMaster } from '@/lib/hooks';
import { MasterResponse } from '@/lib/types';
import { Sidebar } from '@/ui/components/sidebar/sidebar';
import {
  MasterFormData,
  masterFormDefaultValues,
  masterFormSchema,
} from '@/ui/forms/master-form.validation';
import MasterForm from '@/ui/forms/master.form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface AddMasterSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  masterToUpdate?: MasterResponse;
}

export function AddMasterSidebar({
  open,
  onOpenChange,
  masterToUpdate,
}: AddMasterSidebarProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(masterFormSchema),
    defaultValues: masterToUpdate || masterFormDefaultValues,
  });

  const mutation = useResearcherAddMaster();

  const handleSubmit = async (data: MasterFormData) => {
    setIsLoading(true);
    try {
      await mutation.mutateAsync(data);
      toast.success('استاد راهنما با موفقیت افزوده شد');
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error('خطا در ارسال فرم:', error);
      alert('خطایی رخ داد.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...form}>
      <Sidebar
        open={open}
        onOpenChange={onOpenChange}
        title="افزودن استاد راهنما"
        description=""
        onSubmit={form.handleSubmit(handleSubmit)}
        isLoading={isLoading}
      >
        <MasterForm onSubmit={handleSubmit} />
      </Sidebar>
    </FormProvider>
  );
}
