import { useMutation } from '@apollo/react-hooks';
import { SIGN_UP } from '../graphql/mutations';
import useSignIn from './useSignIn';

const useSignUp = () => {

  const [mutate, result] = useMutation(SIGN_UP);
  const [signIn] = useSignIn();

  const signUp = async ({ username, password }) => {
    const user = { username, password };

    await mutate({ variables: { user } });

    return await signIn({username, password});
  };

  return [signUp, result];
};

export default useSignUp;