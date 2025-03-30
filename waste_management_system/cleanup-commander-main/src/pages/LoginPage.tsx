
import Layout from '@/components/layout/Layout';
import LoginForm from '@/components/auth/LoginForm';

const LoginPage = () => {
  return (
    <Layout>
      <div className="py-10 md:py-16">
        <LoginForm />
      </div>
    </Layout>
  );
};

export default LoginPage;
