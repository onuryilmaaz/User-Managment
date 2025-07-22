import { ResetPasswordForm } from "../../../../components/auth/reset-password-form";

interface ResetPasswordPageProps {
  params: {
    token: string;
  };
}

export default function ResetPasswordPage({ params }: ResetPasswordPageProps) {
  return (
    <div className="w-full max-w-md">
      <ResetPasswordForm token={params.token} />
    </div>
  );
}
