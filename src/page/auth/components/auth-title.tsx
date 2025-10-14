interface Props {
  title: string;
  subtitle: string;
}

export const AuthTitle = ({ title, subtitle }: Props) => {
  return (
    <div className="space-y-2">
      <h1 className="text-4xl font-bold text-white"> {title} </h1>
      <p className="text-gray-400"> {subtitle} </p>
    </div>
  );
};
