import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { signUserUp, venueGetAll } from "../../actions";
import CenterCard363 from "../centerCard363";
import useForm from "../../use-form-react";
import axios from "axios";
import useRazorpay from "react-razorpay";

const Signup = (props) => {
  const [errMsg, setErrorMsg] = useState("");
  const [venues, setVenues] = useState([]);
  const [venueMenuFlag, setVenueMenuFlag] = useState(false);
  const [paid, setPaid] = useState(false);
  const Razorpay = useRazorpay();

  const handlePayment = async (amount) => {
    //   const order = await createOrder(params); //  Create order on your backend

    const options = {
      key: "rzp_test_csSwSo0o0lbTgh", // Enter the Key ID generated from the Dashboard
      amount: `${amount}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "CAD",
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      // order_id: "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
      handler: () => {
        if (inputs.password == inputs.password2) {
          console.log(inputs);
          props.signUserUp(inputs);
        } else {
          setErrorMsg("password does not matched");
        }
      },
      prefill: {
        name: "Sravani A",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new Razorpay(options);

    rzp1.on("payment.failed", function (response) {
      alert("payment failed");
    });

    rzp1.open();
  };

  const options = {
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
      password2: "",
      user_role: "",
      venue_id: "",
      subscription: "",
    },
    callback: () => {
      if (
        inputs.subscription.startsWith("Monthly") &&
        inputs.user_role == "serviceprovider"
      ) {
        handlePayment(25.99 * 100);
      } else if (
        inputs.subscription.startsWith("Yearly") &&
        inputs.user_role == "serviceprovider"
      ) {
        handlePayment(200.99 * 100);
      } else {
        if (inputs.password == inputs.password2) {
          console.log(inputs);
          props.signUserUp(inputs);
        } else {
          setErrorMsg("password does not matched");
        }
      }
    },
    debug: false,
  };

  useEffect(() => {
    axios.get("/ba-dum-tss").then((data) => setVenues(data.data));
  }, []);

  const { onSubmit, onChange, inputs, dirty, submitting, reset } = useForm(
    "AdvanceForm",
    options
  );
  useEffect(() => {
    if (inputs.user_role == "serviceprovider") setVenueMenuFlag(true);
    else setVenueMenuFlag(false);
  }, [inputs.user_role]);

  return (
    <CenterCard363>
      <div class="container">
        <div style={{ backgroundColor: "#FFF0F0", borderRadius: "50px" }}>
          <h3 class="text-center">Sign up</h3>
          <form class="p-5" onSubmit={onSubmit}>
            <div class="mb-sm-3 pl-sm-5 pr-sm-5 mr-sm-5 ml-sm-5 row">
              <div className="col-12 col-sm-6">
                <label for="exampleInputEmail1" class="form-label">
                  *Email address
                </label>
              </div>
              <div className="col-12 col-sm-6">
                <input
                  name="email"
                  value={inputs.email}
                  type="email"
                  onChange={onChange}
                  className="form-control form-control-lg"
                  placeholder="sample@email.com"
                  required
                  style={{ backgroundColor: "#D0C5BA" }}
                />
              </div>
            </div>
            <div class="mb-sm-3 pl-sm-5 pr-sm-5 mr-sm-5 ml-sm-5 row">
              <div className="col-12 col-sm-6">
                <label for="exampleInputPassword1" class="form-label">
                  *First Name
                </label>
              </div>
              <div className="col-12 col-sm-6">
                <input
                  name="firstName"
                  value={inputs.firstName}
                  type="text"
                  onChange={onChange}
                  className="form-control form-control-lg"
                  placeholder="First Name"
                  required
                  style={{ backgroundColor: "#D0C5BA" }}
                />
              </div>
            </div>
            <div class="mb-sm-3 pl-sm-5 pr-sm-5 mr-sm-5 ml-sm-5 row">
              <div className="col-12 col-sm-6">
                <label for="exampleInputPassword1" class="form-label">
                  *Last Name
                </label>
              </div>
              <div className="col-12 col-sm-6">
                <input
                  name="lastName"
                  value={inputs.lastName}
                  type="text"
                  onChange={onChange}
                  className="form-control form-control-lg"
                  placeholder="Last Name"
                  required
                  style={{ backgroundColor: "#D0C5BA" }}
                />
              </div>
            </div>
            <div class="mb-sm-3 pl-sm-5 pr-sm-5 mr-sm-5 ml-sm-5 row">
              <div className="col-12 col-sm-6">
                <label for="exampleInputPassword1" class="form-label">
                  *Mobile Number
                </label>
              </div>
              <div className="col-12 col-sm-6">
                <input
                  name="mobile"
                  value={inputs.mobile}
                  type="text"
                  onChange={onChange}
                  className="form-control form-control-lg"
                  placeholder=""
                  required
                  pattern="^\d{3}-\d{3}-\d{4}$"
                  style={{ backgroundColor: "#D0C5BA" }}
                />
              </div>
            </div>

            <div class="mb-sm-3 pl-sm-5 pr-sm-5 mr-sm-5 ml-sm-5 row">
              <div className="col-12 col-sm-6">
                <label for="exampleInputEmail1" class="form-label">
                  *Role
                </label>
              </div>
              <div className="col-12 col-sm-6">
                <select
                  className="custom-select w-100 mr-3"
                  aria-label="Default select example"
                  name="user_role"
                  value={inputs.user_role}
                  onChange={onChange}
                  style={{ backgroundColor: "#D0C5BA" }}
                >
                  <option value="">Add User Type</option>
                  <option value="user">User</option>
                  {/* <option value="admin">Admin</option> */}
                  <option value="serviceprovider">Service Provider</option>
                </select>
              </div>
            </div>
            {inputs.user_role == "serviceprovider" && (
              <div>
                <div class="mb-sm-3 pl-sm-5 pr-sm-5 mr-sm-5 ml-sm-5 row">
                  <div className="col-12 col-sm-6">
                    <label for="exampleInputEmail1" class="form-label">
                      *Venue Name
                    </label>
                  </div>
                  <div className="col-12 col-sm-6">
                    <select
                      className={`custom-select w-100 mr-3 ${
                        !venueMenuFlag && "d-none"
                      }`}
                      aria-label="Default select example"
                      name="venue_id"
                      value={inputs.venue_id}
                      onChange={onChange}
                      style={{ backgroundColor: "#D0C5BA" }}
                    >
                      <option>select venue</option>
                      {venues.map((venue) => (
                        <option key={venue._id} value={venue._id}>
                          {venue.venueName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div class="mb-sm-3 pl-sm-5 pr-sm-5 mr-sm-5 ml-sm-5 row">
              <div className="col-12 col-sm-6">
                <label for="exampleInputPassword1" class="form-label">
                  *Password
                </label>
              </div>
              <div className="col-12 col-sm-6">
                <input
                  type="password"
                  name="password"
                  value={inputs.password}
                  onChange={onChange}
                  className="form-control form-control-lg"
                  placeholder="your password"
                  required
                  style={{ backgroundColor: "#D0C5BA" }}
                />
              </div>
            </div>
            <div class="mb-sm-3 pl-sm-5 pr-sm-5 mr-sm-5 ml-sm-5 row">
              <div className="col-12 col-sm-6">
                <label for="exampleInputPassword1" class="form-label">
                  *Confirm Password
                </label>
              </div>
              <div className="col-12 col-sm-6">
                <input
                  type="password"
                  name="password2"
                  value={inputs.password2}
                  onChange={onChange}
                  className="form-control form-control-lg"
                  placeholder="your password again"
                  required
                  style={{ backgroundColor: "#D0C5BA" }}
                />
              </div>
            </div>
            {inputs.user_role == "serviceprovider" && (
              <div>
                <div class="mb-sm-3 pl-sm-5 pr-sm-5 mr-sm-5 ml-sm-5 d-flex flex-column">
                  <div className=" ">
                    <label for="exampleInputEmail1" class="form-label">
                      * Payment options
                    </label>
                  </div>
                  <div className=" ">
                    {/* <select className={`custom-select w-100 mr-3 ${!venueMenuFlag && "d-none"}`} aria-label="Default select example" name="venue_id" value={inputs.venue_id} onChange={onChange}
                                    style={{ backgroundColor:"#D0C5BA" }}>
                                        <option>select venue</option>
                                        {
                                            venues.map( venue => <option key={venue._id} value={venue._id}>{venue.venueName}</option>)
                                        }
                                    </select> */}
                    <div
                      className="form-check py-3 px-5 form-control text"
                      style={{ backgroundColor: "#D0C5BA" }}
                    >
                      <div className="d-flex flex-row">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="subscription"
                          onChange={onChange}
                          id="exampleRadios2"
                          value="Monthly Subscription - CAD 24.99 "
                        />
                        <label class="form-check-label" for="exampleRadios2">
                          Monthly Subscription - CAD 24.99
                        </label>
                      </div>
                      <div className="d-flex flex-row">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="subscription"
                          onChange={onChange}
                          id="exampleRadios3"
                          value="Yearly Subscription - CAD 199.99"
                        />
                        <label class="form-check-label" for="exampleRadios3">
                          Yearly Subscription - CAD 199.99
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* <div class="pt-4 pb-4 ps-5 pe-5 me-5 ms-5" style="background-color: #928D72;">
                        <input class="form-check-input mt-0" type="radio"> Monthly Subscription
                    </div>
                    <div class="pt-4 pb-4 ps-5 pe-5 me-5 ms-5" style="background-color: #928D72;">
                        <input class="form-check-input mt-0" type="radio"> Yearly Subscription
                    </div> */}
            {errMsg && (
              <div className="alert alert-warning">
                <strong>Oops!</strong> {errMsg}
              </div>
            )}
            <div class="text-center">
              <button
                type="submit"
                disabled={!dirty || submitting}
                class="rounded pt-2 pb-2 pl-4 pr-4 mt-2 mb-2"
                style={{ backgroundColor: "#000000", color: "#ffffff" }}
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </CenterCard363>
  );
};

export default connect(null, { signUserUp })(Signup);
