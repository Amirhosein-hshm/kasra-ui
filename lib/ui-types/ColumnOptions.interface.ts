export default interface ColumnOptions<T> {
  deactivateSelection?: boolean;
  onView?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onOpenReportDetail?: (item: T) => void;
}
