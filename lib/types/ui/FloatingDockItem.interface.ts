export default interface FloatingDockItem {
  title: string;
  icon: React.ReactNode;
  action: string | (() => void);
  isActive: boolean;
}
