import Navbar from "../common/Navbar";

const StudentLayout = ({ title, children }) => {
  return (
    <div className="min-h-screen bg-[#F4F7FA]  flex">
      
      {/* Sidebar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 p-10 ">
        {title && (
          <h1 className="text-3xl font-semibold text-[#142C52] mb-6">
            {title}
          </h1>
        )}
        {children}
      </main>

    </div>
  );
};

export default StudentLayout;
