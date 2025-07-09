import { cn } from '@/lib/utils';
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { IconUpload, IconCheck } from '@tabler/icons-react';
import { useDropzone } from 'react-dropzone';
import { getFile } from '@/lib/services';
import { toast } from 'sonner';

type UploadStatus = 'idle' | 'uploading' | 'done' | 'error';

interface UploadItem {
  file: File;
  progress: number; // 0‒100
  status: UploadStatus;
  serverResult?: unknown;
  error?: unknown;
}

const mainVariant = {
  initial: { x: 0, y: 0 },
  animate: { x: -10, y: -10, opacity: 0.9 },
};
const secondaryVariant = { initial: { opacity: 0 }, animate: { opacity: 1 } };

export const FileUpload = ({
  title,
  onUploadComplete,
}: {
  title?: string;
  onUploadComplete?: (result: unknown, file: File) => void;
}) => {
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startUpload = async (file: File, index: number) => {
    try {
      const result = await getFile().uploadFileWithProgress(
        { file },
        {
          onProgress: (pct) =>
            setUploads((prev) =>
              prev.map((u, i) => (i === index ? { ...u, progress: pct } : u))
            ),
        }
      );
      setUploads((prev) =>
        prev.map((u, i) =>
          i === index
            ? { ...u, progress: 100, status: 'done', serverResult: result }
            : u
        )
      );
      onUploadComplete?.(result, file);
    } catch (err) {
      setUploads((prev) =>
        prev.map((u, i) =>
          i === index ? { ...u, status: 'error', error: err } : u
        )
      );
      toast.error('آپلود ناموفق بود. لطفاً دوباره تلاش کنید.');
    }
  };

  const handleNewFiles = (acceptedFiles: File[]) => {
    if (!acceptedFiles.length) return;

    const newItems: UploadItem[] = acceptedFiles.map((file) => ({
      file,
      progress: 0,
      status: 'uploading',
    }));
    setUploads((prev) => [...prev, ...newItems]);

    newItems.forEach((item, idx) =>
      startUpload(item.file, uploads.length + idx)
    );
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    accept: { 'application/pdf': ['.pdf'] },
    onDrop: handleNewFiles,
    onDropRejected: () => alert('فقط فایل PDF مجاز است.'),
    noClick: true,
  });

  const clickInput = () => fileInputRef.current?.click();

  return (
    <div {...getRootProps()}>
      <motion.div
        onClick={clickInput}
        whileHover="animate"
        className="p-10 group/file rounded-lg cursor-pointer relative overflow-hidden"
      >
        {/* input مخفی */}
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) =>
            e.target.files && handleNewFiles(Array.from(e.target.files))
          }
        />

        {/* عنوان */}
        {title && (
          <p className="relative z-20 font-bold text-neutral-700 dark:text-neutral-300 mb-2">
            {title}
          </p>
        )}

        {/* لیست فایل‌ها */}
        <div className="w-full max-w-xl mx-auto">
          {uploads.map((u, idx) => (
            <motion.div
              key={idx}
              layoutId={`file-${idx}`}
              className={cn(
                'relative bg-white dark:bg-neutral-900 rounded-md shadow-sm p-4 mt-4 flex flex-col gap-2'
              )}
            >
              {/* اطلاعات فایل */}
              <div className="flex justify-between items-center">
                <span className="truncate text-neutral-700 dark:text-neutral-300 max-w-xs">
                  {u.file.name}
                </span>
                <span className="text-sm text-neutral-600 dark:text-neutral-400 shrink-0">
                  {(u.file.size / (1024 * 1024)).toFixed(2)} MB
                </span>
              </div>

              {/* نوع + تاریخ */}
              <div className="flex justify-between items-center text-sm text-neutral-500">
                <span className="bg-gray-100 dark:bg-neutral-800 px-1 py-0.5 rounded">
                  {u.file.type || 'application/pdf'}
                </span>
                <span>
                  {new Date(u.file.lastModified).toLocaleDateString()}
                </span>
              </div>
              {u.status === 'uploading' && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center rounded-md">
                  <svg
                    className="animate-spin h-6 w-6 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  <span className="text-white mt-2">{u.progress}%</span>
                </div>
              )}

              {/* تیک موفق */}
              {u.status === 'done' && (
                <div className="absolute top-2 right-2 text-green-500">
                  <IconCheck size={20} />
                </div>
              )}

              {/* خطا */}
              {u.status === 'error' && (
                <div className="absolute inset-0 bg-red-600/80 flex items-center justify-center text-white rounded-md text-sm">
                  خطا در آپلود
                </div>
              )}
            </motion.div>
          ))}

          {/* کارت Drop در صورت نبود فایل */}
          {!uploads.length && (
            <motion.div
              layoutId="file-upload"
              variants={mainVariant}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative z-40 bg-white dark:bg-neutral-900 flex flex-col items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
            >
              {isDragActive ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-neutral-600 flex flex-col items-center"
                >
                  رها کنید
                  <IconUpload size={16} className="mt-1" />
                </motion.p>
              ) : (
                <IconUpload size={20} className="text-neutral-600" />
              )}
            </motion.div>
          )}

          {/* قاب dashed پشت کارت Drop */}
          {!uploads.length && (
            <motion.div
              variants={secondaryVariant}
              className="absolute border border-dashed border-sky-400 inset-0 opacity-0 rounded-md"
            />
          )}
        </div>
      </motion.div>
    </div>
  );
};
