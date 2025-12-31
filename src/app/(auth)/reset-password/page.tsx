import ResetPasswordForm from "../../../components/ResetPasswordForm";
import { Suspense } from "react";

export default function ResetPasswordPage() {
  return (
    <div className="p-10">
      <h1 className="text-xl font-semibold text-center mb-5">
        Update Password
      </h1>

      <Suspense fallback={<p className="text-center">Loading...</p>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}

