async function getData(query) {
  if (!query){
    const res = await fetch('http://localhost:3000/api/sparql ', {
      next: {
        revalidate: 0
      }
    })
    return res.json()
  } else {
    const res = await fetch('http://localhost:3000/api/sparql?query=' + query, {
      next: {
        revalidate: 0
      }
    })
    return res.json()
  }
}

export default async function Home({params, searchParams}) {
  const lib = await getData(searchParams.query)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col gap-8 items-center">
        <form className=" w-1/2" method="get">
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path className="stroke-current stroke-2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="search" name="query" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
        </form>
        <table className="border-collapse border border-slate-400">
          <thead>
            <tr>
              <th className="border border-slate-300">Book</th>
              <th className="border border-slate-300">Title</th>
              <th className="border border-slate-300">Author</th>
              <th className="border border-slate-300">ISBN</th>
              <th className="border border-slate-300">Year</th>
              <th className="border border-slate-300">Publisher</th>
              <th className="border border-slate-300">Subjects</th>
              <th className="border border-slate-300">Collection</th>
              <th className="border border-slate-300">Location</th>
              <th className="border border-slate-300">Report Date</th>
              <th className="border border-slate-300">Count</th>
            </tr>
          </thead>
          <tbody>
            {
              lib.map(item => {
                return (
                  <tr key={item.book.value}>
                    <td className="border border-slate-300">
                      {item.book.value}
                    </td>
                    <td className="border border-slate-300">
                      {item.title.value}
                    </td>
                    <td className="border border-slate-300">
                      {item.author.value}
                    </td>
                    <td className="border border-slate-300">
                      {item.isbn.value}
                    </td>
                    <td className="border border-slate-300">
                      {item.year.value}
                    </td>
                    <td className="border border-slate-300">
                      {item.publisher.value}
                    </td>
                    <td className="border border-slate-300">
                      {item.subjects.value}
                    </td>
                    <td className="border border-slate-300">
                      {item.collection.value}
                    </td>
                    <td className="border border-slate-300">
                      {item.location.value}
                    </td>
                    <td className="border border-slate-300">
                      {item.reportdate.value}
                    </td>
                    <td className="border border-slate-300">
                      {item.count.value}
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </main>
  );
}
