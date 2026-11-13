import { redirect } from 'next/navigation';

export default function LoginPageRedirect() {
  redirect('/patient-portal/login');
}
