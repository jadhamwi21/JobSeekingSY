import axios from "axios";
import React, { useEffect, useState } from "react";
import { ISeekerProfile, searchSeekerProfile } from "../../../api/profile";
import useIsFirstRender from "../../../hooks/useIsFirstRender";
import { IGetProfileDetailsResponse } from "../../../types/types";
import { isEmptyString } from "../../../utils/utils";

export const useProfileSearch = () => {
	const [search, setSearch] = useState("");
	const [results, setResults] = useState<IGetProfileDetailsResponse[] | null>(
		null
	);
	const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};
	const [loading, setLoading] = useState(false);
	const firstRender = useIsFirstRender();

	useEffect(() => {
		if (!firstRender) {
			setLoading(true);

			const timeoutId = setTimeout(() => {
				searchSeekerProfile(search)
					.then((searchResults) => {
						setResults(searchResults);
					})
					.catch(() => {
						setResults([]);
					})
					.finally(() => setLoading(false));
			}, 1000);
			return () => clearTimeout(timeoutId);
		}
	}, [search]);

	return { changeHandler, results, loading };
};
