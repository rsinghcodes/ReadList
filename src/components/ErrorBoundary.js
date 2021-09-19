import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = {
      hasErrored: false,
    };
  }

  // catch the error ahead of time, when children got an error
  static getDerivedStateFromError(error) {
    // return new state
    return { hasErrored: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasErrored) {
      <h1>An error occurred</h1>;
    }

    return this.props.children;
  }
}
