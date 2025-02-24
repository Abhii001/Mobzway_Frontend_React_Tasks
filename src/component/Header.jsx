import { Link } from "react-router-dom";
const Header = () => {
    return (
        <>
            <Link to={"/"}>
                <header className="bg-blue-600 text-white text-center py-4 mb-4">
                    <h1 className="text-3xl font-bold">React Task </h1>
                </header>
            </Link>
        </>
    );
};

export default Header;
