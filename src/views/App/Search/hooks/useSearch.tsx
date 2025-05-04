import { useState } from "react";

const useSearch = () => {
	const [searchState, setSearchState] = useState({
		typeService: "",
		capacity: 0,
	});

	return { searchState, setSearchState };
};
export default useSearch;
