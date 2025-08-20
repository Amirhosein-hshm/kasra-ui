import {
  useEditExplorerRfp,
  useExplorerRfpFields,
  useGetExplorerRfpById,
} from '@/lib/hooks';
import {
  RFPFormValues,
  rfpRequestSchema,
} from '@/lib/validations/rfpFormValidaton';
import { Sidebar } from '@/ui/components/sidebar/sidebar';
import RfpForm from '@/ui/forms/rfp-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Suspense, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { RFPSidebarSkeleton } from '../loading/editRfpSidbarloading';

interface EditRFPSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selected: RFPResponse;
}

export interface RFPResponse {
  id: number;
  info: string;
  RFP_field_id: number;
  fileId?: number;
  beneficiary?: string;
  representative?: string;
  issue_title?: string;
  issue_description?: string;
  mission_area?: string;
  specialty_field?: string;
  issue_origin?: string;
  proposed_execution_path?: string;
  frequency?: string;
  financial_value?: string;
  key_requirements?: string;
  limitations?: string;
  technical_solution?: string;
  related_projects?: string;
  proposed_product?: string;
  issue_support?: string;
  analyst_evaluator?: string;
  keywords?: string;
}

export function EditRFPSidebar({
  open,
  onOpenChange,
  selected,
}: EditRFPSidebarProps) {
  const form = useForm<RFPFormValues>({
    resolver: zodResolver(rfpRequestSchema),
  });

  const {
    data,
    isPending: getGetExplorerRfpByIdLoading,
    isSuccess,
  } = useGetExplorerRfpById(selected.id, {
    enabled: open,
    queryKey: ['explorerRfpById', selected.id],
  });

  const { data: fields = [], isPending: explorerRfpFieldsIsPending } =
    useExplorerRfpFields(
      {},
      { queryKey: ['explorerRfpFields', {}], enabled: isSuccess }
    );

  const queryClient = useQueryClient();

  useEffect(() => {
    if (data && fields && selected && form.getValues('info') !== data.info) {
      form.reset({
        info: data.info || '',
        RFP_field_id: (data as any).rfpField?.id || -1,
        beneficiary: data.beneficiary || '',
        representative: data.representative || '',
        issue_title: data.issueTitle || '',
        issue_description: data.issueDescription || '',
        mission_area: data.missionArea || '',
        specialty_field: data.specialtyField || '',
        issue_origin: data.issueOrigin || '',
        proposed_execution_path: data.proposedExecutionPath || '',
        frequency: data.frequency || '',
        financial_value: data.financialValue || '',
        key_requirements: data.keyRequirements || '',
        limitations: data.limitations || '',
        technical_solution: data.technicalSolution || '',
        related_projects: data.relatedProjects || '',
        proposed_product: data.proposedProduct || '',
        issue_support: data.issueSupport || '',
        analyst_evaluator: data.analystEvaluator || '',
        keywords: data.keywords || '',
        fileId: data.fileId || -1,
      });
    }
  }, [data, fields, selected, form, isSuccess]);

  const { mutateAsync, isPending } = useEditExplorerRfp();

  const handleClose = () => {
    queryClient.removeQueries({ queryKey: ['explorerRfpById', selected.id] });
    onOpenChange(false);
    form.reset();
  };

  const onSubmit = async (formData: RFPFormValues) => {
    try {
      await mutateAsync({
        rfpId: selected.id,
        payload: {
          ...formData,
        },
      });
      toast.success('RFP با موفقیت به‌روزرسانی شد');
      handleClose();
      queryClient.invalidateQueries({ queryKey: ['explorerRfps'] });
    } catch {
      toast.error('خطا در ویرایش RFP');
    }
  };

  const isLoading =
    getGetExplorerRfpByIdLoading ||
    !data ||
    explorerRfpFieldsIsPending ||
    !fields;

  return (
    <Suspense fallback={<RFPSidebarSkeleton />}>
      <FormProvider {...form}>
        <Sidebar
          open={open}
          onOpenChange={handleClose}
          title="ویرایش RFP"
          onSubmit={form.handleSubmit(onSubmit)}
          isLoading={isPending}
        >
          {isLoading ? (
            <RFPSidebarSkeleton />
          ) : (
            <RfpForm fields={fields} form={form} onSubmit={onSubmit} />
          )}
        </Sidebar>
      </FormProvider>
    </Suspense>
  );
}
