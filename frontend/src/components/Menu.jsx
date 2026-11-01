import fr from "../i18n/fr";
import "../dashboard.css";
import logo from "../assets/logo.png";

const Svg = ({ children }) => (
  <svg
    className="menu-icone"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

const PAGES = [
  {
    id: "tableau",
    icone: (
      <Svg>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <path d="M9 22V12h6v10" />
      </Svg>
    ),
  },
  {
    id: "environnement",
    icone: (
      <Svg>
        <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
      </Svg>
    ),
  },
  {
    id: "activite", // alvéole de ruche
    icone: (
      <Svg>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <path d="M12 8v8M8.5 10v4M15.5 10v4" />
      </Svg>
    ),
  },
  {
    id: "poids",
    icone: (
      <Svg>
        <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
        <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
        <path d="M7 21h10M12 3v18M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
      </Svg>
    ),
  },
  {
    id: "localisation",
    icone: (
      <Svg>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </Svg>
    ),
  },
  {
    id: "systeme",
    icone: (
      <Svg>
        <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" />
      </Svg>
    ),
  },
  {
    id: "alertes",
    icone: (
      <Svg>
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </Svg>
    ),
  },
];

export default function Menu({ pageActive, onNavigate }) {
  return (
    <nav className="menu">
      <div className="menu-entete">
        <img src={logo} alt="Logo Bee Guardian" className="menu-logo" />
        <h1 className="menu-titre">Bee Guardian</h1>
      </div>

      {PAGES.map((page) => (
        <button
          key={page.id}
          className={`menu-bouton ${pageActive === page.id ? "actif" : ""}`}
          onClick={() => onNavigate(page.id)}
        >
          {page.icone}
          <span>{fr.menu[page.id]}</span>
        </button>
      ))}
    </nav>
  );
}