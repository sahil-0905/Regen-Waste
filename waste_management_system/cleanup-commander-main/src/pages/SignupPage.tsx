
import Layout from '@/components/layout/Layout';
import SignupForm from '@/components/auth/SignupForm';

const SignupPage = () => {
  return (
    <Layout>
      <div className="py-10 md:py-16">
        <SignupForm />
      </div>
    </Layout>
  );
};

export default SignupPage;
