import { Navigate } from "react-router-dom";
import styled from "styled-components";
import RouteTransition from "../layouts/RouteTransition/RouteTransition";
import AccountVerificationForm from "../domain/Account/Activation/AccountActivationForm/AccountActivationForm";
import ResendVerificationCode from "../domain/Account/Activation/ResendActivationCode/ResendActivationCode";
import TabTitle from "../layouts/TabTitle/TabTitle";
import { selectIsAccountActivated } from "../redux/selectors/userSelectors";
import { useAppSelector } from "../redux/store/store";
import Typography from "../components/Typography/Typography";
import { useEffect } from "react";
import { sendAccountActivationCode } from "../api/account";

type Props = {};

const AccountActivation = (props: Props) => {
	const isAccountActivated = useAppSelector(selectIsAccountActivated);
	useEffect(() => {
		sendAccountActivationCode();
	}, []);
	return (
		<>
			<TabTitle title="Activate Your Account" />
			{isAccountActivated ? (
				<Navigate to="/profile/setup" replace />
			) : (
				<RouteTransition>
					<AccountActivationContainer>
						<Typography color="blue">Activate Your Account</Typography>
						<AccountVerificationForm />
						<ResendVerificationCode />
					</AccountActivationContainer>
				</RouteTransition>
			)}
		</>
	);
};

const AccountActivationContainer = styled.div`
	width: 100%;
	height: fit-content;
	padding: 5em 0px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export default AccountActivation;
