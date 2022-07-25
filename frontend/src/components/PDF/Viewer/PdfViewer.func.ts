import { SpecialZoomLevel } from "@react-pdf-viewer/core";
import { fullScreenPlugin, Zoom } from "@react-pdf-viewer/full-screen";

export const useFullScreenPlugin = () => {
	const FullscreenPluginInstance = fullScreenPlugin({
		enableShortcuts: false,
		onExitFullScreen: (zoom: Zoom) => {
			zoom(SpecialZoomLevel.PageWidth);
		},
		onEnterFullScreen: (zoom: Zoom) => {
			zoom(SpecialZoomLevel.PageFit);
		},
	});

	return FullscreenPluginInstance;
};
