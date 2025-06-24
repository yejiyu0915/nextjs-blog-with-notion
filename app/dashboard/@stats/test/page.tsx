export default async function TestPage() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return <div>Stats TestPage</div>;
}
