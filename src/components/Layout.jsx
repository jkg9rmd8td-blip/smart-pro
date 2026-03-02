import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="app">
      <Sidebar />
      <main className="content">{children}</main>
    </div>
  );
}
