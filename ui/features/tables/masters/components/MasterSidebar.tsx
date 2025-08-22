import { useResearcherAddMaster, useResearcherUpdateMaster } from '@/lib/hooks';
import { MasterResponse } from '@/lib/types';
import { Sidebar } from '@/ui/components/sidebar/sidebar';
import {
  MasterFormData,
  masterFormDefaultValues,
  masterFormSchema,
} from '@/ui/forms/master-form.validation';
import MasterForm from '@/ui/forms/master.form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface AddMasterSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selected: MasterResponse | null;
}

export function MasterSidebar({
  open,
  onOpenChange,
  selected,
}: AddMasterSidebarProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(masterFormSchema),
  });

  useEffect(() => {
    console.log(selected);
    form.setValue('name', selected ? selected.name : '');
  }, [selected]);

  const createMutation = useResearcherAddMaster();
  const updateMutation = useResearcherUpdateMaster();

  const handleSubmit = async (data: MasterFormData) => {
    setIsLoading(true);
    try {
      if (selected) {
        await updateMutation.mutateAsync({
          masterId: selected.id,
          input: data,
        });
      } else {
        await createMutation.mutateAsync(data);
      }
      toast.success(
        `استاد راهنما با موفقیت ${selected ? 'ویرایش' : 'افزوده'} شد`
      );
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
        title={`${selected ? 'ویرایش' : 'افزودن'} استاد راهنما`}
        onSubmit={form.handleSubmit(handleSubmit)}
        isLoading={isLoading}
      >
        <MasterForm onSubmit={handleSubmit} />
      </Sidebar>
    </FormProvider>
  );
}
