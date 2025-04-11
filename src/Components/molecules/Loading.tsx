const Loading = () => {
    return (
        <div className="flex items-center justify-center dark:bg-primary-dark dark:min-h-screen">
            <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin dark:border-white" />
                <h1 className="text-lg font-semibold text-gray-700 dark:text-white">Loading...</h1>
            </div>
        </div>
    );
};

export default Loading;