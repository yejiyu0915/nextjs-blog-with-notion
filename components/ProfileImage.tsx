'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';

export function ProfileImage() {
  const { theme } = useTheme();
  return (
    <Image
      src={theme === 'light' ? '/images/profile-light.jpg' : '/images/profile-dark.jpg'}
      alt="J_Wisdom"
      width={144}
      height={144}
      className="object-cover"
    />
  );
}
