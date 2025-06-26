import { cn } from '@/lib/utils';
import { IconDownload } from '@tabler/icons-react';
import { motion } from 'motion/react';

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: -10,
    y: -10,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

const FileDownload = ({
  onClick,
  title,
}: {
  onClick?: () => void;
  title?: string;
}) => {
  return (
    <div>
      <motion.div
        onClick={onClick}
        whileHover="animate"
        className="w-fit p-10 group/file block rounded-lg cursor-pointer relative overflow-hidden"
      >
        <div className="w-40 flex flex-col items-center">
          {title && (
            <p className="relative z-20 font-sans font-bold text-neutral-700 dark:text-neutral-300 text-base">
              {title}
            </p>
          )}
          <div className="relative w-full mt-1 max-w-xl mx-auto">
            <motion.div
              layoutId="file-upload"
              variants={mainVariant}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }}
              className={cn(
                'relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md',
                'shadow-[0px_10px_50px_rgba(0,0,0,0.1)]'
              )}
            >
              <IconDownload size={54} />
            </motion.div>

            <motion.div
              variants={secondaryVariant}
              className="absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
            ></motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FileDownload;
