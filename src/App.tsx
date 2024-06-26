import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Navbar from "./components/Navbar";
import CreateInput from "./pages/create-input/CreateInput";
import InsumosPage from "./pages/input-list/InputList";
import Dashboard from "./pages/dashboard/dashboard";

function Layout({ children }: any) {
	return (
		<>
			<Navbar />
			{children}
		</>
	);
}

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<Layout>
								<Home />
							</Layout>
						}
					/>
					<Route
						path="/create-input"
						element={
							<Layout>
								<CreateInput />
							</Layout>
						}
					/>
					<Route
						path="/input-list"
						element={
							<Layout>
								<InsumosPage />
							</Layout>
						}
					/>
					<Route
						path="/dashboard"
						element={
							<Layout>
								<Dashboard />
							</Layout>
						}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
