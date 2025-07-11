interface TSectionTitle {
  title: string;
  description: string;
}
const SectionTitle = ({ title, description }: TSectionTitle) => {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
};

export default SectionTitle;
