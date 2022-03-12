import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/home";
import Detail from "./pages/detail";

export default () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Index />} />
				<Route path="/detail" element={<Detail />}>
					<Route path=":id" element={<Detail />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};