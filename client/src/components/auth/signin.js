import React from "react";
import { connect } from "react-redux";
import useForm from "../../use-form-react";

import { signUserIn } from "../../actions";
import CenterCard363 from "../centerCard363";

const Signin = (props) => {
  const options = {
    initialValues: {
      email: "",
      password: "",
    },
    callback: () => {
      console.log("works!", inputs);
      props.signUserIn(inputs);
    },
    debug: false,
  };
  const { onSubmit, onChange, inputs, dirty, submitting } = useForm(
    "AdvanceForm",
    options
  );
  return (
    <div
      class="m-sm-5 m-4"
      style={{ backgroundColor: "#FFF0F0", borderRadius: "50px" }}
    >
      <form class="p-5" onSubmit={onSubmit}>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            name="email"
            type="email"
            value={inputs.email}
            className="form-control form-control-lg"
            placeholder="sample@email.com"
            onChange={onChange}
            required
            style={{ backgroundColor: "#D0C5BA" }}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={inputs.password}
            className="form-control form-control-lg"
            placeholder="your password"
            onChange={onChange}
            required
            style={{ backgroundColor: "#D0C5BA" }}
          />
        </div>
        <button
          type="submit"
          disabled={!dirty || submitting}
          class="rounded pt-2 pb-2 pl-4 pr-4 mt-2 mb-2"
          style={{ backgroundColor: "#000000", color: "#ffffff" }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default connect(null, { signUserIn })(Signin);
