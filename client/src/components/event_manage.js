import React, {
  Component,
  createElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { connect } from "react-redux";
import {
  eventAdd,
  serviceGetAll,
  serviceReallyGetAll,
  venueGetAll,
  eventGetAll,
} from "../actions";
import useForm from "../use-form-react";
import CenterCard363 from "./centerCard363";
import EVENT_TYPES from "./constants.js";
import useRazorpay from "react-razorpay";
import axios from "axios";
import Invitation from "./invitation";

function EventManage(props) {
  const event_type_id = props.match.params.id;

  const [isFormEnabled, setIsFormEnabled] = useState(true);
  const [venues, setVenues] = useState([]);
  const [services, setServices] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [currentVenue, setCurrentVenue] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [currentServices, setCurrentServices] = useState(null);
  const [eventSubmitted, setEventSubmitted] = useState(false);

  const EventTypes = EVENT_TYPES[event_type_id];
  const imgRef = useRef();
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
        const currentServicesFiltered = currentServices.filter(
          (service) => service.checked == true
        );
        const currentVenueServices = currentServicesFiltered.map(
          (service) => service.serviceProviderId
        );
        // const eventPhoto = createInvitation(inputs.eventType, inputs.eventDate, currentVenue.venueLocation, currentVenue.venueAddress)
        eventAdd({ ...inputs, venueServiceIds: currentVenueServices }).then(
          (d) => {
            setEventSubmitted(true);
            // window.location = '/#event'
          }
        );
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
      alert("Payment Failed");
      reset();
    });

    rzp1.open();
  };

  const options = {
    initialValues: {
      eventType: "",
      venueLocation: "",
      venueId: "",
      eventDate: "",
      venueServiceIds: [],
    },
    callback: () => {
      handlePayment(parseFloat(totalPrice) * 100);
      // setEventSubmitted(true)
    },
    debug: false,
  };
  const { onSubmit, onChange, inputs, dirty, submitting, setInputs, reset } =
    useForm("AdvanceForm", options);

  useEffect(() => {
    venueGetAll()
      .then((data) => setVenues(data.data))
      .catch((err) => console.log("cant get all venue data", err));

    serviceReallyGetAll()
      .then((data) => setServices(data.data))
      .catch((err) => console.log("cant get all service data", err));

    eventGetAll().then((data) => {
      const bookedDates = data.data.map((d) => ({
        venue_id: d.venueId,
        event_date: d.eventDate,
      }));
      setAllEvents([...bookedDates]);
    });
  }, []);

  useEffect(() => {
    if (inputs.venueId != "" && inputs.location != "") {
      const venue = venues.find((venue) => venue._id == inputs.venueId);

      venue.venueAvailableFrom = parseAndFormatDate(venue.venueAvailableFrom);
      venue.venueAvailableTo = parseAndFormatDate(venue.venueAvailableTo);

      let venue_services = services.filter(
        (service) => service.venueId == inputs.venueId
      );
      venue_services = venue_services.map((service) => ({
        ...service,
        checked: false,
      }));

      setCurrentVenue(venue);
      setCurrentServices(venue_services);
    } else {
      setCurrentVenue(null);
      setCurrentServices(null);
    }
  }, [inputs.venueLocation, inputs.venueId]);

  useEffect(() => {
    setInputs((pinputs) => ({ ...pinputs, venueId: "" }));
  }, [inputs.venueLocation]);

  useEffect(() => {
    setInputs((pinputs) => ({ ...pinputs, eventDate: "" }));
  }, [inputs.venueId]);

  useEffect(() => {
    if (currentServices || currentVenue) setTotalPrice(getTotalPrice());
  }, [currentVenue, currentServices]);

  useEffect(() => {
    if (inputs.eventDate) {
      const venue_id = currentVenue._id;
      console.log(allEvents);
      const current_venue_bookings = allEvents.filter(
        (booking) => booking.venue_id == venue_id
      );
      console.log(venue_id);
      console.log(current_venue_bookings);
      console.log(inputs.eventDate);
      if (new Date(inputs.eventDate) < new Date()) {
        alert("Booking date Cannot be past date");
        setInputs({ ...inputs, eventDate: "" });
      } else if (
        !current_venue_bookings.every((book) =>
          checkDifferentDate(book.event_date, inputs.eventDate)
        )
      ) {
        alert("Booked by someone else, sorry");
        setInputs({ ...inputs, eventDate: "" });
      }
    }
  }, [inputs.eventDate]);
  useEffect(() => {
    setEventSubmitted(false);
  }, [inputs.eventDate, inputs.location, inputs.eventType]);
  // useEffect(() => {
  //     if(inputs.eventType!=""){
  //         if(currentVenue==null)
  //             createInvitation(inputs.eventType, inputs.eventDate)
  //         else
  //             createInvitation(inputs.eventType, inputs.eventDate, currentVenue.venueLocation, currentVenue.venueAddress)
  //     }
  // }, [currentVenue, currentServices, inputs.eventDate, inputs.eventType, invitationLoaded])

  const getAllUniqueVenueLocation = () => {
    const locations = venues.map((venue) => venue.venueLocation);
    const unique_locations = locations.filter((v, i, a) => a.indexOf(v) === i);
    return unique_locations;
  };

  const getVenuesPerLocation = (location) =>
    venues.filter((venue) => venue.venueLocation == location);

  const handleServiceClick = (service_id) => {
    const prevServices = JSON.parse(JSON.stringify(currentServices));
    const index = prevServices.findIndex(
      (service) => service._id == service_id
    );
    prevServices[index] = {
      ...prevServices[index],
      checked: !prevServices[index].checked,
    };
    setCurrentServices(prevServices);
  };

  const getTotalPrice = () => {
    let finalPrice = 0;
    finalPrice = finalPrice + parseFloat(currentVenue.venuePrice);
    const servicePriceActive = currentServices
      .filter((s) => s.checked == true)
      .map((s) => s.servicePrice);
    if (servicePriceActive.length != 0) {
      const serviceCost = servicePriceActive.reduce((a, b) => a + b, 0);
      finalPrice += serviceCost;
    }
    return finalPrice;
  };
  return (
    <CenterCard363>
      <div class="container">
        <div style={{ backgroundColor: "#FFF0F0", borderRadius: "50px" }}>
          <div class="p-sm-5 p-4">
            <h4 className={`text-center ${!isFormEnabled && "d-none"}`}>
              Register Events
            </h4>
            <div className="card-body">
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label>Event Type:</label>
                  <select
                    disabled={allEvents.length == 0}
                    className="custom-select w-100 mr-3"
                    aria-label="Default select example"
                    name="eventType"
                    value={inputs.eventType}
                    onChange={onChange}
                    style={{ backgroundColor: "#D0C5BA" }}
                  >
                    <option value="">Select Event Type</option>
                    {EventTypes.map((event) => (
                      <option key={event.id} value={event.name}>
                        {" "}
                        {event.name}{" "}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Venue Location:</label>
                  <select
                    disabled={allEvents.length == 0}
                    className="custom-select w-100 mr-3"
                    aria-label="Default select example"
                    name="venueLocation"
                    value={inputs.venueLocation}
                    placeholder="select location"
                    onChange={onChange}
                    style={{ backgroundColor: "#D0C5BA" }}
                  >
                    <option value="">Select Location</option>
                    {getAllUniqueVenueLocation().map((location) => (
                      <option key={location} value={location}>
                        {" "}
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Venue Name:</label>
                  <select
                    className="custom-select w-100 mr-3"
                    aria-label="Default select example"
                    name="venueId"
                    value={inputs.venueId}
                    onChange={onChange}
                    disabled={inputs.venueLocation == ""}
                    style={{ backgroundColor: "#D0C5BA" }}
                  >
                    <option value="">Select Venue</option>
                    {getVenuesPerLocation(inputs.venueLocation).map((venue) => (
                      <option key={venue._id} value={venue._id}>
                        {" "}
                        {venue.venueName}
                      </option>
                    ))}
                  </select>
                </div>
                {currentVenue && (
                  <div className="form-group">
                    <label>Event Date:</label>
                    <input
                      name="eventDate"
                      value={inputs.eventDate}
                      type="date"
                      onChange={onChange}
                      disabled={!isFormEnabled || inputs.venueId == ""}
                      className="form-control"
                      placeholder="eventDate"
                      min={currentVenue.venueAvailableFrom}
                      max={currentVenue.venueAvailableTo}
                      required
                      style={{ backgroundColor: "#D0C5BA" }}
                    />
                  </div>
                )}
                <div className="my-5">
                  {inputs.eventDate && (
                    <div>
                      <center>
                        <h4>{currentVenue.venueName}</h4>
                      </center>
                      <div className="bg-light p-3 my-3">
                        <div className="row">
                          <div className="col">
                            <label>Venue Price:</label>
                          </div>
                          <div className="col">
                            <input
                              value={currentVenue.venuePrice}
                              type="text"
                              disabled={true}
                              className="form-control mb-3"
                              placeholder="eventDate"
                              style={{ backgroundColor: "#D0C5BA" }}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <label>Venue Address:</label>
                          </div>
                          <div className="col">
                            <input
                              value={currentVenue.venueAddress}
                              type="text"
                              disabled={true}
                              className="form-control mb-3"
                              placeholder="eventDate"
                              style={{ backgroundColor: "#D0C5BA" }}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <label>Venue Accomodation:</label>
                          </div>
                          <div className="col">
                            <input
                              value={currentVenue.venuePeopleCount}
                              type="text"
                              disabled={true}
                              className="form-control mb-3"
                              placeholder="eventDate"
                              style={{ backgroundColor: "#D0C5BA" }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="bg-light form-check p-5 my-3">
                        {currentServices.map((service) => (
                          <div key={service._id} className="d-flex">
                            <label className="form-check-label">
                              {service.venueServiceName}
                            </label>
                            <input
                              type="checkbox"
                              checked={service.checked}
                              className="form-check-input"
                              onChange={() => handleServiceClick(service._id)}
                              style={{ backgroundColor: "#D0C5BA" }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <div className="row">
                    <div className="col">
                      <label>Total Price:</label>
                    </div>
                    <div className="col">
                      <input
                        value={totalPrice}
                        type="number"
                        step=".01"
                        disabled={true}
                        className="form-control mb-3"
                        placeholder=""
                        style={{ backgroundColor: "#D0C5BA" }}
                      />
                    </div>
                  </div>
                </div>
                <div
                  style={{ paddingTop: "30px" }}
                  className={` ${!isFormEnabled && "d-none"}`}
                >
                  <button
                    type="submit"
                    className="rounded pt-2 pb-2 pl-4 pr-4 btn-block"
                    disabled={!dirty || submitting}
                    style={{ backgroundColor: "#000000", color: "#ffffff" }}
                  >
                    Book Event and Pay
                  </button>
                </div>
              </form>
            </div>
            {eventSubmitted && (
              <Invitation
                eventType={inputs.eventType}
                eventDate={inputs.eventDate}
                location={currentVenue.venueLocation}
                address={currentVenue.venueAddress}
                name={currentVenue.venueName}
              />
            )}
          </div>
        </div>
      </div>
    </CenterCard363>
  );
}

function parseAndFormatDate(date) {
  const d = new Date(date);
  console.log(d.toISOString().split("T")[0]);
  return d.toISOString().split("T")[0];
}

function mapStateToProps({ auth }) {
  return {
    authenticated: auth.authenticated,
    auth_type: auth.auth_type,
  };
}

const checkDifferentDate = (date1, date2) => {
  const a = new Date(date1);
  const b = new Date(date2);

  return a.toDateString() != b.toDateString();
};

export default connect(mapStateToProps, null)(EventManage);
