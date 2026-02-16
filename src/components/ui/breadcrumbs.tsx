import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const routeNameMap: Record<string, string> = {
    buyer: "Buyer",
    seller: "Seller",
    dashboard: "Dashboard",
    documents: "Data Room",
    "data-room-ready": "Data Room Preview",
    calendar: "Calendar",
    messages: "Messages",
    settings: "Settings",
    advisory: "Advisory",
    support: "Support",
    valuation: "Valuation",
    "marketing-prep": "Marketing Prep",
    "go-to-market": "Go to Market",
    negotiations: "Negotiations",
    closing: "Closing",
};

export function Breadcrumbs() {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    // Don't show breadcrumbs on root if you are just there (though in this app dashboard seems to be main)
    if (pathnames.length === 0) return null;

    return (
        <nav className="flex items-center text-sm text-gray-500">
            <Link
                to="/"
                className="flex items-center hover:text-white transition-colors"
                title="Home"
            >
                <Home className="h-4 w-4" />
            </Link>
            {pathnames.map((value, index) => {
                const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                const isLast = index === pathnames.length - 1;
                const name = routeNameMap[value] || value.charAt(0).toUpperCase() + value.slice(1);

                return (
                    <div key={to} className="flex items-center">
                        <ChevronRight className="h-4 w-4 mx-2 text-gray-600" />
                        {isLast ? (
                            <span className="font-medium text-white">{name}</span>
                        ) : (
                            <Link
                                to={to}
                                className="hover:text-white transition-colors"
                            >
                                {name}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
