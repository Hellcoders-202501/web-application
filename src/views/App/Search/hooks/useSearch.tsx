import { useState } from "react";

const useSearch = () => {
	const [searchState, setSearchState] = useState({
		typeService: "",
		capacity: 0,
	});
	const [watchRequest, setWatchRequest] = useState(false);

	return { searchState, setSearchState, watchRequest, setWatchRequest };
};
export default useSearch;
