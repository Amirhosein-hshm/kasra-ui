import { useMeStore } from '@/lib/stores/me.stores';
import { UserType } from '@/lib/types/UserType.enum';
import { Badge } from '@/ui/components/badge';
import { FileDownload } from '@/ui/components/file-download';
import CommentOnReportDialog from '@/ui/features/dialogs/comment-on-report.dialog';

interface Props {
  reportID: number;
  projectID: number;
  fileIDs: {
    word: number;
    pdf: number;
    powerpoint: number;
  };
  comment: string;
  state: number;
}

export default function SingleReportPage({
  state,
  reportID,
  projectID,
  fileIDs,
  comment,
}: Props) {
  const { user } = useMeStore();
  const isSupervisor = user?.userTypeId === UserType.Supervisor;

  return (
    <div className="mt-4 flex flex-col gap-2">
      <div>
        <strong>پروژه:</strong> <Badge>{projectID}</Badge>
      </div>

      <div>
        <strong>وضعیت:</strong>{' '}
        {state === 1 ? (
          <Badge
            variant="secondary"
            className="bg-teal-500 text-white dark:bg-teal-600"
          >
            تایید شده
          </Badge>
        ) : state === 2 ? (
          <Badge variant="destructive">رد شده</Badge>
        ) : (
          <Badge>در انتظار بررسی</Badge>
        )}
      </div>

      <div className="flex gap-2">
        <strong>فایل های گزارش:</strong>
        <FileDownload id={fileIDs.pdf}>بارگیری فایل pdf</FileDownload>
        <FileDownload id={fileIDs.word}>بارگیری فایل word</FileDownload>
        <FileDownload id={fileIDs.powerpoint}>
          بارگیری فایل powerpoint
        </FileDownload>
      </div>

      {/* TODO: approve/reject report by supervisor */}
      {isSupervisor && <CommentOnReportDialog reportID={reportID} />}

      {comment && comment.length > 0 && (
        <div>
          <strong>نظر:</strong>
          <p>{comment}</p>
        </div>
      )}
    </div>
  );
}
