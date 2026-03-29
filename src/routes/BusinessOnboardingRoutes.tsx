import { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Spinner from '@/components/Common/Spinner';
import * as urls from 'routes/config';
import OnboardingSecureAuth from '@/pages/Agency/OnboardingForms/AgentReadinessForm/components/OnboardingSecureAuth';
import AgentReadinessForm from '@/pages/Agency/OnboardingForms/AgentReadinessForm';
import OnboardingThankYou from '@/pages/Agency/OnboardingForms/AgentReadinessForm/components/OnboardingThankYou';

export default function BusinessOnboardingRoutes() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path={urls.businessOnboarding.login} element={<OnboardingSecureAuth />} />
        <Route path={urls.businessOnboarding.prerequisitesForm()} element={<AgentReadinessForm />} />
        <Route path={urls.businessOnboarding.submitted} element={<OnboardingThankYou />} />
        <Route path='*' element={<Navigate to={urls.businessOnboarding.login} replace />} />
      </Routes>
    </Suspense>
  );
}
