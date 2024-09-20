const Dashboard = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder para los gráficos */}
        <div className="bg-white p-4 shadow-md rounded-lg">Gráfico 1</div>
        <div className="bg-white p-4 shadow-md rounded-lg">Gráfico 2</div>
        <div className="bg-white p-4 shadow-md rounded-lg">Gráfico 3</div>
      </div>
    </div>
  );
};

export default Dashboard;
