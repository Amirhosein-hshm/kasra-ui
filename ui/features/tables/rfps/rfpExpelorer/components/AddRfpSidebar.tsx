import { useAddExplorerRfp, useExplorerRfpFields } from '@/lib/hooks';
import {
  RFPFormValues,
  rfpRequestSchema,
} from '@/lib/validations/rfpFormValidaton';
import { Sidebar } from '@/ui/components/sidebar/sidebar';
import RfpForm from '@/ui/forms/rfp-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface RFPSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddRFPSidebar({ open, onOpenChange }: RFPSidebarProps) {
  const { data: rfpFields = [] } = useExplorerRfpFields(
    {},
    { queryKey: ['explorerRfpFields', {}], enabled: open }
  );

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useAddExplorerRfp();

  const form = useForm<RFPFormValues>({
    resolver: zodResolver(rfpRequestSchema),
    defaultValues: {
      info: '',
      beneficiary: '',
      representative: '',
      issue_title: '',
      issue_description: '',
      mission_area: '',
      specialty_field: '',
      issue_origin: '',
      proposed_execution_path: '',
      frequency: '',
      financial_value: '',
      key_requirements: '',
      limitations: '',
      technical_solution: '',
      related_projects: '',
      proposed_product: '',
      issue_support: '',
      analyst_evaluator: '',
      keywords: '',
      RFP_field_id: undefined,
    },
  });

  const onSubmit = async (data: RFPFormValues) => {
    try {
      await mutateAsync({
        ...data,
      });
      onOpenChange(false);
      queryClient.invalidateQueries({
        queryKey: ['explorerRfps'],
      });
      form.reset();
      toast.success('RFP با موفقیت ایجاد شد');
    } catch (e) {
      toast.error('خطا در ایجاد RFP');
    }
  };

  return (
    <FormProvider {...form}>
      <Sidebar
        open={open}
        onOpenChange={onOpenChange}
        title="ایجاد RFP"
        description=""
        onSubmit={form.handleSubmit(onSubmit)}
        isLoading={isPending}
      >
        <RfpForm fields={rfpFields} form={form} onSubmit={onSubmit} />
      </Sidebar>
    </FormProvider>
  );
}
