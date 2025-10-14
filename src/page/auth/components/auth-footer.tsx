import { Link } from "react-router";

interface Props {
  title: string;
  subtitle: string;
  url: string;
}

export const AuthFooter = ({ title, subtitle, url }: Props) => {
  return (
    <div className="flex items-center justify-between border-t border-gray-400 pt-6 text-sm">
      <button className="text-gray-400 transition-colors hover:text-white">{title}</button>
      <Link to={url} className="text-gray-400 transition-colors hover:text-white">
        {subtitle}
      </Link>
    </div>
  );
};
