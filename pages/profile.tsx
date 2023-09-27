import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { TCustomSession } from './api/auth/[...nextauth]';

export default function Profile() {
  return <div>Profile</div>;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session: TCustomSession = (await getSession({
    req
  })) as unknown as TCustomSession;
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: `/${session?.username}`
    }
  };
};
