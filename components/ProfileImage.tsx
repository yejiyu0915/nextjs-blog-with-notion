'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ProfileImage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Image
        src="/images/profile-light.jpg"
        alt="J_Wisdom"
        width={144}
        height={144}
        className="object-cover"
      />
    );
  }

  return (
    <Image
      src={theme === 'dark' ? '/images/profile-dark.jpg' : '/images/profile-light.jpg'}
      alt="J_Wisdom"
      width={144}
      height={144}
      className="object-cover"
    />
  );
}
