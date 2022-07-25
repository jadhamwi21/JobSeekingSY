export const removeEmptyValueTransformer = (val: any) => {
	if (val === "" || val === null || val === undefined) return undefined;
	return val;
};
