import { useMeStore } from '@/lib/stores/me.stores';
import { UserType } from '@/lib/types/UserType.enum';
import { Badge } from '@/ui/components/badge';
import { FileDownload } from '@/ui/components/file-download';
import CommentOnReportDialog from '@/ui/features/dialogs/comment-on-report.dialog';
import CommentOnReportForm from '@/ui/forms/comment-on-report.form';
import { use } from 'react';

interface Props {
  reportID: number;
  projectID: number;
  info: string;
  fileIDs: {
    word: number;
    pdf: number;
    powerpoint: number;
  };
  comment: string;
}

export default function SingleReportPage({
  reportID,
  projectID,
  info,
  fileIDs,
  comment,
}: Props) {
  const { user } = useMeStore();
  const isSupervisor = user?.userTypeId === UserType.Supervisor;

  return (
    <div className="mt-4 flex flex-col gap-2">
      <Badge>پروژه {projectID}</Badge>

      <p>{info}</p>

      <div className="flex gap-2">
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
          <h3>نظر:</h3>
          <p>{comment}</p>
        </div>
      )}
    </div>
  );
}
