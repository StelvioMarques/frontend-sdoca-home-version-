import SidebarFilters from "./SidebarFilters"

export default function SearchSidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <aside className={`hidden lg:flex flex-col bg-background transition-all duration-300 ${sidebarOpen ? "md:w-72 border-r" : "w-0"}`}>
      {sidebarOpen && <SidebarFilters setSidebarOpen={setSidebarOpen} />}
    </aside>
  )
}
