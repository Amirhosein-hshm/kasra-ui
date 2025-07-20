import { Badge } from '@/ui/components/badge';
import FileDownload from '@/ui/components/file-download';
import Link from 'next/link';

export default function SingleReportPage() {
  return (
    <div className="mt-4 flex flex-col gap-2">
      <Badge>پروژه ۱</Badge>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos
        facilis ipsa doloremque molestias eaque cupiditate dolor eius fuga ab a
        facere, aut, architecto voluptate, nisi temporibus quisquam asperiores
        excepturi dicta pariatur in hic possimus ipsam? Corporis, vel!
        Temporibus pariatur cupiditate dolore dolorum necessitatibus nihil!
        Ducimus eius aut unde omnis maxime doloribus, pariatur cum numquam error
        fugit laudantium, veritatis eos facere nisi consectetur dolor placeat
        vero repellat consequuntur tempora sequi. Quaerat velit aspernatur harum
        consequuntur impedit porro explicabo amet. Fuga vero beatae repellendus
        rem temporibus magnam minima accusamus, quae perspiciatis provident
        doloremque at corrupti iste consequuntur a. Voluptate veniam illum
        adipisci!
      </p>

      <div className="flex gap-2">
        <Link href={''}>
          <FileDownload title="بارگیری پروپوزال" />
        </Link>
      </div>
    </div>
  );
}
