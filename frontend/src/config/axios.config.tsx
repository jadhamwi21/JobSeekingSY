import { notification } from "antd";
import axios from "axios";
import { IAxiosInterceptorResponseData } from "../types/types";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { store } from "../redux/store/store";
import { baseUrl } from "../constants/constants";

axios.defaults.baseURL = baseUrl;

axios.interceptors.response.use(
	(response: any) => {
		const responseData: IAxiosInterceptorResponseData =
			response.data.notification;
		if (!response.data.notification) return response;
		notification.success({
			message: responseData.message,
			description: responseData.description,
			closeIcon: true,
			duration: 1.5,
			icon: <SmileOutlined style={{ color: "#108ee9" }} />,
		});
		delete response.data.message;
		delete response.data.description;
		delete response.data.status_code;
		return response;
	},
	(err) => {
		const responseData: IAxiosInterceptorResponseData =
			err.response.data.notification;
		if (!responseData.message && !responseData.description) return err;
		notification.error({
			message: responseData.message,
			description: responseData.description,
			duration: 1.5,
			icon: <FrownOutlined style={{ color: "#fa5a5a" }} />,
		});

		delete err.response.data.message;
		delete err.response.data.description;
		delete err.response.data.status_code;
		return Promise.reject(err);
	}
);

axios.interceptors.request.use(
	(req) => {
		const token = store.getState().User.accessToken;
		const auth = token ? `Bearer ${token}` : "";
		console.log(auth);
		if (req.headers) {
			req.headers.Authorization = auth;
		}
		return req;
	},
	(error) => Promise.reject(error)
);
