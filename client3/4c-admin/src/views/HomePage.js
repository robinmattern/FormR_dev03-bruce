import React from "react";

function HomePage() {
  var message = localStorage.message;
  localStorage.message = "";
  message = message ? message : "Welcome to FormR";
  return (
    <div className="modal-dialog">
      <div className="card card-dark">
        <div className="card-header">
          <h3 className="card-title">{message}</h3>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
