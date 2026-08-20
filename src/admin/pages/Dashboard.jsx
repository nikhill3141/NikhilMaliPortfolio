const Dashboard = () => {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <p className="text-sm font-medium text-zinc-500">
          Wednesday, August 19
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-950">
          Good morning, Nikhil
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          Here's what's happening with your content.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <p className="text-sm text-zinc-500">Total posts</p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">
            24
          </p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <p className="text-sm text-zinc-500">Published</p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">
            18
          </p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <p className="text-sm text-zinc-500">Drafts</p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">
            6
          </p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <p className="text-sm text-zinc-500">Views</p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">
            12.4k
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
