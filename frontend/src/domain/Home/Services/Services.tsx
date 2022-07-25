import React from "react";
import Service from "./Service/Service";
import {
	ServicesContainer,
	ServicesFlexbox,
	ServicesTitle,
} from "./Services.styles";
import EaseInSeekIcon from "../../../assets/icons/EaseInSeekIcon.png";
import SimplePostProcessIcon from "../../../assets/icons/SimplePostProcessIcon.png";
import ScrollAnimation from "react-animate-on-scroll";

const EaseInSeekDescription =
	"Seeking Jobs Is Way Easier With JobSeekingSY, Filter Jobs, Search For Your Dream Job.";
const SimplePostProcessDescription =
	"Post Your Job You’re Willing To Hire People For, And People Will Apply Easily.";

const Services = () => {
	return (
		<ServicesContainer>
			<ServicesTitle>Services</ServicesTitle>
			<ServicesFlexbox>
				<ScrollAnimation animateIn="fadeLeft" offset={200} duration={0.5}>
					<Service
						iconSrc={EaseInSeekIcon}
						name="Ease-In-Seek"
						description={EaseInSeekDescription}
					/>
				</ScrollAnimation>
				<ScrollAnimation
					animateIn="fadeRight"
					offset={200}
					duration={0.5}
					delay={400}
				>
					<Service
						iconSrc={SimplePostProcessIcon}
						name="Simple Post Process"
						description={SimplePostProcessDescription}
					/>
				</ScrollAnimation>
			</ServicesFlexbox>
		</ServicesContainer>
	);
};

export default Services;
