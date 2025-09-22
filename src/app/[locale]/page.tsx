'use client';

import { auth } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Loader } from '@/components/loader';
import HeroSection from '@/components/main-sections/hero';
import FeaturesSection from '@/components/main-sections/features';
import TeamSection from '@/components/main-sections/team';
import ActionSection from '@/components/main-sections/action';
import CourseSection from '@/components/main-sections/course';

export default function Page() {
  const [user, loading] = useAuthState(auth);

  if (loading || (user && !user.displayName)) {
    return <Loader />;
  }

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <TeamSection />
      <CourseSection />
      <ActionSection />
    </>
  );
}
