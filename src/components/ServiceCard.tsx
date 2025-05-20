type ServiceCardProps = {
  title: string;
  description: string;
  icon?: React.ReactNode;
};

export default function ServiceCard({ title, description, icon }: ServiceCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-all border border-gray-100">
      {icon && <div className="text-blue-500 mb-3 text-3xl">{icon}</div>}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
