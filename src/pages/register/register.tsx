import { RegisterUI } from '@ui-pages';
import { FC, SyntheticEvent, useState } from 'react';
import { registerUser, selectUserError } from '../../services/slices/userSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const error = useSelector(selectUserError);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser({ email, password, name: userName }));
  };

  return (
    <RegisterUI
      errorText={error || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
