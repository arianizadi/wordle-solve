import Head from 'next/head'

export async function getStaticProps() {
  const file = new Date().toISOString().slice(0, 10)
  const baseURL = "https://www.nytimes.com/svc/wordle/v2/"
  const res = await fetch(`${baseURL + file}.json`)
  const data = await res.json()

  if (!res.ok) {
    throw new Error("Failed to get file: ")
  }

  return { props: { data } }
}

interface WordleJSON {
  id: Number,
  solution: String,
  print_date: String,
  days_since_launch: Number,
  editor: String
}

export default function Home({ data }: { data: WordleJSON }) {
  return (
    <>
      <Head>
        <title>Wordle Answer Key</title>
        <meta name="description" content="For the lazy wordlers." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-center items-center min-h-screen min-h[-webkit-fill-available] w-screen overflow-hidden">
        <Tile wordle={data} />
      </div>
    </>
  )
}

function Tile({ wordle }: { wordle: WordleJSON }) {
  return (
    <div className="bg-zinc-800 p-10 rounded-lg text-center text-2xl font-bold flex flex-col space-y-5">
      <h1>{wordle.print_date}</h1>
      <h1>{wordle.solution}</h1>
    </div>
  )
}