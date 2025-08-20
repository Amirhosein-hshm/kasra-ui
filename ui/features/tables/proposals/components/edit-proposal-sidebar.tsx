import { useEditUserProposal, useUserProposal } from '@/lib/hooks';
import { ProposalResponse } from '@/lib/types';
import { FileUpload } from '@/ui/components/file-upload';
import { Sidebar } from '@/ui/components/sidebar/sidebar';
import FileDownloadLink from '@/ui/features/file-download/FileDownloadLink';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconX } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  ProposalUpdateFormValues,
  proposalUpdateSchema,
} from './edit-proposal-validation';
import { EditProposalSidebarSkeleton } from './loading/EditProposalSidebarSkeleto';
import { PersianDatePicker } from '@/ui/components/date-picker/date-picker';
import { FormInput } from '@/ui/components/input/input'; // Add this import

interface ProposalSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selected?: ProposalResponse | null;
}

export function EditProposalSideBar({
  open,
  onOpenChange,
  selected,
}: ProposalSidebarProps) {
  const form = useForm<ProposalUpdateFormValues>({
    resolver: zodResolver(proposalUpdateSchema),
  });

  const [disableUpdate, setDisableUpdate] = useState(false);
  const [fileId, setFileId] = useState<number | null>(null);

  const { data, isLoading } = useUserProposal(selected?.id ?? 0, {
    enabled: !!selected?.id,
    queryKey: ['userProposal', selected?.id],
  });

  useEffect(() => {
    if (data) {
      form.reset({
        startAt: data.startAt ? new Date(data.startAt) : undefined,
        endAt: data.endAt ? new Date(data.endAt) : undefined,
        applicantName: data.applicantName || '',
        contactNumber: data.contactNumber || '',
        education: data.education || '',
        expertise: data.expertise || '',
        projectDuration: data.projectDuration || '',
        projectGoals: data.projectGoals || '',
        projectImportance: data.projectImportance || '',
        technicalDetails: data.technicalDetails || '',
        productFeatures: data.productFeatures || '',
        similarProducts: data.similarProducts || '',
        projectOutcomes: data.projectOutcomes || '',
        projectInnovation: data.projectInnovation || '',
        projectRisks: data.projectRisks || '',
      });
      if (data.fileId) {
        setFileId(data.fileId);
        setDisableUpdate(true);
      }
    }
  }, [data, form]);

  const removeExistingFile = () => {
    if (!disableUpdate) setFileId(null);
  };

  const { mutateAsync, isPending } = useEditUserProposal();

  const queryClient = useQueryClient();

  const onSubmit = async (formData: ProposalUpdateFormValues) => {
    if (disableUpdate) return;
    if (!fileId) {
      toast.error('بارگذاری فایل پروپوزال اجباری است');
      return;
    }
    try {
      await mutateAsync({
        proposalId: selected?.id ?? 0,
        data: {
          ...formData,
          startAt: formData.startAt.toISOString(),
          endAt: formData.endAt.toISOString(),
          fileId,
        },
      });
      onOpenChange(false);
      queryClient.invalidateQueries();
      form.reset();
      toast.success('پروپوزال با موفقیت تکمیل شد');
    } catch (e) {
      toast.error('خطا در تکمیل پروپوزال');
    }
  };

  const handleUploadComplete = (val: any) => {
    toast.success('فایل با موفقیت بارگذاری شد');
    setFileId(val.id);
  };

  useEffect(() => {
    form.reset();
    setFileId(null);
  }, [selected, form]);

  return (
    <FormProvider {...form}>
      <Sidebar
        open={open}
        onOpenChange={onOpenChange}
        title={`پروپوزال ${selected?.id ?? ''}`}
        description=""
        onSubmit={form.handleSubmit(onSubmit)}
        isLoading={isPending}
      >
        {!isLoading ? (
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Date Pickers */}
            <div className="flex flex-col gap-1">
              <div className="text-red-400 font-light text-sm">
                {form.formState.errors.startAt?.message}
              </div>
              <div className="flex justify-between items-center gap-2">
                <label className="text-nowrap">تاریخ شروع: </label>
                <PersianDatePicker
                  initialValue={form.watch('startAt')}
                  onChange={(date) => {
                    if (disableUpdate) return;
                    form.setValue('startAt', date.toDate());
                  }}
                  disabled={disableUpdate}
                />
              </div>
            </div>

            <div>
              <div className="text-red-400 font-light text-sm">
                {form.formState.errors.endAt?.message}
              </div>
              <div className="flex justify-between items-center gap-2">
                <label className="text-nowrap">تاریخ پایان: </label>
                <PersianDatePicker
                  initialValue={form.watch('endAt')}
                  onChange={(date) => {
                    if (disableUpdate) return;
                    form.setValue('endAt', date.toDate());
                  }}
                  disabled={disableUpdate}
                />
              </div>
            </div>

            {/* File Upload Section */}
            {fileId ? (
              <div className="relative mt-2 p-3 bg-gray-50 dark:bg-neutral-900 rounded-md">
                <FileDownloadLink id={fileId!} />
                <button
                  type="button"
                  onClick={removeExistingFile}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  title="حذف فایل"
                >
                  <IconX size={14} />
                </button>
              </div>
            ) : (
              <FileUpload
                onUploadComplete={handleUploadComplete}
                title="بارگذاری فایل پروپوزال"
              />
            )}

            {/* Applicant Information */}
            <FormInput
              name="applicantName"
              label="نام متقاضی"
              placeholder="نام کامل متقاضی را وارد کنید"
              inputOptions={{
                disabled: disableUpdate,
              }}
            />

            <FormInput
              name="contactNumber"
              label="شماره تماس"
              placeholder="شماره تماس را وارد کنید"
              inputOptions={{
                disabled: disableUpdate,
              }}
            />

            <FormInput
              name="education"
              label="تحصیلات"
              placeholder="مدرک تحصیلی را وارد کنید"
              inputOptions={{
                disabled: disableUpdate,
              }}
            />

            <FormInput
              multiline
              name="expertise"
              label="تخصص‌ها"
              placeholder="تخصص‌های مرتبط را وارد کنید"
              rows={2}
              textareaOptions={{
                disabled: disableUpdate,
              }}
            />

            {/* Project Details */}
            <FormInput
              name="projectDuration"
              label="مدت زمان پروژه"
              placeholder="مدت زمان اجرای پروژه را وارد کنید"
              inputOptions={{
                disabled: disableUpdate,
              }}
            />

            <FormInput
              multiline
              name="projectGoals"
              label="اهداف پروژه"
              placeholder="اهداف اصلی پروژه را وارد کنید"
              rows={2}
              textareaOptions={{
                disabled: disableUpdate,
              }}
            />

            <FormInput
              multiline
              name="projectImportance"
              label="اهمیت پروژه"
              placeholder="اهمیت و ضرورت اجرای پروژه را وارد کنید"
              rows={2}
              textareaOptions={{
                disabled: disableUpdate,
              }}
            />

            {/* Technical Information */}
            <FormInput
              multiline
              name="technicalDetails"
              label="جزئیات فنی"
              placeholder="جزئیات فنی پروژه را وارد کنید"
              rows={3}
              textareaOptions={{
                disabled: disableUpdate,
              }}
            />

            <FormInput
              multiline
              name="productFeatures"
              label="ویژگی‌های محصول"
              placeholder="ویژگی‌های محصول نهایی را وارد کنید"
              rows={2}
              textareaOptions={{
                disabled: disableUpdate,
              }}
            />

            <FormInput
              multiline
              name="similarProducts"
              label="محصولات مشابه"
              placeholder="محصولات مشابه موجود در بازار را وارد کنید"
              rows={2}
              textareaOptions={{
                disabled: disableUpdate,
              }}
            />

            {/* Project Outcomes */}
            <FormInput
              multiline
              name="projectOutcomes"
              label="دستاوردهای پروژه"
              placeholder="دستاوردهای مورد انتظار از پروژه را وارد کنید"
              rows={2}
              textareaOptions={{
                disabled: disableUpdate,
              }}
            />

            <FormInput
              multiline
              name="projectInnovation"
              label="نوآوری پروژه"
              placeholder="نوآوری‌های پروژه را وارد کنید"
              rows={2}
              textareaOptions={{
                disabled: disableUpdate,
              }}
            />

            <FormInput
              multiline
              name="projectRisks"
              label="ریسک‌های پروژه"
              placeholder="ریسک‌های احتمالی و راه‌حل‌های آن را وارد کنید"
              rows={2}
              textareaOptions={{
                disabled: disableUpdate,
              }}
            />
          </form>
        ) : (
          <EditProposalSidebarSkeleton />
        )}
      </Sidebar>
    </FormProvider>
  );
}
