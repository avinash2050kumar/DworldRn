import React, { Component } from "react";
import StarRating from "react-native-star-rating";

class RatingStar extends Component {
  componentDidMount() {
    this.setState({ starCount: this.props.rating });
  }

  constructor(props) {
    super(props);
    this.state = {
      starCount: 0.0
    };
  }

  componentWillReceiveProps(nextProps, nextContext): void {
    this.setState({ starCount: nextProps.rating });
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  render() {
    const { rating, disabled } = this.props;
    return (
      <StarRating
        disabled={disabled}
        maxStars={5}
        fullStarColor={"orange"}
        starSize={12}
        rating={this.state.starCount}
        containerStyle={{ padding: 0, margin: 0, justifyContent: "flex-start" }}
        selectedStar={rating =>
          disabled ? null : this.onStarRatingPress(rating)
        }
      />
    );
  }
}

export default RatingStar;
