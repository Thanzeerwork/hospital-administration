import { redirect } from 'next/navigation';

export default function SignupPageRedirect() {
  redirect('/patient-portal/signup');
}
