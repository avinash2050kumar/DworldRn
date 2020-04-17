import * as React from "react";
import { connect } from "react-redux";
import DriverHomeTabs from "./DriverHomeTabs";
import OwnerHomeTabs from "./OwnerHomeTabs";
import LeaseHomeTabs from "./LeaseHomeTabs";
import { getPersonalDetails } from "../actions";

class HomeTabs extends React.Component {
	static navigationOptions = {
		header: null
	};

	state = { langCode: this.props.langCode };

	componentDidMount() {
		this.props.getPersonalDetails();
	}

	render() {
		switch (this.props.ClientTypeId) {
			case 1:
				return <DriverHomeTabs />;
			case 2:
				return <OwnerHomeTabs />;
			case 3:
				return <LeaseHomeTabs />;
			default:
				return <DriverHomeTabs />;
		}
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	ClientTypeId: state.auth.ClientTypeId,
	langCode: state.language.langCode
});

const mapDispatchToProps = { getPersonalDetails };

export default connect(mapStateToProps, mapDispatchToProps)(HomeTabs);
