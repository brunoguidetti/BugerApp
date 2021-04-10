import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Auxiliar from "../Auxiliar/Auxiliar.js";

const withErrorHandler = (WrrapedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };
    componentWillMount() {
      // console.log("Will Mount");
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
    }
    componentWillUnmount() {
      // console.log("Will Unmount", this.reqInterceptor, this.resInterceptor);
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.request.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Auxiliar>
          <Modal
            show={this.state.error}
            modalClose={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrrapedComponent {...this.props} />
        </Auxiliar>
      );
    }
  };
};
export default withErrorHandler;
