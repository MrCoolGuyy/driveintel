export const NavbarComponent = (() => {
    return {
        render: () => `
            <nav class="bg-blue-900 text-white shadow-md sticky top-0 z-50">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16">
                    <a href="#home" class="flex items-center gap-2 text-xl font-bold tracking-tight">
                        <i data-lucide="shield-check" class="w-6 h-6 text-red-500"></i>
                        DriveIntel
                    </a>

                    <div class="hidden md:flex items-center space-x-6 text-sm font-medium">
                        <a href="#home" class="hover:text-red-400 transition-colors">
                            Decision Portal
                        </a>
                    </div>
                </div>
            </nav>
        `
    };
})();