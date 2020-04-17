import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	// flex
	flex_btwn: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row"
	},
	flex_col_btwn: {
		display: "flex",
		justifyContent: "space-between"
	},
	flex_row: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center"
	},
	flex_wrap: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap"
	},
	flex_even: {
		display: "flex",
		justifyContent: "space-evenly",
		flexDirection: "row",
		alignItems: "center"
	},
	flex_column: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center"
	},
	flex_end: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-end"
	},
	flex_center: {
		alignItems: "center",
		justifyContent: "center"
	},

	// text
	text_center: {
		textAlign: "center"
	},

	// text size
	bold: {
		fontWeight: "700"
	},
	sm: {
		fontSize: 12
	},
	xs: {
		fontSize: 8
	},
	md: {
		fontSize: 14
	},
	lg: {
		fontSize: 18
	},
	xl: {
		fontSize: 20
	},
	letter_space_7: {
		letterSpacing: 0.7
	},
	// spacing
	padding_10: {
		padding: 10
	},
	padding_t_b_5: {
		paddingTop: 5,
		paddingBottom: 5
	},
	padding_l_r_10: {
		paddingLeft: 10,
		paddingRight: 10
	},
	padding_l_r_5: {
		paddingLeft: 5,
		paddingRight: 5
	}
});

export default styles;
