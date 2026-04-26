import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import "./SectionHeader.css";

export default function SectionHeader({ title, subtitle, link, linkLabel = "View All" }: {
  title: string;
  subtitle?: string;
  link?: string;
  linkLabel?: string;
}) {
  return (
    <div className="section-header">
      <div>
        <h2 className="section-header__title">{title}</h2>
        {subtitle && <p className="section-header__subtitle">{subtitle}</p>}
      </div>
      {link && (
        <Link to={link} className="section-header__link">
          {linkLabel} <ChevronRight className="section-header__link-icon" />
        </Link>
      )}
    </div>
  );
}
