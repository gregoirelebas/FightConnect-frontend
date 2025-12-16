import EventInfos from './...UI/eventInfos';

export default async function EventInfosPage({ params }: { params: { token: string } }) {
  const token = (await params).token;
  return <EventInfos token={token} />;
}
