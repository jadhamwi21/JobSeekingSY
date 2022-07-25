import { useState } from "react";

export const usePagesIterator = <PageType>(pages: PageType[]) => {
	const numberOfPages = pages.length;
	const [pageIndex, setPageIndex] = useState(0);

	const goToNextPage = () => {
		if (pageIndex + 1 === numberOfPages) {
			setPageIndex(0);
		} else {
			setPageIndex((prevIndex) => prevIndex + 1);
		}
	};

	const goToPreviousPage = () => {
		if (pageIndex === 0) {
			setPageIndex(numberOfPages - 1);
		} else {
			setPageIndex((prevIndex) => prevIndex - 1);
		}
	};
	const page = pages[pageIndex];

	return { page, goToPreviousPage, goToNextPage };
};
