import { Image } from '@chakra-ui/react';
import { isValidMotionProp, motion } from 'framer-motion';
import { ComponentPropsWithoutRef, forwardRef, RefObject } from 'react';

const MotionImage = motion.custom(
  forwardRef<HTMLImageElement, ComponentPropsWithoutRef<typeof Image>>(function MotionImage(
    props,
    ref,
  ) {
    const chakraProps = Object.fromEntries(
      Object.entries(props).filter(([key]) => !isValidMotionProp(key)),
    );

    return <Image ref={ref} {...chakraProps} />;
  }),
);

export function Sticker({
  name,
  size = 64,
  container,
  setDragging,
  ...delegated
}: {
  name: string;
  size: number;
  container: RefObject<HTMLElement>;
  setDragging: (isDragging: boolean) => void;
} & ComponentPropsWithoutRef<typeof MotionImage>) {
  return (
    <MotionImage
      {...delegated}
      src={`/images/${name}.png`}
      height={size}
      cursor="pointer"
      filter="drop-shadow(1px 1px 2px rgba(0,0,0,0.3))"
      pointerEvents="auto"
      _focus={{ outline: 'none' }}
      drag
      dragConstraints={container}
      dragElastic={1}
      whileHover={{ scale: 1.1 }}
      onTouchStartCapture={() => setDragging(true)}
      onTouchEndCapture={() => setDragging(false)}
    />
  );
}
