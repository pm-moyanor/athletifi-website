export default function DashboardFetchError({
  message,
}: {
  message: string | null;
}) {
  return (
    <div className="flex h-700 justify-center items-center">
      <div className="flex justify-center items-center h-200 w-315 md:w-600 px-3 bg-offwhite bg-opacity-15 rounded-10">
        <div className="text-red-500 text-center">
          <p className="font-bold">{message}</p>
          <p className="mt-4">
            If the problem persists please reach out to{' '}
            <a
              href="mailto: support@athleti.fi ?subject=[Support Request] Data fetch issue with dashboard"
              className="hover:text-skyblue hover:underline"
            >
              support@athleti.fi
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
