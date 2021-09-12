import { useRouter } from 'next/router';
import Head from 'next/head';
import NewMeetupForm from '../components/meetups/NewMeetupForm';

const NewMeetup = () => {
  const router = useRouter();

  const addMeetupHandler = async (data) => {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    router.push('/');
  };
  return (
    <>
      <Head>
        <title>Create a new meetup</title>
        <meta
          name='description'
          content='create your own meetup based on your availability'
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
};

export default NewMeetup;
