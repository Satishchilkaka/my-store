import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { parse } from 'cookie';

const withSession = <P extends Record<string, unknown>>(handler: GetServerSideProps<P>) =>
  async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parse(context.req.headers.cookie || '');
    const token = cookies.token || '';

    if (!token) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    // Continue with the handler function
    return handler(context);
  };

export default withSession;
