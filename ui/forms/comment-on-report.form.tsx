import { Button } from '../components/button';

interface Props {
  reportID: number;
}

export default function CommentOnReportForm({ reportID }: Props) {
  return (
    <div>
      <div className="flex gap-2">
        <Button>تایید گزارش‌کار</Button>
        <Button variant="destructive">رد گزارش‌کار</Button>
      </div>
    </div>
  );
}
