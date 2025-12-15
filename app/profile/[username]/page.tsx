import ProfileComponent from '../...UI/profile';

export default async function ProfilePage({ params }: { params: { username: string } }) {
  const username = (await params).username;
  return <ProfileComponent username={username} />;
}
