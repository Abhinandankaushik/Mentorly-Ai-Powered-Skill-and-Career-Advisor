const NavBar = () => {
    return (
        <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[80%] bg-blue-900 text-white shadow-lg rounded-2xl px-6 py-3 z-50">
            <div className="flex justify-between items-center">

                <div href="/" className="flex items-center space-x-3">
                    <img
                        src="/weblogo.jpeg"
                        alt="Website Logo"
                        className="h-10 w-10 object-cover rounded-full"
                    />
                    <span className="text-2xl font-bold tracking-wide">Mentorly</span>
                </div>

            </div>
        </nav>
    );
};

export default NavBar;
