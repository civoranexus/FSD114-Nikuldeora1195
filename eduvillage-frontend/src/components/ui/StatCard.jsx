const StatCard = ({ label, value }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <p className="text-sm text-[#5B74A3]">{label}</p>
      <h2 className="text-3xl font-bold text-[#071426] mt-2">
        {value}
      </h2>
    </div>
  );
};

export default StatCard;
