import { RFPFieldResponse } from '@/lib/types';
import { RFPFormValues } from '@/lib/validations/rfpFormValidaton';
import { FileUpload } from '@/ui/components/file-upload';
import { FormInput } from '@/ui/components/input/input';
import { FormSelect } from '@/ui/components/select/select';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

interface Props {
  fields: RFPFieldResponse[];
  form: UseFormReturn<RFPFormValues>;
  onSubmit: (data: RFPFormValues) => void;
}

export default function RfpForm({ fields, form, onSubmit }: Props) {
  const onUploadComplete = (val: any) => {
    toast.success('فایل با موفقیت بارگذاری شد');
    form.setValue('fileId', val.id);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {/* Basic Information */}
      <FormInput
        name="info"
        label="عنوان"
        placeholder="عنوان RFP را وارد کنید"
      />

      {/* FIXME: flaky refill on edit form */}
      <FormSelect
        name="RFP_field_id"
        placeholder="دسته بندی RFP را انتخاب کنید"
        label="دسته بندی RFP"
        options={fields.map((u) => ({
          value: u.id,
          label: u.title,
        }))}
      />

      {/* Issue Details */}
      <FormInput
        name="issue_title"
        label="عنوان مسئله/ فرصت"
        placeholder="عنوان مسئله/ فرصت را وارد کنید"
      />

      <FormInput
        multiline
        name="issue_description"
        label="شرح مختصر مسئله/ فرصت‌"
        placeholder="توضیحات کامل مسئله را وارد کنید"
        rows={3}
      />

      {/* Stakeholders */}
      <FormInput
        name="beneficiary"
        label="کاربر بهره بردار (شخصیت حقوقی)"
        placeholder="کاربر بهره بردار را وارد کنید"
      />

      <FormInput
        name="representative"
        label="نماینده بهره بردار (شخص حقیقی)"
        placeholder="نماینده بهره بردار را وارد کنید"
      />

      {/* Categorization */}
      <FormInput
        name="mission_area"
        label="حوزه ماموریتی"
        placeholder="حوزه ماموریت را وارد کنید"
      />

      <FormInput
        name="specialty_field"
        label="رشته و گرایش تخصصی"
        placeholder="رشته و گرایش تخصصی را وارد کنید"
      />

      <FormInput
        name="issue_origin"
        label="توضیحات درباره منشأ یافتن مسئله/ فرصت"
        placeholder="توضیحات درباره منشأ یافتن مسئله/ فرصت را وارد کنید"
      />

      {/* Execution & Financial */}
      <FormInput
        multiline
        name="proposed_execution_path"
        label="توضیحات درباره مسیر پیشنهادی اجرا"
        placeholder="توضیحات درباره مسیر پیشنهادی اجرا را وارد کنید"
        rows={2}
      />

      <FormInput
        name="frequency"
        label="فراوانی/ حجم نیاز"
        placeholder="فراوانی/ حجم نیاز را وارد کنید"
      />

      <FormInput
        name="financial_value"
        label="ارزش مالی حل مسئله"
        placeholder="ارزش مالی حل مسئله را وارد کنید"
      />

      {/* Requirements & Constraints */}
      <FormInput
        multiline
        name="key_requirements"
        label="نیازمندی‌های کلیدی"
        placeholder="نیازمندی‌های کلیدی را وارد کنید"
        rows={2}
      />

      <FormInput
        multiline
        name="limitations"
        label="محدودیت ها و قیود"
        placeholder="محدودیت ها و قیود را وارد کنید"
        rows={2}
      />

      {/* Technical Details */}
      <FormInput
        multiline
        name="technical_solution"
        label="راه حل فعلی"
        placeholder="راه حل فعلی پیشنهادی را وارد کنید"
        rows={3}
      />

      <FormInput
        multiline
        name="related_projects"
        label="برنامه ها، پروژه ها و اقدامات مرتبط"
        placeholder="برنامه ها، پروژه ها و اقدامات مرتبط را وارد کنید"
        rows={2}
      />

      <FormInput
        multiline
        name="proposed_product"
        label="محصول/ راه حل پیشنهادی"
        placeholder="محصول/ راه حل پیشنهادی را وارد کنید"
        rows={2}
      />

      {/* Support & Evaluation */}
      <FormInput
        multiline
        name="issue_support"
        label="نحوه حمایت بهره‌بردار از حل مسئله"
        placeholder="اطلاعات نحوه حمایت بهره‌بردار از حل مسئله را وارد کنید"
        rows={2}
      />

      <FormInput
        name="analyst_evaluator"
        label="تحلیل کارگزار کاشف"
        placeholder="تحلیل کارگزار کاشف یا ارزیاب را وارد کنید"
      />

      {/* Metadata */}
      <FormInput
        name="keywords"
        label="کلمات کلیدی"
        placeholder="کلمات کلیدی را وارد کنید (با کاما جدا کنید)"
      />

      {/* File Upload */}
      <FileUpload
        onUploadComplete={onUploadComplete}
        title="بارگذاری فایل RFP"
      />
    </form>
  );
}
