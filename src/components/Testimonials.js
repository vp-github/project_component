import React, { useEffect, useState } from "react";

import "./Testimonials.css";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [activeTestimonial, setActiveTestimonial] = useState({});

  const fetchTestimonials = async () => {
    const response = await fetch(
      "https://testimonialapi.toolcarton.com/api"
    ).then((resp) => resp.json());
    setTestimonials(response);
    setActiveTestimonial(response[0]);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const prevSlide = () => {
    setActiveTestimonial(
      activeTestimonial.id === 1
        ? testimonials[testimonials.length - 1]
        : testimonials[activeTestimonial.id - 2]
    );
  };
  const nextSlide = () => {
    setActiveTestimonial(
      activeTestimonial.id === testimonials.length
        ? testimonials[0]
        : testimonials[activeTestimonial.id]
    );
  };

  return (
    <div className="testimonial-container">
      <div className="testimonial-wrapper">
        <div className="message-container">
          <div className="title">Testimonials</div>

          <div className="slides">
            {testimonials.map((testimonial, index) => (
              <div key={index} id={`slide-${index + 1}`}>
                <div className="message-title">{testimonial.message}</div>

                <div className="testimonial-message">{testimonial.lorem}</div>

                <div className="designation-wrapper">
                  <div className="designation">
                    <b>{testimonial.location},</b> {testimonial.designation}
                  </div>
                  <div className="story-link">Read Full Story</div>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination">
            <div className="avatar-link">
              {testimonials.map((testimonial, index) => (
                <a
                  href={`#slide-${index + 1}`}
                  key={index}
                  onClick={() => setActiveTestimonial(testimonial)}
                >
                  <img
                    src={testimonial.avatar}
                    alt="avatar"
                    className={
                      activeTestimonial.id === testimonial.id
                        ? "avatar active"
                        : "avatar"
                    }
                  />
                </a>
              ))}
            </div>
            <div className="pagination-buttons">
              <a
                href={
                  activeTestimonial.id === 0
                    ? `#slide-${10}`
                    : `#slide-${activeTestimonial.id}`
                }
                className="arrow left-arrow cursor-pointer"
                onClick={prevSlide}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  fill="currentColor"
                  className="bi bi-arrow-left-short"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                  />
                </svg>
              </a>
              <a
                href={
                  activeTestimonial.id === 11
                    ? `#slide-${1}`
                    : `#slide-${activeTestimonial.id}`
                }
                className="arrow right-arrow cursor-pointer"
                onClick={nextSlide}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  fill="currentColor"
                  className="bi bi-arrow-right-short"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
