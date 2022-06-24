type TodoContainerProps = {
  children: React.ReactNode;
};

export const TodoContainer = ({ children }: TodoContainerProps) => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-r from-teal-400">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-xl">
        {children}
      </div>
    </div>
  );
};
