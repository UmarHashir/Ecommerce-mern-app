const DashboardStatCard = ({
  title,
  value,
  subtitle,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>

      {subtitle && (
        <p className="text-xs text-gray-400 mt-3">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default DashboardStatCard;